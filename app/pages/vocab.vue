<script setup lang="ts">
import {
  getAllVocab,
  getVocabByLevel,
  getVocabCategories,
  vocabDeckId,
  type JlptLevel,
  type VocabItem,
} from '~/data/vocab'

const srs = useSrs()
onMounted(() => srs.load())

type Mode = 'menu' | 'study'

const mode = ref<Mode>('menu')
const selectedLevel = ref<JlptLevel | 'ALL'>('N5')
const selectedCategory = ref<string | null>(null)
const session = ref<VocabItem[]>([])
const sessionDeck = ref<string>('vocab')
const sessionTitle = ref<string>('')
const direction = ref<'jp-ko' | 'ko-jp'>('jp-ko')

const levels: { id: JlptLevel; label: string; tag: string; goal: string }[] = [
  { id: 'N5', label: 'N5', tag: '입문', goal: '기초 800단어' },
  { id: 'N4', label: 'N4', tag: '초급', goal: '일상 1500단어' },
  { id: 'N3', label: 'N3', tag: '중급', goal: '실용 3750단어 (목표!)' },
]

const filteredCards = computed<VocabItem[]>(() => {
  let pool: VocabItem[] = selectedLevel.value === 'ALL' ? getAllVocab() : getVocabByLevel(selectedLevel.value)
  if (selectedCategory.value) pool = pool.filter(p => p.category === selectedCategory.value)
  return pool
})

const categories = computed(() => {
  const lvl = selectedLevel.value === 'ALL' ? undefined : selectedLevel.value
  return getVocabCategories(lvl)
})

const dueByLevel = computed(() => {
  const out: Record<string, number> = {}
  for (const lv of levels) {
    out[lv.id] = srs.getDueCount(getVocabByLevel(lv.id))
  }
  return out
})

const statsByLevel = computed(() => {
  const out: Record<string, { learned: number; total: number; mastered: number }> = {}
  for (const lv of levels) {
    const pool = getVocabByLevel(lv.id)
    let learned = 0, mastered = 0
    for (const v of pool) {
      const c = srs.root.value.cards[v.id]
      if (c?.introduced) learned++
      if (c && c.box >= 5) mastered++
    }
    out[lv.id] = { learned, mastered, total: pool.length }
  }
  return out
})

function startStudy(level: JlptLevel | 'ALL', category?: string | null) {
  selectedLevel.value = level
  selectedCategory.value = category ?? null
  session.value = filteredCards.value
  sessionDeck.value = vocabDeckId(level === 'ALL' ? undefined : level)
  sessionTitle.value = level === 'ALL'
    ? '전체 단어'
    : category
      ? `${level} · ${category}`
      : `${level} 전체`
  mode.value = 'study'
}

function startLeechStudy() {
  // 자주 틀리는 단어
  const all = getAllVocab()
  const leeches = srs.getLeechCards(all, 1)
  if (leeches.length === 0) return
  session.value = leeches.slice(0, 20)
  sessionDeck.value = 'vocab-leech'
  sessionTitle.value = '자주 틀리는 단어'
  mode.value = 'study'
}

function backToMenu() {
  mode.value = 'menu'
}

const leechCount = computed(() => srs.getLeechCards(getAllVocab(), 1).length)
</script>

<template>
  <div>
    <div v-if="mode === 'menu'">
      <div class="mb-6">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span>🌸</span> 단어 학습
        </h1>
        <p class="text-sm text-fg-muted">JLPT 레벨별로 차근차근. 최종 목표는 N3.</p>
      </div>

      <!-- Direction toggle -->
      <div class="flex gap-1 p-1 bg-bg-inset rounded-lg mb-4">
        <button class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="direction === 'jp-ko' ? 'bg-card text-sakura shadow-xs' : 'text-fg-muted'"
          @click="direction = 'jp-ko'">
          🇯🇵 → 🇰🇷 일본어 보고 뜻
        </button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="direction === 'ko-jp' ? 'bg-card text-sakura shadow-xs' : 'text-fg-muted'"
          @click="direction = 'ko-jp'">
          🇰🇷 → 🇯🇵 뜻 보고 일본어
        </button>
      </div>

      <!-- Leech deck (frequently wrong) -->
      <button
        v-if="leechCount > 0"
        class="card-hover w-full p-4 mb-4 text-left border-yama/30 bg-yama-soft/30"
        @click="startLeechStudy"
      >
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-yama-light flex items-center justify-center text-2xl">⚠️</div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">자주 틀리는 단어 다시 보기</div>
            <div class="text-xs text-fg-muted">총 {{ leechCount }}개 · 약점부터 메우기</div>
          </div>
          <span class="text-yama text-lg">→</span>
        </div>
      </button>

      <!-- Level cards -->
      <div class="space-y-3 mb-6">
        <div
          v-for="lv in levels"
          :key="lv.id"
          class="card overflow-hidden"
        >
          <button class="w-full p-5 text-left" @click="startStudy(lv.id)">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-lg flex items-center justify-center font-800 text-lg shrink-0"
                :class="lv.id === 'N5' ? 'bg-success-soft text-success' : lv.id === 'N4' ? 'bg-ai-soft text-ai' : 'bg-sakura-soft text-sakura'">
                {{ lv.label }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-700 text-fg-strong">{{ lv.label }}</span>
                  <span class="text-xs text-fg-faint">· {{ lv.tag }}</span>
                </div>
                <p class="text-xs text-fg-muted mb-2">{{ lv.goal }}</p>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-fg-faint/12 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="lv.id === 'N5' ? 'bg-success' : lv.id === 'N4' ? 'bg-ai' : 'bg-sakura'"
                      :style="{ width: ((statsByLevel[lv.id].learned / Math.max(statsByLevel[lv.id].total, 1)) * 100) + '%' }"
                    />
                  </div>
                  <span class="text-xs text-fg-faint font-en tabular-nums">
                    {{ statsByLevel[lv.id].learned }}/{{ statsByLevel[lv.id].total }}
                  </span>
                </div>
                <div v-if="dueByLevel[lv.id] > 0" class="mt-2 text-xs text-yama font-600">
                  ⏰ 복습 대기 {{ dueByLevel[lv.id] }}개
                </div>
              </div>
            </div>
          </button>

          <!-- Categories within this level -->
          <div class="px-5 pb-4 flex flex-wrap gap-1.5">
            <button
              v-for="cat in getVocabCategories(lv.id)"
              :key="lv.id + cat"
              class="text-xs px-2.5 py-1 rounded-full bg-bg-inset hover:bg-bg-elevated text-fg-muted hover:text-fg transition-all"
              @click="startStudy(lv.id, cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Mixed challenge -->
      <button class="card-hover w-full p-4 text-left" @click="startStudy('ALL')">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-xl">🌀</div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">전체 섞어서 도전</div>
            <div class="text-xs text-fg-muted">레벨 무관 랜덤 세션</div>
          </div>
          <span class="text-accent text-lg">→</span>
        </div>
      </button>
    </div>

    <!-- Study mode -->
    <div v-else>
      <button class="text-sm text-fg-muted hover:text-fg mb-4" @click="backToMenu">
        ← {{ sessionTitle }}
      </button>
      <SrsCardQuiz
        :key="sessionDeck + '-' + (selectedCategory || 'all') + '-' + direction"
        :cards="session"
        :deck="sessionDeck"
        :direction="direction"
        accent-color="sakura"
      />
    </div>
  </div>
</template>
