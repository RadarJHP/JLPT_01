<script setup lang="ts">
import type { VocabItem } from '~/data/vocab'
import type { ReviewQuality } from '~/composables/useSrs'

const props = defineProps<{
  cards: VocabItem[]      // pool to study
  deck: string            // SRS deck name
  accentColor?: string    // 'sakura' | 'matcha' | 'ai' | 'cta'
  title?: string
  /** session size cap (due + new combined) */
  size?: number
  /** quiz direction: jp→ko (default) or ko→jp */
  direction?: 'jp-ko' | 'ko-jp'
}>()

const emit = defineEmits<{
  complete: [stats: { correct: number; total: number }]
}>()

const color = computed(() => props.accentColor || 'sakura')
const colorClasses = computed(() => {
  const map: Record<string, { bg: string; bgSoft: string; bgLight: string; text: string; border: string; glow: string; btn: string }> = {
    sakura: { bg: 'bg-sakura', bgSoft: 'bg-sakura-soft', bgLight: 'bg-sakura-light', text: 'text-sakura', border: 'border-sakura/30', glow: 'shadow-glow-sakura', btn: 'btn-sakura' },
    matcha: { bg: 'bg-matcha', bgSoft: 'bg-matcha-soft', bgLight: 'bg-matcha-light', text: 'text-matcha', border: 'border-matcha/30', glow: 'shadow-glow-matcha', btn: 'btn-matcha' },
    ai: { bg: 'bg-ai', bgSoft: 'bg-ai-soft', bgLight: 'bg-ai-light', text: 'text-ai', border: 'border-ai/30', glow: 'shadow-glow-ai', btn: 'btn-primary' },
    cta: { bg: 'bg-cta', bgSoft: 'bg-cta-soft', bgLight: 'bg-cta-light', text: 'text-cta', border: 'border-cta/30', glow: 'shadow-glow-cta', btn: 'btn-cta' },
  }
  return map[color.value] || map.sakura
})

type Phase = 'show' | 'reveal' | 'quiz' | 'result'

const srs = useSrs()
const tts = useTts()

const phase = ref<Phase>('show')
const flipped = ref(false)
const queue = ref<VocabItem[]>([])
const current = ref<VocabItem | null>(null)
const options = ref<string[]>([])
const selected = ref<string | null>(null)
const isCorrect = ref<boolean | null>(null)
const totalAnswered = ref(0)
const correctCount = ref(0)
const wrongIds = ref<Set<string>>(new Set())
const finished = ref(false)
const round = ref(1)
const phaseKey = ref(0)
const sessionSize = ref(0)
const studied = ref<VocabItem[]>([])

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function init() {
  srs.load()
  // Build session: due + new from pool
  const session = srs.buildSession(props.cards, props.deck, {
    maxDue: props.size ?? 18,
    newPerSession: Math.max(6, Math.floor((props.size ?? 18) / 2)),
  })
  // Fall back if new user / nothing matched
  let pool = session.length > 0 ? session : props.cards.slice(0, props.size ?? 18)
  if (pool.length === 0) pool = props.cards
  queue.value = shuffle(pool)
  sessionSize.value = queue.value.length
  studied.value = []
  wrongIds.value = new Set()
  totalAnswered.value = 0
  correctCount.value = 0
  finished.value = false
  round.value = 1
  loadNext()
}

