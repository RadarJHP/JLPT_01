/**
 * SRS engine — Leitner-style spaced repetition with persistence.
 *
 * Each card has its own state in localStorage:
 *   { box, due, ease, reps, lapses, lastSeen, totalCorrect, totalWrong }
 *
 * Box / interval mapping (in days):
 *   0: new (due immediately)
 *   1: 1 day
 *   2: 3 days
 *   3: 7 days
 *   4: 16 days
 *   5: 35 days
 *   6: 75 days
 *   7+: 160 days (mastered)
 *
 * On correct: box += 1, reps++, ease nudges up.
 * On wrong:  box = max(0, box - 2), lapses++, ease nudges down,
 *            and the card is queued back into the current session quickly.
 */

export type ReviewQuality = 'again' | 'hard' | 'good' | 'easy'

export interface SrsCardState {
  id: string
  deck: string         // e.g. 'hiragana', 'katakana', 'vocab-n5'
  box: number          // leitner box 0..7+
  due: number          // ms epoch when due next
  ease: number         // 1.3 .. 3.0
  reps: number         // total successful reviews
  lapses: number       // times forgotten after first learning
  lastSeen: number     // ms epoch
  totalCorrect: number
  totalWrong: number
  introduced: boolean  // was ever shown?
}

export interface SessionStats {
  date: string         // YYYY-MM-DD
  studied: number      // cards reviewed
  correct: number
  minutes: number
}

export interface SrsRoot {
  cards: Record<string, SrsCardState>
  sessions: SessionStats[]   // last 90 days
  streak: number
  lastStudyDate: string | null
  totalReviewed: number
  totalCorrect: number
  // per-deck mastery snapshot for the dashboard
  bestCombo: number
}

const STORAGE_KEY = 'nihongo-duel-srs-v2'
const DAY_MS = 24 * 60 * 60 * 1000
const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 16, 35, 75, 160]

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function defaultCard(id: string, deck: string): SrsCardState {
  return {
    id,
    deck,
    box: 0,
    due: 0,
    ease: 2.3,
    reps: 0,
    lapses: 0,
    lastSeen: 0,
    totalCorrect: 0,
    totalWrong: 0,
    introduced: false,
  }
}

function defaultRoot(): SrsRoot {
  return {
    cards: {},
    sessions: [],
    streak: 0,
    lastStudyDate: null,
    totalReviewed: 0,
    totalCorrect: 0,
    bestCombo: 0,
  }
}

