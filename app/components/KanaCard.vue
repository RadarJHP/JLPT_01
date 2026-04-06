<script setup lang="ts">
import type { KanaChar } from '~/data/hiragana'

const props = defineProps<{
  char: KanaChar
  isLearned: boolean
}>()

const emit = defineEmits<{
  learned: [kana: string]
}>()

const flipped = ref(false)

function toggle() {
  flipped.value = !flipped.value
}

function markDone() {
  emit('learned', props.char.kana)
}

// SVG mnemonic illustrations (simple geometric representations)
const mnemonicSvgs: Record<string, string> = {
  // Hiragana
  'surprised-person': `<circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="37" x2="50" y2="70" stroke="currentColor" stroke-width="2"/><line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/><line x1="40" y1="70" x2="50" y2="85" stroke="currentColor" stroke-width="2"/><line x1="60" y1="70" x2="50" y2="85" stroke="currentColor" stroke-width="2.5"/>`,
  'two-people': `<line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="25" x2="60" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'pouting-face': `<circle cx="45" cy="30" r="3" fill="currentColor"/><path d="M 35 55 Q 55 45 55 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'mountain': `<path d="M 15 75 L 45 25 L 55 45 L 70 20 L 85 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'golf-swing': `<circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 50 30 L 50 60 Q 50 75 35 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'katana': `<line x1="30" y1="15" x2="30" y2="85" stroke="currentColor" stroke-width="2"/><line x1="30" y1="40" x2="70" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'key': `<circle cx="50" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" stroke-width="2"/><line x1="50" y1="60" x2="62" y2="60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="72" x2="62" y2="72" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'bird-beak': `<path d="M 70 30 L 25 55 L 70 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'fish-hook': `<path d="M 50 15 Q 50 70 30 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'tsunami': `<path d="M 20 55 Q 50 20 80 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'no-sign': `<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M 40 30 Q 55 50 45 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'laughing': `<circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 42 22 Q 50 30 58 22" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="37" x2="50" y2="65" stroke="currentColor" stroke-width="2"/><path d="M 35 50 Q 25 45 20 55" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'smile': `<path d="M 25 40 Q 50 70 75 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'fuji': `<circle cx="50" cy="22" r="3" fill="currentColor"/><path d="M 20 75 Q 35 50 50 35 Q 65 50 80 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'hill': `<path d="M 20 60 L 50 30 L 80 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  'ramen': `<line x1="40" y1="15" x2="55" y2="40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 55 40 Q 45 55 55 70 Q 65 85 50 90" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'waving': `<circle cx="50" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="32" x2="50" y2="60" stroke="currentColor" stroke-width="2"/><path d="M 50 42 L 72 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 50 42 L 28 35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'yoyo': `<line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
  'loop': `<path d="M 40 20 L 40 60 Q 40 80 55 75 Q 70 70 55 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'wow': `<path d="M 30 30 Q 30 75 55 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 55 30 Q 70 50 55 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'nodding': `<path d="M 35 25 Q 65 80 75 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  // Katakana
  'antenna': `<line x1="30" y1="25" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="25" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="50" x2="55" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'toothpick': `<line x1="55" y1="20" x2="35" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="35" x2="60" y2="75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'umbrella-top': `<circle cx="50" cy="25" r="3" fill="currentColor"/><line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="45" x2="50" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'elevator': `<line x1="25" y1="25" x2="75" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="25" y1="75" x2="75" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'scissors': `<line x1="30" y1="20" x2="30" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="35" x2="70" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="55" x2="65" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'cookie-bite': `<path d="M 70 25 L 30 45 L 70 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'corner': `<path d="M 30 25 L 65 25 L 65 75 L 30 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'wink-face': `<circle cx="35" cy="30" r="3" fill="currentColor"/><circle cx="55" cy="35" r="3" fill="currentColor"/><path d="M 60 55 Q 45 75 30 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'three-drops': `<circle cx="25" cy="35" r="3" fill="currentColor"/><circle cx="50" cy="30" r="3" fill="currentColor"/><circle cx="70" cy="35" r="3" fill="currentColor"/><path d="M 60 55 Q 45 75 30 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'knife': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="20" x2="40" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'two-lines': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'wine-glass': `<path d="M 30 25 Q 30 60 50 70 Q 70 60 70 25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="70" x2="50" y2="85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'robot-face': `<rect x="25" y="25" width="50" height="50" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
  'root-sign': `<path d="M 25 60 L 40 75 L 60 25 L 75 25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'x-mark': `<line x1="30" y1="25" x2="70" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="30" x2="35" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'three-lines': `<line x1="30" y1="25" x2="65" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="25" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="75" x2="65" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'bull-horn': `<path d="M 25 75 L 55 25 L 70 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
}

function getSvgContent(key: string): string {
  return mnemonicSvgs[key] || `<text x="50" y="55" text-anchor="middle" fill="currentColor" font-size="14">💡</text>`
}
</script>

<template>
  <div
    class="flip-card w-full aspect-[3/4] cursor-pointer select-none"
    :class="{ flipped }"
    @click="toggle"
  >
    <div class="flip-card-inner">
      <!-- Front: Kana character -->
      <div
        class="flip-card-front flex flex-col items-center justify-center bg-card border border-fg/8 shadow-xs p-4"
        :class="isLearned ? 'border-success/30 bg-success-light/30' : ''"
      >
        <div v-if="isLearned" class="absolute top-3 right-3 text-success text-sm">✓</div>
        <span class="kana-display text-6xl md:text-7xl text-fg-strong mb-3">{{ char.kana }}</span>
        <span class="text-lg font-500 text-ai font-en">{{ char.romaji }}</span>
        <span class="text-sm text-fg-muted mt-1">{{ char.korean }}</span>
        <span class="text-xs text-fg-faint mt-3">탭하여 연상 이미지 보기</span>
      </div>

      <!-- Back: Mnemonic -->
      <div class="flip-card-back flex flex-col items-center justify-between bg-ai-light border border-ai/15 p-4">
        <!-- Mnemonic SVG -->
        <div class="flex-1 flex items-center justify-center w-full">
          <svg
            viewBox="0 0 100 100"
            class="w-20 h-20 text-ai"
            v-html="getSvgContent(char.mnemonicImage)"
          />
        </div>

        <!-- Mnemonic text -->
        <div class="text-center mt-2">
          <div class="text-2xl kana-display text-fg-strong mb-1">{{ char.kana }}</div>
          <p class="text-sm text-fg leading-relaxed px-1">{{ char.mnemonic }}</p>
        </div>

        <!-- Action -->
        <button
          v-if="!isLearned"
          class="mt-3 btn-primary text-sm w-full"
          @click.stop="markDone"
        >
          외웠어요! ✓
        </button>
        <div v-else class="mt-3 text-success text-sm font-500">
          ✓ 학습 완료
        </div>
      </div>
    </div>
  </div>
</template>