function loadNext() {
  if (queue.value.length === 0) {
    // Re-queue items missed in this session for an immediate redo round
    if (wrongIds.value.size > 0) {
      const requeue = props.cards.filter(c => wrongIds.value.has(c.id))
      queue.value = shuffle(requeue)
      wrongIds.value = new Set()
      round.value++
      loadNext()
      return
    }
    finished.value = true
    emit('complete', { correct: correctCount.value, total: totalAnswered.value })
    return
  }
  current.value = queue.value.shift()!
  phase.value = 'show'
  flipped.value = false
  selected.value = null
  isCorrect.value = null
  phaseKey.value++

  // Build distractor options from broader pool. In reverse mode the correct
  // answer is the JP word so distractors are JP words too.
  if (props.direction === 'ko-jp') {
    const correct = current.value.word
    const others = props.cards.filter(c => c.id !== current.value!.id).map(c => c.word)
    const distractors = shuffle(Array.from(new Set(others))).slice(0, 3)
    options.value = shuffle([correct, ...distractors])
  } else {
    const correct = current.value.meaning
    const others = props.cards
      .filter(c => c.id !== current.value!.id && c.meaning !== correct)
      .map(c => c.meaning)
    const unique = Array.from(new Set(others))
    const distractors = shuffle(unique).slice(0, 3)
    options.value = shuffle([correct, ...distractors])
  }
}

const correctAnswer = computed(() =>
  props.direction === 'ko-jp' ? current.value?.word : current.value?.meaning
)

function flipCard() {
  flipped.value = true
  setTimeout(() => {
    phase.value = 'reveal'
  }, 350)
}

function goToQuiz() {
  flipped.value = false
  setTimeout(() => {
    phase.value = 'quiz'
    phaseKey.value++
  }, 350)
}

function pick(answer: string) {
  if (selected.value !== null) return
  selected.value = answer
  totalAnswered.value++
  const correct = answer === correctAnswer.value
  if (correct) {
    isCorrect.value = true
    correctCount.value++
    studied.value.push(current.value!)
    speak(current.value!.reading || current.value!.word)
  } else {
    isCorrect.value = false
    wrongIds.value.add(current.value!.id)
  }
  phase.value = 'result'
  phaseKey.value++
}

function rate(quality: ReviewQuality) {
  if (!current.value) return
  srs.reviewQuality(current.value.id, props.deck, quality)
  // If the user marks it 'again', make sure it gets requeued in this session
  if (quality === 'again') {
    wrongIds.value.add(current.value.id)
  }
  loadNext()
}

function speak(text: string) {
  tts.speak(text, { rate: 0.85 })
}

function speakExample() {
  if (current.value?.example) {
    tts.speak(current.value.example, { rate: 0.85 })
  }
}

function restart() {
  init()
}

const accuracy = computed(() => {
  if (totalAnswered.value === 0) return 0
  return Math.round((correctCount.value / totalAnswered.value) * 100)
})

const progressNum = computed(() => Math.min(sessionSize.value, totalAnswered.value))

onMounted(() => init())
watch(() => props.cards, () => init())
</script>

