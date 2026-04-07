/**
 * Boss-mode: instantly hides the app behind a fake spreadsheet overlay.
 * Toggle via Esc, Ctrl+B, or the 🫥 button in the header.
 *
 * The overlay component lives in `components/BossOverlay.vue` and listens
 * to the shared `bossActive` state.
 */
export function useBossMode() {
  const active = useState<boolean>('boss-mode', () => false)

  function toggle() { active.value = !active.value }
  function show() { active.value = true }
  function hide() { active.value = false }

  let listener: ((e: KeyboardEvent) => void) | null = null

  function bindShortcuts() {
    if (import.meta.server) return
    if (listener) return // already bound
    listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (active.value) {
          hide()
          e.preventDefault()
        }
        return
      }
      // Ctrl+B (or Cmd+B) → instant boss mode
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        toggle()
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', listener)
  }

  return { active, toggle, show, hide, bindShortcuts }
}
