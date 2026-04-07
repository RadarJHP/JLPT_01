<script setup lang="ts">
import type { KanjiItem } from '~/data/kanji'
import type { ReviewQuality } from '~/composables/useSrs'

const props = defineProps<{
  cards: KanjiItem[]
  deck: string
  size?: number
  /** jp→ko (default): show kanji, pick meaning. ko→jp: show meaning, pick kanji. */
  direction?: 'jp-ko' | 'ko-jp'
}>()

const emit = defineEmits<{ complete: [stats: { correct: number; total: number }] }>()

type Phase = 'show' | 'reveal' | 'quiz' | 'result'
const srs = useSrs()
const tts = useTts()

const phase = ref<Phase>('show')
const flipped = ref(false)
const queue = ref<KanjiItem[]>([])
const current = ref<KanjiItem | null>(null)
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
  const session = srs.buildSession(props.cards, props.deck, {
    maxDue: props.size ?? 14,
    newPerSession: Math.max(5, Math.floor((props.size ?? 14) / 2)),
  })
  let pool = session.length > 0 ? session : props.cards.slice(0, props.size ?? 14)
  if (pool.length === 0) pool = props.cards
  queue.value = shuffle(pool)
  sessionSize.value = queue.value.length
  wrongIds.value = new Set()
  totalAnswered.value = 0
  correctCount.value = 0
  finished.value = false
  round.value = 1
  loadNext()
}

