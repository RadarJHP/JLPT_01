/**
 * TTS wrapper around the Web Speech API.
 *
 * Two things this file fights against:
 *
 * 1. Background-audio ducking on Windows. speechSynthesis runs through the
 *    "communications" audio session by default, which makes Spotify / YouTube
 *    duck every time we speak. We mitigate this by:
 *      - Keeping a near-silent oscillator running in a Web Audio context
 *        the moment the user first taps anything that triggers speech.
 *        Holding an active "playback" stream open often keeps the OS from
 *        downgrading our process to "communications".
 *      - Never calling speechSynthesis.cancel() right before speak() — every
 *        cancel/start cycle re-opens the audio stream and re-triggers the
 *        ducking blip. We just queue or skip if a previous utterance is
 *        still running.
 *
 * 2. Quiet output. Web Speech caps utterance.volume at 1.0, so we pin it
 *    there and lean on rate/pitch for clarity rather than loudness.
 *
 * (If your OS still ducks the background despite this, that's a Windows-
 * level limitation we can't override from JavaScript.)
 */

let audioCtx: AudioContext | null = null
let silentNode: { osc: OscillatorNode; gain: GainNode } | null = null

function ensureSilentLoop() {
  if (import.meta.server) return
  if (audioCtx && silentNode) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }
    return
  }
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return
    audioCtx = new Ctx({ latencyHint: 'playback' }) as AudioContext
    const gain = audioCtx.createGain()
    gain.gain.value = 0.0001  // inaudible but non-zero so the stream stays alive
    const osc = audioCtx.createOscillator()
    osc.frequency.value = 1
    osc.type = 'sine'
    osc.connect(gain).connect(audioCtx.destination)
    osc.start()
    silentNode = { osc, gain }
  } catch { /* autoplay policy may block until first gesture */ }
}

export function useTts() {
  const { muted } = useAudioPref()

  function speak(text: string, opts: { rate?: number; pitch?: number; force?: boolean } = {}) {
    if (import.meta.server) return
    if (!opts.force && muted.value) return
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      // Keep a media-category audio stream alive to discourage Windows from
      // ducking other apps. Safe to call repeatedly.
      ensureSilentLoop()

      // Don't cancel — that re-opens the audio session and causes a duck blip.
      // Instead, skip if we're already speaking.
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) return

      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'ja-JP'
      u.rate = opts.rate ?? 0.95
      u.pitch = opts.pitch ?? 1.05
      u.volume = 1
      const voices = window.speechSynthesis.getVoices()
      const ja = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang.startsWith('ja'))
      if (ja) u.voice = ja
      window.speechSynthesis.speak(u)
    } catch { /* ignore */ }
  }

  function cancel() {
    if (import.meta.server) return
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel() } catch {}
    }
  }

  const supported = computed(() => {
    if (import.meta.server) return false
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  })

  return { speak, cancel, supported, muted }
}
