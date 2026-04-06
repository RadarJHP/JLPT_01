<script setup lang="ts">
const props = defineProps<{
  current: number
  total: number
  label?: string
  color?: string
}>()

const percentage = computed(() =>
  props.total === 0 ? 0 : Math.round((props.current / props.total) * 100)
)
</script>

<template>
  <div class="w-full">
    <div v-if="label" class="flex justify-between items-center mb-1.5">
      <span class="text-sm font-500 text-fg">{{ label }}</span>
      <span class="text-sm text-fg-muted font-en">{{ current }}/{{ total }}</span>
    </div>
    <div class="h-2.5 bg-fg/6 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full progress-fill transition-all duration-500"
        :class="color || 'bg-ai'"
        :style="{ width: percentage + '%' }"
      />
    </div>
  </div>
</template>
