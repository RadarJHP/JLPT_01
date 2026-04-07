<script setup lang="ts">
import { getAllVocab, type VocabItem } from '~/data/vocab'
import { getAllHiragana } from '~/data/hiragana'
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

// Sliced 14-day mini calendar
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

// Leeches
const vocabLeeches = computed(() => srs.getLeechCards(allVocab as any, 1).slice(0, 8) as VocabItem[])

// Start a session pulling all due across decks
const sessionVocab = ref<VocabItem[]>([])
const studying = ref(false)

function startMixedReview() {
  // Build a mixed vocab session of due items only (kana sessions live on their own pages)
  const due = srs.buildSession(allVocab, 'vocab-review', { maxDue: 30, newPerSession: 0 })
  if (due.length === 0) return
  sessionVocab.value = due
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
            시작
          </button>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-2 text-center">
          <div class="bg-bg-inset rounded-md py-2">
            <div class="text-lg font-700 text-ai">{{ dueHira }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">히라가나</div>
          </div>
          <div class="bg-bg-inset rounded-md py-2">
            <div class="text-lg font-700 text-cta">{{ dueKata }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">카타카나</div>
          </div>
          <div class="bg-bg-inset rounded-md py-2">
            <div class="text-lg font-700 text-sakura">{{ dueVocab }}</div>
            <div class="text-[10px] text-fg-muted uppercase tracking-wider">단어</div>
          </div>
        </div>
      </div>

      <!-- 14-day calendar -->
      <div class="card p-4 mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-xs font-600 text-fg-muted uppercase tracking-wider">최근 14일</div>
          <div class="text-xs text-fg-faint">🔥 {{ srs.root.value.streak }}일 연속</div>
        </div>
        <div class="flex items-end gap-1 h-16">
          <div
            v-for="d in last14"
            :key="d.date"
            class="flex-1 rounded-sm relative group"
            :class="d.isToday ? 'bg-sakura/40' : d.studied > 0 ? 'bg-matcha/35' : 'bg-fg-faint/12'"
            :style="{ height: Math.max(d.studied / 30 * 100, 8) + '%' }"
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
        :cards="sessionVocab"
        deck="vocab-review"
        accent-color="sakura"
      />
    </div>
  </div>
</template>
