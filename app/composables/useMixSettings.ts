/**
 * Quiz mix settings.
 *
 * The user controls how a kana-row session is composed:
 *   - current  : the row's own characters (the focus of the session)
 *   - mastered : characters from earlier rows the SRS thinks they know
 *                (mixed in so they don't drift)
 *   - words    : simple hiragana/katakana words with an emoji image
 *                (so they read characters in real context)
 *
 * The three values are weights, not strict percentages — we'll
 * normalize them. Persisted to localStorage so the same ratios
 * survive across sessions.
 */

export interface MixSettings {
  current: number
  mastered: number
  words: number
}

const STORAGE_KEY = 'nihongo-duel-mix-v1'

function defaultSettings(): MixSettings {
  return { current: 60, mastered: 20, words: 20 }
}

export function useMixSettings() {
  const settings = useState<MixSettings>('mix-settings', () => defaultSettings())
  const loaded = useState<boolean>('mix-settings-loaded', () => false)

  function load() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        settings.value = { ...defaultSettings(), ...parsed }
      }
    } catch {
      settings.value = defaultSettings()
    }
    loaded.value = true
  }

  function save() {
    if (import.meta.server) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    } catch { /* quota */ }
  }

  function update(patch: Partial<MixSettings>) {
    settings.value = { ...settings.value, ...patch }
    // clamp to 0..100
    settings.value.current = Math.max(0, Math.min(100, settings.value.current))
    settings.value.mastered = Math.max(0, Math.min(100, settings.value.mastered))
    settings.value.words = Math.max(0, Math.min(100, settings.value.words))
    save()
  }

  function reset() {
    settings.value = defaultSettings()
    save()
  }

  /** normalized ratios that always sum to 1 */
  const ratios = computed(() => {
    const s = settings.value
    const total = s.current + s.mastered + s.words || 1
    return {
      current: s.current / total,
      mastered: s.mastered / total,
      words: s.words / total,
    }
  })

  return { settings, load, save, update, reset, ratios }
}
