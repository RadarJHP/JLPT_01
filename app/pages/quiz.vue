<script setup lang="ts">
import { getAllHiragana } from '~/data/hiragana'
import { getAllKatakana } from '~/data/katakana'
import type { KanaChar } from '~/data/hiragana'

type QuizType = 'hiragana' | 'katakana' | 'mixed'

const quizType = ref<QuizType | null>(null)

const quizChars = computed<KanaChar[]>(() => {
  if (quizType.value === 'hiragana') return getAllHiragana()
  if (quizType.value === 'katakana') return getAllKatakana()
  return [...getAllHiragana(), ...getAllKatakana()]
})

function goBack() {
  quizType.value = null
}
</script>

<template>
  <div>
    <div v-if="!quizType">
      <div class="mb-6">
        <h1 class="text-2xl font-700 text-fg-strong mb-1">전체 복습</h1>
        <p class="text-sm text-fg-muted">히라가나, 카타카나, 또는 섞어서 복습하세요.</p>
      </div>

      <div class="space-y-3">
        <button
          class="w-full card p-5 text-left cursor-pointer hover:border-ai/30 hover:shadow-glow-ai transition-all"
          @click="quizType = 'hiragana'"
        >
          <div class="flex items-center gap-4">
            <span class="kana-display text-3xl text-ai">あ</span>
            <div>
              <div class="font-600 text-fg-strong">히라가나 46자</div>
              <div class="text-xs text-fg-muted">기본 문자 전체 복습</div>
            </div>
          </div>
        </button>

        <button
          class="w-full card p-5 text-left cursor-pointer hover:border-cta/30 hover:shadow-glow-cta transition-all"
          @click="quizType = 'katakana'"
        >
          <div class="flex items-center gap-4">
            <span class="kana-display text-3xl text-cta">ア</span>
            <div>
              <div class="font-600 text-fg-strong">카타카나 46자</div>
              <div class="text-xs text-fg-muted">외래어 문자 전체 복습</div>
            </div>
          </div>
        </button>

        <button
          class="w-full card p-5 text-left cursor-pointer hover:border-accent/30 hover:shadow-glow-accent transition-all"
          @click="quizType = 'mixed'"
        >
          <div class="flex items-center gap-4">
            <span class="kana-display text-3xl text-accent">混</span>
            <div>
              <div class="font-600 text-fg-strong">섞어서 92자</div>
              <div class="text-xs text-fg-muted">히라가나 + 카타카나 전부!</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div v-else>
      <button
        class="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-4 cursor-pointer"
        @click="goBack"
      >
        ← 돌아가기
      </button>

      <LearnQuiz
        :key="quizType"
        :chars="quizChars"
        :accent-color="quizType === 'katakana' ? 'cta' : 'ai'"
        :deck="quizType === 'mixed' ? 'kana-mixed' : (quizType as string)"
      />
    </div>
  </div>
</template>
