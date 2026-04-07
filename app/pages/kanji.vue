<script setup lang="ts">
import { getAllKanji, getKanjiByLevel, getKanjiCategories, getKanjiByCategory, type KanjiItem, type JlptLevel } from '~/data/kanji'

const srs = useSrs()
onMounted(() => srs.load())

const selectedLevel = ref<JlptLevel>('N5')
const session = ref<KanjiItem[]>([])
const sessionTitle = ref('')
const sessionDeck = ref('kanji-n5')
const studying = ref(false)
const direction = ref<'jp-ko' | 'ko-jp'>('jp-ko')

const stats = computed(() => {
  const pool = getKanjiByLevel(selectedLevel.value)
  let learned = 0, mastered = 0
  for (const k of pool) {
    const c = srs.root.value.cards[k.id]
    if (c?.introduced) learned++
    if (c && c.box >= 5) mastered++
  }
  return { learned, mastered, total: pool.length }
})

const due = computed(() => srs.getDueCount(getAllKanji()))
const leeches = computed(() => srs.getLeechCards(getAllKanji() as any, 1) as KanjiItem[])

function startAll() {
  session.value = getKanjiByLevel(selectedLevel.value)
  sessionTitle.value = `${selectedLevel.value} 한자 전체`
  sessionDeck.value = `kanji-${selectedLevel.value.toLowerCase()}`
  studying.value = true
}
function startCategory(cat: string) {
  session.value = getKanjiByCategory(selectedLevel.value, cat)
  sessionTitle.value = `${selectedLevel.value} · ${cat}`
  sessionDeck.value = `kanji-${selectedLevel.value.toLowerCase()}-${cat}`
  studying.value = true
}
function startLeeches() {
  if (leeches.value.length === 0) return
  session.value = leeches.value.slice(0, 12)
  sessionTitle.value = '자주 틀리는 한자'
  sessionDeck.value = 'kanji-leech'
  studying.value = true
}
function back() { studying.value = false }
</script>

<template>
  <div>
    <div v-if="!studying">
      <div class="mb-5">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span class="kana-display text-matcha">漢</span> 한자
        </h1>
        <p class="text-sm text-fg-muted">N5 약 80자 → N4 → N3 (총 ~650자)</p>
      </div>

      <button v-if="leeches.length > 0" class="card-hover w-full p-4 mb-3 text-left border-yama/30 bg-yama-soft/20" @click="startLeeches">
        <div class="flex items-center gap-3">
          <div class="text-2xl">⚠️</div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">자주 틀리는 한자</div>
            <div class="text-xs text-fg-muted">{{ leeches.length }}자 · 약점 보강</div>
          </div>
          <span class="text-yama">→</span>
        </div>
      </button>

      <!-- Direction toggle -->
      <div class="flex gap-1 p-1 bg-bg-inset rounded-lg mb-3">
        <button class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="direction === 'jp-ko' ? 'bg-card text-matcha shadow-xs' : 'text-fg-muted'"
          @click="direction = 'jp-ko'">
          漢 → 뜻
        </button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="direction === 'ko-jp' ? 'bg-card text-matcha shadow-xs' : 'text-fg-muted'"
          @click="direction = 'ko-jp'">
          뜻 → 漢
        </button>
      </div>

      <!-- Level tabs -->
      <div class="flex gap-1 p-1 bg-bg-inset rounded-lg mb-4">
        <button v-for="lv in (['N5'] as JlptLevel[])" :key="lv"
          class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="selectedLevel === lv ? 'bg-card text-matcha shadow-xs' : 'text-fg-muted'"
          @click="selectedLevel = lv">
          {{ lv }}
        </button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 text-fg-faint cursor-not-allowed" disabled>N4</button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 text-fg-faint cursor-not-allowed" disabled>N3</button>
      </div>

      <!-- Stats -->
      <div class="card p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-700 text-fg-strong">{{ selectedLevel }} 진행도</span>
          <span class="text-xs text-fg-muted font-en tabular-nums">{{ stats.learned }}/{{ stats.total }}</span>
        </div>
        <div class="h-1.5 bg-fg-faint/12 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-matcha rounded-full transition-all" :style="{ width: (stats.learned / Math.max(stats.total, 1) * 100) + '%' }" />
        </div>
        <div class="grid grid-cols-3 gap-2 text-center text-xs mt-2">
          <div><div class="font-700 text-fg">{{ stats.learned }}</div><div class="text-fg-faint text-[10px]">학습</div></div>
          <div><div class="font-700 text-success">{{ stats.mastered }}</div><div class="text-fg-faint text-[10px]">마스터</div></div>
          <div><div class="font-700 text-yama">{{ due }}</div><div class="text-fg-faint text-[10px]">복습</div></div>
        </div>
      </div>

      <!-- All -->
      <button class="w-full btn-matcha font-700 mb-3" @click="startAll">
        {{ selectedLevel }} 전체 도전 ({{ stats.total }}자)
      </button>

      <!-- Categories -->
      <div class="space-y-2">
        <button v-for="cat in getKanjiCategories(selectedLevel)" :key="cat"
          class="card-hover w-full p-4 text-left" @click="startCategory(cat)">
          <div class="flex items-center gap-3">
            <div class="flex gap-1">
              <span v-for="k in getKanjiByCategory(selectedLevel, cat).slice(0, 4)" :key="k.id"
                class="kana-display text-base text-fg-muted">{{ k.kanji }}</span>
            </div>
            <div class="ml-auto text-right">
              <div class="text-sm font-600 text-fg">{{ cat }}</div>
              <div class="text-xs text-fg-faint">{{ getKanjiByCategory(selectedLevel, cat).length }}자</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div v-else>
      <button class="text-sm text-fg-muted hover:text-fg mb-4" @click="back">← {{ sessionTitle }}</button>
      <KanjiQuiz :key="sessionDeck + '-' + direction" :cards="session" :deck="sessionDeck" :direction="direction" />
    </div>
  </div>
</template>
