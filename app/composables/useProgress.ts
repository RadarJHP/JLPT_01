interface ProgressData {
  learned: Record<string, boolean>  // kana -> learned
  quizScores: Record<string, { correct: number; total: number }>
  streak: number
  lastStudyDate: string | null
}

const STORAGE_KEY = 'nihongo-duel-progress'

function getDefaultProgress(): ProgressData {
  return {
    learned: {},
    quizScores: {},
    streak: 0,
    lastStudyDate: null,
  }
}

export function useProgress() {
  const progress = useState<ProgressData>('progress', () => getDefaultProgress())

  function load() {
    if (import.meta.server) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        progress.value = { ...getDefaultProgress(), ...JSON.parse(raw) }
      }
    } catch {
      progress.value = getDefaultProgress()
    }
    updateStreak()
  }

  function save() {
    if (import.meta.server) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
  }

  function markLearned(kana: string) {
    progress.value.learned[kana] = true
    progress.value.lastStudyDate = new Date().toISOString().split('T')[0]
    save()
  }

  function isLearned(kana: string): boolean {
    return !!progress.value.learned[kana]
  }

  function getLearnedCount(kanaList: string[]): number {
    return kanaList.filter(k => progress.value.learned[k]).length
  }

  function recordQuiz(type: string, correct: number, total: number) {
    const existing = progress.value.quizScores[type] || { correct: 0, total: 0 }
    progress.value.quizScores[type] = {
      correct: existing.correct + correct,
      total: existing.total + total,
    }
    progress.value.lastStudyDate = new Date().toISOString().split('T')[0]
    save()
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0]
    const last = progress.value.lastStudyDate
    if (!last) {
      progress.value.streak = 0
      return
    }
    const lastDate = new Date(last)
    const todayDate = new Date(today)
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // same day, keep streak
    } else if (diffDays === 1) {
      progress.value.streak += 1
    } else {
      progress.value.streak = 0
    }
    save()
  }

  function resetProgress() {
    progress.value = getDefaultProgress()
    save()
  }

  const learned = computed(() => progress.value.learned)
  const streak = computed(() => progress.value.streak)
  const lastStudyDate = computed(() => progress.value.lastStudyDate)
  const quizScores = computed(() => progress.value.quizScores)

  return {
    learned,
    streak,
    lastStudyDate,
    quizScores,
    load,
    markLearned,
    isLearned,
    getLearnedCount,
    recordQuiz,
    resetProgress,
  }
}
