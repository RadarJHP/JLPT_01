/**
 * Tiny TTS wrapper around the Web Speech API. Respects the global mute pref
 * (회사에서 갑자기 일본어 음성 안 나오게).
 */
export function useTts() {
  const { muted } = useAudioPref()

  function speak(text: string, opts: { rate?: number; pitch?: number; force?: boolean } = {}) {
    if (import.meta.server) return
    if (!opts.force && muted.value) return
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'ja-JP'
      u.rate = opts.rate ?? 0.92
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
