<script setup lang="ts">
import { getKatakanaRows, getAllKatakana, type KanaRow } from '~/data/katakana'

const rows = getKatakanaRows()
const selectedRow = ref<KanaRow | null>(null)
const allMode = ref(false)

function selectRow(row: KanaRow) {
  allMode.value = false
  selectedRow.value = row
}

function selectAll() {
  allMode.value = true
  selectedRow.value = {
    name: '전체 카타카나',
    nameJp: 'all',
    chars: getAllKatakana(),
  }
}

function goBack() {
  selectedRow.value = null
  allMode.value = false
}

function handleComplete(score: number, total: number) {
  // Could save progress here
}
</script>

<template>
  <div>
    <!-- Row selection -->
    <div v-if="!selectedRow">
      <div class="mb-6">
        <h1 class="text-2xl font-700 text-fg-strong mb-1">카타카나</h1>
        <p class="text-sm text-fg-muted">행을 골라서 5글자씩 배우거나, 전체 도전!</p>
      </div>

      <!-- All button -->
      <button
        class="w-full card p-4 mb-4 text-left cursor-pointer hover:border-cta/30 hover:shadow-glow-cta transition-all"
        @click="selectAll"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-sm bg-cta-light flex items-center justify-center">
            <span class="text-cta font-700 text-sm">46</span>
          </div>
          <div>
            <div class="font-600 text-fg-strong">전체 카타카나 도전</div>
            <div class="text-xs text-fg-muted">46글자 한번에 배우기</div>
          </div>
        </div>
      </button>

      <!-- Row list -->
      <div class="space-y-2">
        <button
          v-for="row in rows"
          :key="row.nameJp"
          class="w-full card p-4 text-left cursor-pointer hover:border-fg-faint/30 transition-all"
          @click="selectRow(row)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <span
                  v-for="char in row.chars.slice(0, 3)"
                  :key="char.kana"
                  class="kana-display text-lg text-fg-muted"
                >{{ char.kana }}</span>
                <span v-if="row.chars.length > 3" class="text-fg-faint text-sm">...</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-600 text-fg">{{ row.name }}</div>
              <div class="text-xs text-fg-faint">{{ row.chars.length }}글자</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Learning quiz -->
    <div v-else>
      <button
        class="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-4 cursor-pointer"
        @click="goBack"
      >
        ← {{ selectedRow.name }}
      </button>

      <LearnQuiz
        :key="selectedRow.nameJp"
        :chars="selectedRow.chars"
        accent-color="cta"
        @complete="handleComplete"
      />
    </div>
  </div>
</template>
