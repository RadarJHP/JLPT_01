<script setup lang="ts">
import { getAllVocab, type VocabItem } from '~/data/vocab'
import { getAllHiragana, type KanaChar } from '~/data/hiragana'
import { getAllKatakana } from '~/data/katakana'

const srs = useSrs()
onMounted(() => srs.load())

const allHiragana = getAllHiragana().map(c => ({ ...c, id: `hiragana:${c.kana}` }))
const allKatakana = getAllKatakana().map(c => ({ ...c, id: `katakana:${c.kana}` }))
const allVocab = getAllVocab()

const dueHira = computed(() => srs.getDueCount(allHiragana))
const dueKata = computed(() => srs.getDueCount(allKatakana))
const dueVocab = computed(() => srs.getDueCount(allVocab))

const totalDue = computed(() => dueHira.value + dueKata.value + dueVocab.value)

const todayStats = computed(() => srs.getTodayStats())

// Sliced 14-day mini calendar — height capped at 100% so a heavy day can't overflow the chart
const last14 = computed(() => {
  const days: { date: string; studied: number; correct: number; isToday: boolean }[] = []
  const todayKey = new Date().toISOString().slice(0, 10)
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const s = srs.root.value.sessions.find(x => x.date === key)
    days.push({ date: key, studied: s?.studied || 0, correct: s?.correct || 0, isToday: key === todayKey })
  }
  return days
})
// Scale so that the busiest day in the window fills the bar — keeps everything in-frame
const peakStudied = computed(() => Math.max(1, ...last14.value.map(d => d.studied)))
function barHeight(studied: number): number {
  if (studied <= 0) return 8
  // 8% min so empty days are visible; 100% max so the bar can't overflow
  return Math.min(100, Math.max(8, (studied / peakStudied.value) * 100))
}

// Leeches
const vocabLeeches = computed(() => srs.getLeechCards(allVocab as any, 1).slice(0, 8) as VocabItem[])

// Study session state — supports vocab (SrsCardQuiz) and kana (LearnQuiz) modes
type StudyMode = 'vocab' | 'kana'
const studying = ref(false)
const studyMode = ref<StudyMode>('vocab')
const sessionVocab = ref<VocabItem[]>([])
const sessionKana = ref<KanaChar[]>([])
const sessionKanaDeck = ref<'hiragana' | 'katakana'>('hiragana')

function startMixedReview() {
  // Vocab review — only fires when there are due vocab cards
  const due = srs.buildSession(allVocab, 'vocab-review', { maxDue: 30, newPerSession: 0 })
  if (due.length === 0) return
  sessionVocab.value = due
  studyMode.value = 'vocab'
  studying.value = true
}

function startKanaReview(deck: 'hiragana' | 'katakana') {
  const pool = deck === 'hiragana' ? allHiragana : allKatakana
  const due = srs.buildSession(pool, deck, { maxDue: 30, newPerSession: 0 })
  if (due.length === 0) return
  // strip the synthetic id we added for due-counting; LearnQuiz adds its own
  sessionKana.value = due.map(({ id: _id, ...rest }) => rest as KanaChar)
  sessionKanaDeck.value = deck
  studyMode.value = 'kana'
  studying.value = true
}

function backFromStudy() {
  studying.value = false
}
</script>