function loadNext() {
  if (queue.value.length === 0) {
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

  if (props.direction === 'ko-jp') {
    const correct = current.value.kanji
    const others = props.cards.filter(c => c.id !== current.value!.id).map(c => c.kanji)
    const distractors = shuffle(Array.from(new Set(others))).slice(0, 3)
    options.value = shuffle([correct, ...distractors])
  } else {
    const correct = current.value.meaning
    const others = props.cards.filter(c => c.id !== current.value!.id).map(c => c.meaning)
    const distractors = shuffle(Array.from(new Set(others))).slice(0, 3)
    options.value = shuffle([correct, ...distractors])
  }
}

const correctAnswer = computed(() =>
  props.direction === 'ko-jp' ? current.value?.kanji : current.value?.meaning,
)

function flipCard() {
  flipped.value = true
  setTimeout(() => { phase.value = 'reveal' }, 350)
}
function goToQuiz() {
  flipped.value = false
  setTimeout(() => { phase.value = 'quiz'; phaseKey.value++ }, 350)
}
function pick(answer: string) {
  if (selected.value !== null) return
  selected.value = answer
  totalAnswered.value++
  const correct = answer === correctAnswer.value
  if (correct) {
    isCorrect.value = true
    correctCount.value++
    speak(current.value!.examples[0]?.reading || current.value!.kunyomi[0] || current.value!.onyomi[0])
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
  if (quality === 'again') wrongIds.value.add(current.value.id)
  loadNext()
}
function speak(text: string) { tts.speak(text, { rate: 0.8 }) }
function restart() { init() }

const accuracy = computed(() => totalAnswered.value === 0 ? 0 : Math.round(correctCount.value / totalAnswered.value * 100))
const progressNum = computed(() => Math.min(sessionSize.value, totalAnswered.value))

onMounted(() => init())
watch(() => props.cards, () => init())
</script>

<template>
  <div v-if="!finished && current" class="max-w-md mx-auto">
    <!-- Progress -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex-1 h-1.5 bg-fg-faint/12 rounded-full overflow-hidden">
        <div class="h-full bg-matcha rounded-full transition-all duration-700 ease-out"
          :style="{ width: (progressNum / Math.max(sessionSize, 1) * 100) + '%' }" />
      </div>
      <span class="text-xs text-fg-faint font-en tabular-nums">{{ progressNum }}/{{ sessionSize }}</span>
      <span v-if="round > 1" class="badge bg-yama-soft text-yama">복습 {{ round - 1 }}회</span>
    </div>

    <!-- SHOW phase: kanji card flip -->
    <div v-if="phase === 'show' || phase === 'reveal'" :key="'card-' + phaseKey" class="animate-fade-in-up">
      <div class="flip-card w-full aspect-[4/5] cursor-pointer" :class="{ flipped }" @click="!flipped && flipCard()">
        <div class="flip-card-inner">
          <div class="flip-card-front bg-card border-2 border-matcha/30 p-6 relative">
            <span class="absolute top-4 left-4 pill bg-matcha-soft text-matcha">{{ current.level }}</span>
            <span class="absolute top-4 right-4 pill bg-bg-inset text-fg-muted">{{ current.strokes }}획</span>
            <span class="text-xs text-fg-faint mb-4 font-600 tracking-wider uppercase">{{ current.category }}</span>
            <span class="kana-display text-9xl text-fg-strong mb-4">{{ current.kanji }}</span>
            <p class="text-sm text-fg-faint">탭해서 읽기/뜻 보기</p>
          </div>
          <div class="flip-card-back bg-card border-2 border-matcha/30 p-5 overflow-y-auto">
            <div class="text-center mb-3">
              <div class="kana-display text-5xl text-fg-strong mb-1">{{ current.kanji }}</div>
              <div class="text-xl font-700 text-matcha">{{ current.meaning }}</div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs mb-3">
              <div class="bg-bg-inset rounded-md p-2.5">
                <div class="text-[10px] text-fg-faint uppercase tracking-wider mb-1">음독 (音)</div>
                <div class="text-jp font-600 text-fg-strong">{{ current.onyomi.join(' · ') || '—' }}</div>
              </div>
              <div class="bg-bg-inset rounded-md p-2.5">
                <div class="text-[10px] text-fg-faint uppercase tracking-wider mb-1">훈독 (訓)</div>
                <div class="text-jp font-600 text-fg-strong">{{ current.kunyomi.join(' · ') || '—' }}</div>
              </div>
            </div>
            <div class="space-y-1.5 mb-3">
              <div v-for="ex in current.examples" :key="ex.word" class="bg-bg-inset rounded-md p-2 flex items-center gap-2">
                <button v-if="tts.supported.value" class="text-xs text-fg-faint hover:text-fg shrink-0" @click.stop="speak(ex.reading)">🔊</button>
                <span class="kana-display text-base text-fg-strong">{{ ex.word }}</span>
                <span class="text-jp text-xs text-fg-muted">{{ ex.reading }}</span>
                <span class="text-xs text-fg-muted ml-auto">{{ ex.meaning }}</span>
              </div>
            </div>
            <button class="btn btn-matcha text-sm w-full font-700" @click.stop="goToQuiz">
              기억했어요, 퀴즈 →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- QUIZ -->
    <div v-if="phase === 'quiz'" :key="'quiz-' + phaseKey" class="animate-fade-in-up">
      <div class="text-center mb-7">
        <span class="pill bg-matcha-soft text-matcha mb-3">{{ current.level }} · {{ current.category }}</span>
        <template v-if="direction !== 'ko-jp'">
          <div class="kana-display text-9xl text-fg-strong mt-3 mb-2">{{ current.kanji }}</div>
          <p class="text-sm text-fg-muted mt-2">이 한자의 뜻은?</p>
        </template>
        <template v-else>
          <div class="text-3xl md:text-4xl font-700 text-fg-strong mt-3 mb-2">{{ current.meaning }}</div>
          <p class="text-sm text-fg-muted mt-2">이 뜻의 한자는?</p>
        </template>
      </div>
      <div class="grid gap-2.5"
        :class="direction === 'ko-jp' ? 'grid-cols-2' : 'grid-cols-1'">
        <button v-for="opt in options" :key="opt"
          class="option-btn py-4 px-5 rounded-md border-2 font-600 cursor-pointer"
          :class="[
            direction === 'ko-jp' ? 'kana-display text-4xl text-center' : 'text-base text-left',
            selected === null ? 'border-fg-faint/15 bg-card'
              : opt === correctAnswer ? 'border-success bg-success-soft text-success'
              : opt === selected ? 'border-error bg-error-soft text-error'
              : 'border-fg-faint/8 bg-card opacity-40',
          ]"
          :disabled="selected !== null" @click="pick(opt)">
          {{ opt }}
        </button>
      </div>
    </div>

    <!-- RESULT -->
    <div v-if="phase === 'result'" :key="'result-' + phaseKey" class="animate-fade-in-up">
      <div v-if="isCorrect" class="text-center mb-4">
        <div class="animate-pop"><div class="kana-display text-7xl text-success mb-2">{{ current.kanji }}</div></div>
        <p class="text-success text-xl font-700 mb-1">정답!</p>
        <p class="text-fg-muted text-sm mb-3">{{ current.meaning }}</p>
        <div class="bg-bg-inset rounded-md p-3 mb-2 text-left max-w-sm mx-auto text-xs">
          <div class="mb-1"><span class="text-fg-faint">음:</span> <span class="text-jp font-600 text-fg">{{ current.onyomi.join(' · ') || '—' }}</span></div>
          <div><span class="text-fg-faint">훈:</span> <span class="text-jp font-600 text-fg">{{ current.kunyomi.join(' · ') || '—' }}</span></div>
        </div>
      </div>
      <div v-else class="mb-4">
        <div class="text-center animate-shake">
          <div class="kana-display text-7xl text-error mb-2">{{ current.kanji }}</div>
        </div>
        <p class="text-center text-error text-lg font-700 mb-3">다시!</p>
        <div class="bg-card rounded-md border-2 border-error/20 p-5 mb-2 max-w-sm mx-auto">
          <div class="text-center mb-3">
            <div class="kana-display text-5xl text-fg-strong mb-1">{{ current.kanji }}</div>
            <div class="text-xl font-700 text-fg-strong">{{ current.meaning }}</div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs mb-3">
            <div class="bg-bg-inset rounded-md p-2"><div class="text-[10px] text-fg-faint mb-0.5">음</div><div class="text-jp font-600 text-fg">{{ current.onyomi.join('·') || '—' }}</div></div>
            <div class="bg-bg-inset rounded-md p-2"><div class="text-[10px] text-fg-faint mb-0.5">훈</div><div class="text-jp font-600 text-fg">{{ current.kunyomi.join('·') || '—' }}</div></div>
          </div>
          <div v-for="ex in current.examples.slice(0, 2)" :key="ex.word" class="text-xs mb-1">
            <span class="kana-display text-fg-strong">{{ ex.word }}</span>
            <span class="text-jp text-fg-muted ml-1">({{ ex.reading }})</span>
            <span class="text-fg-muted ml-1">— {{ ex.meaning }}</span>
          </div>
        </div>
      </div>

      <!-- Anki ratings -->
      <div class="max-w-sm mx-auto">
        <p class="text-center text-xs text-fg-faint mb-2">기억의 강도를 선택하세요</p>
        <div class="grid grid-cols-4 gap-2">
          <button class="rating-btn rating-again" @click="rate('again')">
            <span class="text-sm font-700">Again</span><span class="text-[10px] opacity-80">&lt;1m</span>
          </button>
          <button class="rating-btn rating-hard" @click="rate('hard')">
            <span class="text-sm font-700">Hard</span><span class="text-[10px] opacity-80">~1d</span>
          </button>
          <button class="rating-btn rating-good" @click="rate('good')">
            <span class="text-sm font-700">Good</span><span class="text-[10px] opacity-80">~3d</span>
          </button>
          <button class="rating-btn rating-easy" @click="rate('easy')">
            <span class="text-sm font-700">Easy</span><span class="text-[10px] opacity-80">~1w</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="finished" class="text-center py-10 animate-fade-in-up max-w-md mx-auto">
    <div class="text-6xl mb-4 animate-bounce-in">🌿</div>
    <h2 class="text-2xl font-700 text-fg-strong mb-1">완료!</h2>
    <p class="text-fg-muted mb-1">{{ sessionSize }}자 학습</p>
    <p class="text-sm text-fg-faint mb-6">정답률 {{ accuracy }}% · {{ correctCount }}/{{ totalAnswered }}</p>
    <div class="flex justify-center gap-3">
      <button class="btn btn-matcha font-700" @click="restart">한번 더</button>
      <NuxtLink to="/" class="btn-ghost no-underline">돌아가기</NuxtLink>
    </div>
  </div>
</template>