<template>
  <div v-if="!finished && current" class="max-w-md mx-auto">
    <!-- Top bar: progress + round -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex-1 h-1.5 bg-fg-faint/12 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-700 ease-out"
          :class="colorClasses.bg"
          :style="{ width: (progressNum / Math.max(sessionSize, 1) * 100) + '%' }"
        />
      </div>
      <span class="text-xs text-fg-faint font-en tabular-nums">{{ progressNum }}/{{ sessionSize }}</span>
      <span v-if="round > 1" class="badge bg-yama-soft text-yama">복습 {{ round - 1 }}회차</span>
    </div>

    <!-- ===== SHOW / REVEAL phase: flip card with reading + example ===== -->
    <div v-if="phase === 'show' || phase === 'reveal'" :key="'card-' + phaseKey" class="animate-fade-in-up">
      <div
        class="flip-card w-full aspect-[4/5] cursor-pointer"
        :class="{ flipped }"
        @click="!flipped && flipCard()"
      >
        <div class="flip-card-inner">
          <!-- Front -->
          <div class="flip-card-front bg-card border-2 p-7 relative" :class="colorClasses.border">
            <span class="absolute top-4 left-4 pill" :class="[colorClasses.bgSoft, colorClasses.text]">
              {{ current.level }}
            </span>
            <button
              v-if="tts.supported.value"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-inset hover:bg-bg-elevated flex items-center justify-center text-fg-muted hover:text-fg transition-all"
              @click.stop="speak(current.reading || current.word)"
            >
              🔊
            </button>
            <span class="text-xs text-fg-faint mb-3 font-600 tracking-wider uppercase">{{ current.category }}</span>
            <span class="kana-display text-6xl md:text-7xl text-fg-strong text-center px-4 mb-3">{{ current.word }}</span>
            <p v-if="current.reading && current.reading !== current.word" class="text-jp text-fg-muted text-xl mb-3">{{ current.reading }}</p>
            <p class="text-sm text-fg-faint mt-3">탭해서 뜻 보기</p>
          </div>
          <!-- Back -->
          <div class="flip-card-back bg-card border-2 p-6 overflow-hidden" :class="colorClasses.border">
            <div class="text-center mb-3">
              <div class="kana-display text-3xl text-fg-strong mb-1">{{ current.word }}</div>
              <div class="text-jp text-fg-muted text-base">{{ current.reading }}</div>
            </div>
            <div class="text-center mb-3">
              <div class="text-2xl font-700" :class="colorClasses.text">{{ current.meaning }}</div>
              <div class="text-xs text-fg-faint mt-0.5">{{ current.pos }}</div>
            </div>
            <div v-if="current.example" class="bg-bg-inset rounded-md p-3 w-full mb-3 relative">
              <button
                v-if="tts.supported.value"
                class="absolute top-2 right-2 text-xs text-fg-faint hover:text-fg"
                @click.stop="speakExample"
              >
                🔊
              </button>
              <p class="text-jp text-sm text-fg leading-relaxed">{{ current.example }}</p>
              <p class="text-xs text-fg-muted mt-1.5">{{ current.exampleKr }}</p>
            </div>
            <button
              class="btn text-sm w-full font-700 mt-1"
              :class="colorClasses.btn"
              @click.stop="goToQuiz"
            >
              기억했어요, 퀴즈 →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== QUIZ phase ===== -->
    <div v-if="phase === 'quiz'" :key="'quiz-' + phaseKey" class="animate-fade-in-up">
      <div class="text-center mb-7">
        <span class="pill mb-3" :class="[colorClasses.bgSoft, colorClasses.text]">{{ current.level }} · {{ current.category }}</span>
        <!-- jp → ko -->
        <template v-if="direction !== 'ko-jp'">
          <div class="kana-display text-6xl md:text-7xl text-fg-strong mb-2 mt-3">{{ current.word }}</div>
          <p v-if="current.reading && current.reading !== current.word" class="text-jp text-fg-muted text-lg mb-2">{{ current.reading }}</p>
          <button v-if="tts.supported.value" class="text-xs text-fg-faint hover:text-fg inline-flex items-center gap-1" @click="speak(current.reading || current.word)">
            🔊 발음
          </button>
          <p class="text-sm text-fg-muted mt-2">이 단어의 뜻은?</p>
        </template>
        <!-- ko → jp -->
        <template v-else>
          <div class="text-3xl md:text-4xl font-700 text-fg-strong mb-3 mt-3">{{ current.meaning }}</div>
          <div class="text-xs text-fg-faint">{{ current.pos }}</div>
          <p class="text-sm text-fg-muted mt-2">이 뜻의 일본어는?</p>
        </template>
      </div>
      <div class="grid grid-cols-1 gap-2.5">
        <button
          v-for="opt in options"
          :key="opt"
          class="option-btn py-4 px-5 rounded-md border-2 text-center font-600 cursor-pointer"
          :class="[
            direction === 'ko-jp' ? 'kana-display text-2xl' : 'text-base text-left',
            selected === null
              ? 'border-fg-faint/15 bg-card'
              : opt === correctAnswer
                ? 'border-success bg-success-soft text-success'
                : opt === selected
                  ? 'border-error bg-error-soft text-error'
                  : 'border-fg-faint/8 bg-card opacity-40',
          ]"
          :disabled="selected !== null"
          @click="pick(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <!-- ===== RESULT phase ===== -->
    <div v-if="phase === 'result'" :key="'result-' + phaseKey" class="animate-fade-in-up">
      <div v-if="isCorrect" class="text-center mb-4">
        <div class="animate-pop">
          <div class="kana-display text-6xl text-success mb-2">{{ current.word }}</div>
        </div>
        <p class="text-success text-xl font-700 mb-1">정답! 🌸</p>
        <p class="text-fg-muted text-sm mb-3">{{ current.reading }} · {{ current.meaning }}</p>
        <div v-if="current.example" class="bg-bg-inset rounded-md p-4 mb-2 text-left max-w-sm mx-auto">
          <p class="text-jp text-sm text-fg leading-relaxed mb-1">{{ current.example }}</p>
          <p class="text-xs text-fg-muted">{{ current.exampleKr }}</p>
        </div>
      </div>
      <div v-else class="mb-4">
        <div class="text-center animate-shake">
          <div class="kana-display text-6xl text-error mb-2">{{ current.word }}</div>
        </div>
        <p class="text-center text-error text-lg font-700 mb-3">아쉬워요!</p>
        <div class="bg-card rounded-md border-2 border-error/20 p-5 mb-2 max-w-sm mx-auto">
          <div class="text-center mb-3">
            <div class="kana-display text-4xl text-fg-strong mb-1">{{ current.word }}</div>
            <div class="text-jp text-fg-muted text-base mb-2">{{ current.reading }}</div>
            <div class="text-xl font-700 text-fg-strong">{{ current.meaning }}</div>
            <div class="text-xs text-fg-faint mt-1">{{ current.pos }}</div>
          </div>
          <div v-if="current.example" class="bg-bg-inset rounded-md p-3">
            <p class="text-jp text-sm text-fg leading-relaxed mb-1">{{ current.example }}</p>
            <p class="text-xs text-fg-muted">{{ current.exampleKr }}</p>
          </div>
        </div>
      </div>

      <!-- Anki-style rating buttons -->
      <div class="max-w-sm mx-auto">
        <p class="text-center text-xs text-fg-faint mb-2">기억의 강도를 선택하세요</p>
        <div class="grid grid-cols-4 gap-2">
          <button class="rating-btn rating-again" @click="rate('again')">
            <span class="text-sm font-700">Again</span>
            <span class="text-[10px] opacity-80">&lt;1m</span>
          </button>
          <button class="rating-btn rating-hard" @click="rate('hard')">
            <span class="text-sm font-700">Hard</span>
            <span class="text-[10px] opacity-80">~1d</span>
          </button>
          <button class="rating-btn rating-good" @click="rate('good')">
            <span class="text-sm font-700">Good</span>
            <span class="text-[10px] opacity-80">~3d</span>
          </button>
          <button class="rating-btn rating-easy" @click="rate('easy')">
            <span class="text-sm font-700">Easy</span>
            <span class="text-[10px] opacity-80">~1w</span>
          </button>
        </div>
        <p v-if="!isCorrect" class="text-xs text-fg-faint text-center mt-2">선택에 따라 다음 등장 시점이 달라져요</p>
      </div>
    </div>
  </div>

  <!-- ===== FINISHED ===== -->
  <div v-if="finished" class="text-center py-10 animate-fade-in-up max-w-md mx-auto">
    <div class="text-6xl mb-4 animate-bounce-in">🎉</div>
    <h2 class="text-2xl font-700 text-fg-strong mb-1">잘 했어요!</h2>
    <p class="text-fg-muted mb-1">{{ sessionSize }}개 단어 세션 완료</p>
    <p class="text-sm text-fg-faint mb-6">
      정답률 {{ accuracy }}% · {{ correctCount }}/{{ totalAnswered }}
      <span v-if="round > 1"> · 복습 {{ round - 1 }}회</span>
    </p>
    <div class="flex justify-center gap-3 mb-6">
      <button class="btn font-700" :class="colorClasses.btn" @click="restart">한번 더</button>
      <NuxtLink to="/" class="btn-ghost no-underline">돌아가기</NuxtLink>
    </div>
  </div>
</template>
