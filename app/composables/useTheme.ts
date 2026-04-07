/**
 * Theme manager: light / dark / stealth.
 *
 * - Persisted to localStorage.
 * - On first load, defaults to system pref (`prefers-color-scheme`).
 * - Stealth mode is the “회사에서 몰래 공부” mode: desaturated grays,
 *   suppressed animations, the layout looks like a corporate doc viewer.
 */

export type ThemeName = 'light' | 'dark' | 'mono' | 'stealth'

const STORAGE_KEY = 'nihongo-duel-theme'

export function useTheme() {
  const theme = useState<ThemeName>('theme', () => 'light')

  function apply(name: ThemeName) {
    if (import.meta.server) return
    document.documentElement.setAttribute('data-theme', name)
    try { localStorage.setItem(STORAGE_KEY, name) } catch {}
  }

  function load() {
    if (import.meta.server) return
    let name: ThemeName = 'light'
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null
      if (stored === 'light' || stored === 'dark' || stored === 'mono' || stored === 'stealth') {
        name = stored
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        name = 'dark'
      }
    } catch {}
    theme.value = name
    apply(name)
  }

  function set(name: ThemeName) {
    theme.value = name
    apply(name)
  }

  /** Cycle: light → dark → mono → light  (stealth는 별도 토글) */
  function cycle() {
    const order: ThemeName[] = ['light', 'dark', 'mono']
    // 잠행 모드에서 cycle 누르면 일단 light로 빠져나옴
    if (theme.value === 'stealth') {
      set('light')
      return
    }
    const next = order[(order.indexOf(theme.value) + 1) % order.length]
    set(next)
  }

  const isStealth = computed(() => theme.value === 'stealth')
  const isDark = computed(() => theme.value === 'dark')
  const isMono = computed(() => theme.value === 'mono')

  return { theme, load, set, cycle, isStealth, isDark, isMono }
}
