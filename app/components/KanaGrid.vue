<script setup lang="ts">
import type { KanaRow } from '~/data/hiragana'

defineProps<{
  rows: KanaRow[]
  learnedSet: Record<string, boolean>
}>()

const emit = defineEmits<{
  select: [row: KanaRow]
}>()
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="row in rows"
      :key="row.nameJp"
      class="card p-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
      @click="emit('select', row)"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-600 text-fg-strong">{{ row.name }}</h3>
        <span class="text-sm text-fg-muted font-en">
          {{ row.chars.filter(c => learnedSet[c.kana]).length }}/{{ row.chars.length }}
        </span>
      </div>

      <!-- Kana preview -->
      <div class="flex gap-2 flex-wrap">
        <div
          v-for="char in row.chars"
          :key="char.kana"
          class="w-10 h-10 flex items-center justify-center rounded-sm text-lg kana-display transition-all"
          :class="learnedSet[char.kana]
            ? 'bg-success-light text-success border border-success/20'
            : 'bg-fg/4 text-fg-muted'"
        >
          {{ char.kana }}
        </div>
      </div>

      <!-- Progress -->
      <div class="mt-3 h-1.5 bg-fg/6 rounded-full overflow-hidden">
        <div
          class="h-full bg-success rounded-full transition-all duration-500"
          :style="{ width: (row.chars.filter(c => learnedSet[c.kana]).length / row.chars.length * 100) + '%' }"
        />
      </div>
    </div>
  </div>
</template>