export function useSrs() {
  const root = useState<SrsRoot>('srs-root', () => defaultRoot())
  const loaded = useState<boolean>('srs-loaded', () => false)

  function load() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        root.value = { ...defaultRoot(), ...parsed }
      }
    } catch {
      root.value = defaultRoot()
    }
    refreshStreak()
    loaded.value = true
  }

  function save() {
    if (import.meta.server) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(root.value))
    } catch {
      /* quota or private mode */
    }
  }

  function getCard(id: string, deck: string): SrsCardState {
    if (!root.value.cards[id]) {
      root.value.cards[id] = defaultCard(id, deck)
    }
    return root.value.cards[id]
  }

  function intervalForBox(box: number): number {
    if (box <= 0) return 0
    if (box >= BOX_INTERVALS_DAYS.length) return BOX_INTERVALS_DAYS[BOX_INTERVALS_DAYS.length - 1]
    return BOX_INTERVALS_DAYS[box]
  }

  /**
   * Anki-style quality ratings:
   *   again — forgot, reset to box 0, full lapse
   *   hard  — recalled with effort, box stays / +1, ease drops slightly, shorter interval
   *   good  — solid recall, box +1
   *   easy  — trivial, box +2 with ease bump
   */
  function reviewQuality(id: string, deck: string, quality: ReviewQuality) {
    const c = getCard(id, deck)
    const now = Date.now()
    c.introduced = true
    c.lastSeen = now

    let intervalMultiplier = 1
    let isCorrect = true

    if (quality === 'again') {
      isCorrect = false
      c.box = 0
      c.lapses += 1
      c.ease = Math.max(1.3, c.ease - 0.20)
      c.totalWrong += 1
    } else if (quality === 'hard') {
      // hard counts as a successful review but with shorter spacing
      c.box = Math.min(Math.max(c.box, 1), BOX_INTERVALS_DAYS.length)
      c.reps += 1
      c.ease = Math.max(1.3, c.ease - 0.05)
      c.totalCorrect += 1
      intervalMultiplier = 0.6
    } else if (quality === 'good') {
      c.box = Math.min(c.box + 1, BOX_INTERVALS_DAYS.length)
      c.reps += 1
      c.ease = Math.min(3.0, c.ease + 0.02)
      c.totalCorrect += 1
    } else {
      // easy
      c.box = Math.min(c.box + 2, BOX_INTERVALS_DAYS.length)
      c.reps += 1
      c.ease = Math.min(3.0, c.ease + 0.15)
      c.totalCorrect += 1
      intervalMultiplier = 1.3
    }

    // jitter ±10% so reviews don’t bunch
    const jitter = (Math.random() * 0.2 - 0.1) + 1
    c.due = now + intervalForBox(c.box) * DAY_MS * jitter * intervalMultiplier

    // session stats
    const day = todayKey()
    let s = root.value.sessions.find(x => x.date === day)
    if (!s) {
      s = { date: day, studied: 0, correct: 0, minutes: 0 }
      root.value.sessions.push(s)
      if (root.value.sessions.length > 90) root.value.sessions.shift()
    }
    s.studied += 1
    if (isCorrect) s.correct += 1

    root.value.totalReviewed += 1
    if (isCorrect) root.value.totalCorrect += 1

    if (root.value.lastStudyDate !== day) {
      bumpStreak(day)
    }
    save()
  }

  /** Legacy binary review — kept for callers that don’t expose ratings. */
  function review(id: string, deck: string, correct: boolean) {
    return reviewQuality(id, deck, correct ? 'good' : 'again')
  }

  function bumpStreak(today: string) {
    const last = root.value.lastStudyDate
    if (!last) {
      root.value.streak = 1
    } else {
      const lastTs = new Date(last + 'T00:00:00').getTime()
      const todayTs = new Date(today + 'T00:00:00').getTime()
      const diff = Math.round((todayTs - lastTs) / DAY_MS)
      if (diff === 0) {
        // same day
      } else if (diff === 1) {
        root.value.streak += 1
      } else {
        root.value.streak = 1
      }
    }
    root.value.lastStudyDate = today
  }

  function refreshStreak() {
    const last = root.value.lastStudyDate
    if (!last) return
    const lastTs = new Date(last + 'T00:00:00').getTime()
    const todayTs = new Date(todayKey() + 'T00:00:00').getTime()
    const diff = Math.round((todayTs - lastTs) / DAY_MS)
    if (diff > 1) root.value.streak = 0
  }

  /** Cards that are due right now from a given deck pool. */
  function getDueCards<T extends { id: string }>(pool: T[], deck: string, now = Date.now()): T[] {
    return pool.filter(p => {
      const c = root.value.cards[p.id]
      if (!c) return false
      if (!c.introduced) return false
      return c.due <= now
    })
  }

  /** New cards (never introduced) from a pool, capped to N. */
  function getNewCards<T extends { id: string }>(pool: T[], deck: string, limit: number): T[] {
    const out: T[] = []
    for (const p of pool) {
      const c = root.value.cards[p.id]
      if (!c || !c.introduced) {
        out.push(p)
        if (out.length >= limit) break
      }
    }
    return out
  }

  /** Build a session: due cards first, then a few new ones. */
  function buildSession<T extends { id: string }>(pool: T[], deck: string, opts: { maxDue?: number; newPerSession?: number } = {}): T[] {
    const maxDue = opts.maxDue ?? 30
    const newPerSession = opts.newPerSession ?? 8
    const due = getDueCards(pool, deck).slice(0, maxDue)
    const fresh = getNewCards(pool, deck, newPerSession)
    return [...due, ...fresh]
  }

  /** Cards the user has missed at least once in the past — for the “자주 틀리는” deck. */
  function getLeechCards<T extends { id: string }>(pool: T[], minLapses = 1): T[] {
    return pool.filter(p => {
      const c = root.value.cards[p.id]
      return c && c.lapses >= minLapses
    }).sort((a, b) => {
      const ca = root.value.cards[a.id]
      const cb = root.value.cards[b.id]
      return cb.lapses - ca.lapses
    })
  }

  function getStats(deck?: string) {
    const cards = Object.values(root.value.cards).filter(c => !deck || c.deck === deck)
    const introduced = cards.filter(c => c.introduced).length
    const mastered = cards.filter(c => c.box >= 5).length
    const learning = cards.filter(c => c.introduced && c.box < 5).length
    const lapses = cards.reduce((s, c) => s + c.lapses, 0)
    return { introduced, mastered, learning, lapses, total: cards.length }
  }

  function getDueCount(pool: { id: string }[]): number {
    const now = Date.now()
    let n = 0
    for (const p of pool) {
      const c = root.value.cards[p.id]
      if (c && c.introduced && c.due <= now) n++
    }
    return n
  }

  function getTodayStats(): SessionStats {
    const day = todayKey()
    return root.value.sessions.find(x => x.date === day) || { date: day, studied: 0, correct: 0, minutes: 0 }
  }

  function resetAll() {
    root.value = defaultRoot()
    save()
  }

  return {
    root,
    load,
    save,
    review,
    reviewQuality,
    getCard,
    getDueCards,
    getNewCards,
    buildSession,
    getLeechCards,
    getStats,
    getDueCount,
    getTodayStats,
    resetAll,
    refreshStreak,
  }
}
