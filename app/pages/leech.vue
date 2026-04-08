<script setup lang="ts">
/**
 * Leech-only practice — pulls every kana the learner has missed at
 * least once and runs them through LearnQuiz in leechOnly mode.
 * Vocab leeches go through SrsCardQuiz instead since they need full
 * sentence context.
 */
import { getAllHiraganaFull } from '~/data/hiragana'
import { getAllKatakanaFull } from '~/data/katakana'
import { getAllVocab } from '~/data/vocab'

const srs = useSrs()
onMounted(() => srs.load())

const allHira = getAllHiraganaFull().map(c => ({ ...c, id: `hiragana:${c.kana}` }))
const allKata = getAllKatakanaFull().map(c => ({ ...c, id: `katakana:${c.kana}` }))
const allVocab = getAllVocab()

const hiraLeech = computed(() => srs.getLeechCards(allHira, 1))
const kataLeech = computed(() => srs.getLeechCards(allKata, 1))
const vocabLeech = computed(() => srs.getLeechCards(allVocab, 1))

const totalLeech = computed(() => hiraLeech.value.length + kataLeech.value.length + vocabLeech.value.length)

type Mode = 'pick' | 'hira' | 'kata' | 'vocab'
const mode = ref<Mode>('pick')

function back() { mode.value = 'pick' }
</script>

<template>
  <div>
    <div v-if="mode === 'pick'">
      <div class="mb-5">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span>🩹</span> 자주 틀리는 것만
        </h1>
        <p class="text-sm text-fg-muted">놓친 것들만 모아 다시 만나요. 약점을 좁혀가요.</p>
      </div>

      <div class="card p-5 mb-4 border-2 border-error/30 bg-error-soft/30">
        <div class="flex items-center gap-4">
          <div class="text-4xl">🎯</div>
          <div class="flex-1">
            <div class="text-3xl font-800 text-error font-en tabular-nums">{{ totalLeech }}</div>
            <div class="text-xs text-fg-muted">개의 약점</div>
          </div>
        </div>
      </div>

      <div v-if="totalLeech === 0" class="card p-8 text-center">
        <div class="text-5xl mb-3">🎉</div>
        <p class="font-700 text-fg-strong mb-1">아직 약점이 없어요</p>
        <p class="text-xs text-fg-muted">학습을 진행하다 틀리면 여기 모여요.</p>
      </div>

      <div v-else class="space-y-2">
        <button
          v-if="hiraLeech.length > 0"
          class="card-hover w-full p-4 text-left flex items-center gap-3"
          @click="mode = 'hira'"
        >
          <div class="w-12 h-12 rounded-lg bg-ai-soft flex items-center justify-center shrink-0">
            <span class="kana-display text-2xl text-ai">あ</span>
          </div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">히라가나 약점</div>
            <div class="text-xs text-fg-muted">{{ hiraLeech.length }}자 · 모두 다시 풀기</div>
          </div>
          <span class="text-fg-faint">→</span>
        </button>

        <button
          v-if="kataLeech.length > 0"
          class="card-hover w-full p-4 text-left flex items-center gap-3"
          @click="mode = 'kata'"
        >
          <div class="w-12 h-12 rounded-lg bg-cta-soft flex items-center justify-center shrink-0">
            <span class="kana-display text-2xl text-cta">ア</span>
          </div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">카타카나 약점</div>
            <div class="text-xs text-fg-muted">{{ kataLeech.length }}자 · 모두 다시 풀기</div>
          </div>
          <span class="text-fg-faint">→</span>
        </button>

        <button
          v-if="vocabLeech.length > 0"
          class="card-hover w-full p-4 text-left flex items-center gap-3"
          @click="mode = 'vocab'"
        >
          <div class="w-12 h-12 rounded-lg bg-sakura-soft flex items-center justify-center shrink-0 text-2xl">
            🌸
          </div>
          <div class="flex-1">
            <div class="font-700 text-fg-strong">단어 약점</div>
            <div class="text-xs text-fg-muted">{{ vocabLeech.length }}개 · 예문과 함께</div>
          </div>
          <span class="text-fg-faint">→</span>
        </button>
      </div>
    </div>

    <div v-else>
      <button class="text-sm text-fg-muted hover:text-fg mb-4" @click="back">← 목록</button>

      <LearnQuiz
        v-if="mode === 'hira'"
        :key="'leech-hira'"
        :chars="hiraLeech"
        accent-color="ai"
        deck="hiragana"
        leech-only
      />
      <LearnQuiz
        v-else-if="mode === 'kata'"
        :key="'leech-kata'"
        :chars="kataLeech"
        accent-color="cta"
        deck="katakana"
        leech-only
      />
      <SrsCardQuiz
        v-else-if="mode === 'vocab'"
        :cards="vocabLeech"
        deck="vocab-leech"
        accent-color="sakura"
      />
    </div>
  </div>
</template>
