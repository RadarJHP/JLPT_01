/**
 * Global audio mute preference.
 * Defaults to MUTED in stealth mode (회사에서 갑자기 발음 나오면 큰일).
 */
const STORAGE_KEY = 'nihongo-duel-mute'

export function useAudioPref() {
  const muted = useState<boolean>('audio-muted', () => false)

  function load() {
    if (import.meta.server) return
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v !== null) muted.value = v === '1'
    } catch {}
  }

  function set(v: boolean) {
    muted.value = v
    if (import.meta.server) return
    try { localStorage.setItem(STORAGE_KEY, v ? '1' : '0') } catch {}
  }

  function toggle() { set(!muted.value) }

  return { muted, load, set, toggle }
}
