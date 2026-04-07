<script setup lang="ts">
import {
  getHiraganaRows,
  getHiraganaDakutenRows,
  getHiraganaYoonRows,
  getAllHiragana,
  getAllHiraganaFull,
  type KanaRow,
} from '~/data/hiragana'

const baseRows = getHiraganaRows()
const dakutenRows = getHiraganaDakutenRows()
const yoonRows = getHiraganaYoonRows()

const selectedRow = ref<KanaRow | null>(null)
const selectedRowIndex = ref<number>(-1) // index within current tab's rows; -1 if not from a row list
const tab = ref<'base' | 'dakuten' | 'yoon'>('base')

// Range mode UI state
const showRange = ref(false)
const rangeStart = ref(0)
const rangeEnd = ref(0)

const rowsForTab = computed(() => {
  if (tab.value === 'dakuten') return dakutenRows
  if (tab.value === 'yoon') return yoonRows
  return baseRows
})

// Reset range bounds when tab changes
watch(tab, () => {
  rangeStart.value = 0
  rangeEnd.value = Math.max(rowsForTab.value.length - 1, 0)
})
// Initialize once
rangeEnd.value = Math.max(rowsForTab.value.length - 1, 0)

function selectRow(row: KanaRow, index: number) {
  selectedRow.value = row
  selectedRowIndex.value = index
}
function selectAllBasic() {
  selectedRow.value = { name: '청음 46자 전체', nameJp: 'all-basic', chars: getAllHiragana() }
  selectedRowIndex.value = -1
}
function selectAllFull() {
  selectedRow.value = { name: '히라가나 전체 (요음 포함)', nameJp: 'all-full', chars: getAllHiraganaFull() }
  selectedRowIndex.value = -1
}
function startRange() {
  const rows = rowsForTab.value
  let a = Math.min(rangeStart.value, rangeEnd.value)
  let b = Math.max(rangeStart.value, rangeEnd.value)
  a = Math.max(0, Math.min(a, rows.length - 1))
  b = Math.max(0, Math.min(b, rows.length - 1))
  const slice = rows.slice(a, b + 1)
  const chars = slice.flatMap(r => r.chars)
  if (chars.length === 0) return
  const label = slice.length === 1 ? slice[0].name : `${slice[0].name} ~ ${slice[slice.length - 1].name}`
  selectedRow.value = {
    name: `📐 ${label} 랜덤`,
    nameJp: `range-${tab.value}-${a}-${b}`,
    chars,
  }
  selectedRowIndex.value = -1
}
function goBack() {
  selectedRow.value = null
  selectedRowIndex.value = -1
}
function goNextRow() {
  if (selectedRowIndex.value < 0) return
  const rows = rowsForTab.value
  const next = selectedRowIndex.value + 1
  if (next >= rows.length) return
  selectedRow.value = rows[next]
  selectedRowIndex.value = next
}

const hasNextRow = computed(() =>
  selectedRowIndex.value >= 0 && selectedRowIndex.value < rowsForTab.value.length - 1,
)
const nextRowLabel = computed(() => {
  if (!hasNextRow.value) return ''
  return rowsForTab.value[selectedRowIndex.value + 1]?.name || '다음 행'
})
</script>

<template>
  <div>
    <div v-if="!selectedRow">
      <div class="mb-5">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span class="kana-display text-ai">あ</span> 히라가나
        </h1>
        <p class="text-sm text-fg-muted">청음 46 + 탁음·반탁음 25 + 요음 33 = 총 104자</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 p-1 bg-bg-inset rounded-lg mb-4">
        <button
          class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="tab === 'base' ? 'bg-card text-fg-strong shadow-xs' : 'text-fg-muted'"
          @click="tab = 'base'"
        >
          청음 (46)
        </button>
        <button
          class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="tab === 'dakuten' ? 'bg-card text-fg-strong shadow-xs' : 'text-fg-muted'"
          @click="tab = 'dakuten'"
        >
          탁음·반탁음 (25)
        </button>
        <button
          class="flex-1 py-2 rounded-md text-xs font-600 transition-all"
          :class="tab === 'yoon' ? 'bg-card text-fg-strong shadow-xs' : 'text-fg-muted'"
          @click="tab = 'yoon'"
        >
          요음 (33)
        </button>
      </div>

      <!-- Big challenge buttons -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <button class="card-hover p-4 text-left" @click="selectAllBasic">
          <div class="font-700 text-fg-strong text-sm mb-0.5">청음 46자 전체</div>
          <div class="text-xs text-fg-muted">기본 한 번에</div>
        </button>
        <button class="card-hover p-4 text-left border-ai/20" @click="selectAllFull">
          <div class="font-700 text-ai text-sm mb-0.5">전체 104자 도전</div>
          <div class="text-xs text-fg-muted">탁음+요음 포함</div>
        </button>
      </div>

      <!-- Range mode -->
      <div class="card mb-4">
        <button
          class="w-full p-3 flex items-center justify-between text-left"
          @click="showRange = !showRange"
        >
          <span class="text-sm font-700 text-fg-strong">📐 범위 랜덤 도전</span>
          <span class="text-xs text-fg-faint">{{ showRange ? '닫기' : '시작/끝 행을 골라 랜덤으로' }}</span>
        </button>
        <div v-if="showRange" class="px-3 pb-3 border-t border-fg-faint/10 pt-3">
          <div class="grid grid-cols-2 gap-2 mb-3">
            <label class="block">
              <span class="text-[10px] text-fg-faint uppercase tracking-wider mb-1 block">시작 행</span>
              <select v-model.number="rangeStart" class="w-full text-sm bg-bg-inset border border-fg-faint/15 rounded-md px-2 py-2">
                <option v-for="(r, i) in rowsForTab" :key="r.nameJp" :value="i">{{ r.name }}</option>
              </select>
            </label>
            <label class="block">
              <span class="text-[10px] text-fg-faint uppercase tracking-wider mb-1 block">끝 행</span>
              <select v-model.number="rangeEnd" class="w-full text-sm bg-bg-inset border border-fg-faint/15 rounded-md px-2 py-2">
                <option v-for="(r, i) in rowsForTab" :key="r.nameJp" :value="i">{{ r.name }}</option>
              </select>
            </label>
          </div>
          <button class="btn w-full text-sm font-700 py-2.5 bg-ai text-bg-DEFAULT" @click="startRange">
            이 범위로 랜덤 시작 →
          </button>
        </div>
      </div>

      <!-- Row list -->
      <div class="space-y-2">
        <button
          v-for="(row, idx) in rowsForTab"
          :key="row.nameJp"
          class="card-hover w-full p-4 text-left"
          @click="selectRow(row, idx)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex gap-1 min-w-32">
                <span
                  v-for="char in row.chars.slice(0, 5)"
                  :key="char.kana"
                  class="kana-display text-base text-fg-muted"
                >{{ char.kana }}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-600 text-fg">{{ row.name }}</div>
              <div class="text-xs text-fg-faint">{{ row.chars.length }}자</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div v-else>
      <button class="text-sm text-fg-muted hover:text-fg mb-4 inline-flex items-center gap-1" @click="goBack">
        ← {{ selectedRow.name }}
      </button>
      <LearnQuiz
        :key="selectedRow.nameJp"
        :chars="selectedRow.chars"
        accent-color="ai"
        deck="hiragana"
        :has-next="hasNextRow"
        :next-label="nextRowLabel"
        @next="goNextRow"
      />
    </div>
  </div>
</template>