<template>
  <div>
    <div v-if="!studying">
      <div class="mb-6">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span>🗓️</span> 오늘의 복습
        </h1>
        <p class="text-sm text-fg-muted">짬짬이 5분, 잊을 만할 때 다시 보기</p>
      </div>

      <!-- Big "due" hero -->
      <div class="card p-5 mb-4 border-2 border-yama/25 bg-yama-soft/40">
        <div class="flex items-center gap-4">
          <div class="text-4xl animate-float">⏰</div>
          <div class="flex-1">
            <div class="text-3xl font-800 text-fg-strong font-en tabular-nums">{{ totalDue }}</div>
            <div class="text-sm text-fg-muted">개 복습 대기 중</div>
          </div>
          <button
            v-if="dueVocab > 0"
            class="btn-sakura font-700"
            @click="startMixedReview"
          >
            단어 시작
          </button>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-2 text-center">
          <button
            class="bg-bg-inset rounded-md py-2 transition-all hover:bg-ai-soft hover:ring-1 hover:ring-ai/30 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="dueHira === 0"
            @click="startKanaReview('hiragana')"
          >
            <div class="text-lg font-700 text-ai">{{ dueHira }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">히라가나</div>
          </button>
          <button
            class="bg-bg-inset rounded-md py-2 transition-all hover:bg-cta-soft hover:ring-1 hover:ring-cta/30 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="dueKata === 0"
            @click="startKanaReview('katakana')"
          >
            <div class="text-lg font-700 text-cta">{{ dueKata }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">카타카나</div>
          </button>
          <button
            class="bg-bg-inset rounded-md py-2 transition-all hover:bg-sakura-soft hover:ring-1 hover:ring-sakura/30 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="dueVocab === 0"
            @click="startMixedReview"
          >
            <div class="text-lg font-700 text-sakura">{{ dueVocab }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">단어</div>
          </button>
        </div>
      </div>

      <!-- 14-day calendar — bars are normalized against the busiest day in the window -->
      <div class="card p-4 mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-xs font-600 text-fg-muted uppercase tracking-wider">최근 14일</div>
          <div class="text-xs text-fg-faint">🔥 {{ srs.root.value.streak }}일 연속</div>
        </div>
        <div class="flex items-end gap-1 h-16 overflow-hidden">
          <div
            v-for="d in last14"
            :key="d.date"
            class="flex-1 rounded-sm relative group"
            :class="d.isToday ? 'bg-sakura/40' : d.studied > 0 ? 'bg-matcha/35' : 'bg-fg-faint/12'"
            :style="{ height: barHeight(d.studied) + '%' }"
            :title="`${d.date}: ${d.studied}개 학습`"
          />
        </div>
      </div>

      <!-- Today stats -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="card p-3 text-center">
          <div class="text-xl font-700 text-fg-strong font-en tabular-nums">{{ todayStats.studied }}</div>
          <div class="text-[10px] text-fg-muted uppercase tracking-wider">오늘 푼 카드</div>
        </div>
        <div class="card p-3 text-center">
          <div class="text-xl font-700 text-success font-en tabular-nums">
            {{ todayStats.studied > 0 ? Math.round(todayStats.correct / todayStats.studied * 100) : 0 }}%
          </div>
          <div class="text-[10px] text-fg-muted uppercase tracking-wider">정답률</div>
        </div>
        <div class="card p-3 text-center">
          <div class="text-xl font-700 text-yama font-en tabular-nums">{{ srs.root.value.streak }}🔥</div>
          <div class="text-[10px] text-fg-muted uppercase tracking-wider">연속</div>
        </div>
      </div>

      <!-- Leeches preview -->
      <div v-if="vocabLeeches.length > 0" class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm font-700 text-fg-strong">🩹 자주 틀리는 단어</div>
          <NuxtLink to="/vocab" class="text-xs text-sakura no-underline">전체 →</NuxtLink>
        </div>
        <div class="space-y-2">
          <div
            v-for="v in vocabLeeches"
            :key="v.id"
            class="flex items-center gap-3 py-1.5 border-b border-fg-faint/8 last:border-0"
          >
            <span class="kana-display text-lg text-fg-strong w-16">{{ v.word }}</span>
            <span class="text-xs text-jp text-fg-muted w-20">{{ v.reading }}</span>
            <span class="text-xs text-fg flex-1">{{ v.meaning }}</span>
            <span class="badge bg-error-soft text-error">×{{ srs.root.value.cards[v.id]?.lapses || 0 }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <button class="text-sm text-fg-muted hover:text-fg mb-4" @click="backFromStudy">← 복습 종료</button>
      <SrsCardQuiz
        v-if="studyMode === 'vocab'"
        :cards="sessionVocab"
        deck="vocab-review"
        accent-color="sakura"
      />
      <LearnQuiz
        v-else
        :key="sessionKanaDeck + '-review'"
        :chars="sessionKana"
        :accent-color="sessionKanaDeck === 'katakana' ? 'cta' : 'ai'"
        :deck="sessionKanaDeck"
      />
    </div>
  </div>
</template>
