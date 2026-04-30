<script setup lang="ts">
/**
 * 5문 일괄 입력 시험 — 5개 카나가 한 줄로 나오면 띄어쓰기로 답을 입력해서 채점.
 *
 * 흐름: input → result(채점/교정) → 다음 세트 / 약점만 다시 / 종료
 * 틀린 글자는 wrongPool에 쌓여서 다음 세트에 우선 들어가고, SRS는 'again'으로 처리해
 * 복습 탭에 자동으로 노출된다.
 */
import type { KanaChar } from '~/data/hiragana'

const props = defineProps<{
  chars: KanaChar[]      // pool to draw sets from
  deck: string           // SRS deck name (e.g. 'hiragana' / 'katakana')
  accentColor?: string   // 'ai' | 'cta' — affects accent classes
  setSize?: number
}>()

const emit = defineEmits<{
  back: []
}>()

const srs = useSrs()
const tts = useTts()
onMounted(() => srs.load())

const SET_SIZE = computed(() => props.setSize || 5)
const color = computed(() => props.accentColor || 'ai')
const isCta = computed(() => color.value === 'cta')

// ====== State ======
type SetItem = KanaChar & { userInput?: string; correct?: boolean }

type Phase = 'input' | 'result' | 'summary'
const phase = ref<Phase>('input')
const round = ref(0)
const currentSet = ref<SetItem[]>([])
const inputText = ref<string>('')
const inputRef = ref<HTMLInputElement | null>(null)

/** Items the learner missed and hasn't redeemed yet — included in next sets. */
const wrongPool = ref<Map<string, KanaChar>>(new Map())
/** Every kana that's appeared in any set this session. */
const seenKana = ref<Set<string>>(new Set())
const totalAttempted = ref(0)
const totalCorrect = ref(0)
/** Once true, the next round draws ONLY from wrongPool. */
const wrongOnlyMode = ref(false)

// ====== Helpers ======
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Normalize Korean reading for comparison: strip whitespace + parens like "지(드물게)" → "지". */
function normalizeKorean(s: string): string {
  return s.replace(/\(.*?\)/g, '').replace(/\s+/g, '').trim()
}

/** Reverse lookup: a typed Korean answer → matching KanaChar in the active deck. */
const koreanLookup = computed(() => {
  const m = new Map<string, KanaChar>()
  for (const c of props.chars) {
    const key = normalizeKorean(c.korean)
    if (key && !m.has(key)) m.set(key, c)
  }
  return m
})

// ====== Set construction ======
function buildNextSet(): boolean {
  const size = SET_SIZE.value

  if (wrongOnlyMode.value) {
    const wrong = Array.from(wrongPool.value.values())
    if (wrong.length === 0) return false
    currentSet.value = shuffle(wrong).slice(0, size).map(c => ({ ...c }))
  } else {
    const wrong = Array.from(wrongPool.value.values())
    const unseen = props.chars.filter(c => !seenKana.value.has(c.kana))
    const seenOk = props.chars.filter(
      c => seenKana.value.has(c.kana) && !wrongPool.value.has(c.kana),
    )

    const pool: KanaChar[] = []
    // Up to 2 wrong-item retries per set, so the user keeps seeing weak spots
    pool.push(...shuffle(wrong).slice(0, Math.min(2, wrong.length)))
    // Fill with fresh items
    pool.push(...shuffle(unseen).slice(0, size - pool.length))
    // Top up with already-correct items if we ran out
    if (pool.length < size) {
      pool.push(...shuffle(seenOk).slice(0, size - pool.length))
    }
    if (pool.length === 0) return false
    currentSet.value = pool.slice(0, size).map(c => ({ ...c }))
  }

  inputText.value = ''
  phase.value = 'input'
  round.value++
  nextTick(() => inputRef.value?.focus())
  return true
}

// ====== Grading ======
function grade() {
  const tokens = inputText.value
    .split(/[\s,，、]+/)
    .map(t => t.trim())
    .filter(Boolean)

  for (let i = 0; i < currentSet.value.length; i++) {
    const item = currentSet.value[i]
    if (!item) continue
    const userRaw = tokens[i] || ''
    const userNorm = normalizeKorean(userRaw)
    const targetNorm = normalizeKorean(item.korean)
    const ok = !!userNorm && userNorm === targetNorm
    item.userInput = userRaw
    item.correct = ok
    seenKana.value.add(item.kana)
    totalAttempted.value++

    const id = `${props.deck}:${item.kana}`
    if (ok) {
      totalCorrect.value++
      wrongPool.value.delete(item.kana)
      srs.reviewQuality(id, props.deck, 'good')
    } else {
      wrongPool.value.set(item.kana, { ...item } as KanaChar)
      srs.reviewQuality(id, props.deck, 'again')
    }
  }
  phase.value = 'result'
}

function nextRound() {
  if (!buildNextSet()) finishSession()
}

function reviewWrongOnly() {
  if (wrongPool.value.size === 0) {
    finishSession()
    return
  }
  wrongOnlyMode.value = true
  if (!buildNextSet()) finishSession()
}

function finishSession() {
  phase.value = 'summary'
}

function restartFull() {
  wrongPool.value = new Map()
  seenKana.value = new Set()
  totalAttempted.value = 0
  totalCorrect.value = 0
  wrongOnlyMode.value = false
  round.value = 0
  buildNextSet()
}

// ====== Result-screen helpers ======
/** When user typed something that matches a different kana, surface it as confusion hint. */
function confusionFor(item: SetItem): KanaChar | null {
  const u = normalizeKorean(item.userInput || '')
  if (!u) return null
  const guess = koreanLookup.value.get(u)
  return guess && guess.kana !== item.kana ? guess : null
}

function speak(text: string) {
  tts.speak(text, { rate: 0.85 })
}

const accuracy = computed(() =>
  totalAttempted.value === 0 ? 0 : Math.round(totalCorrect.value / totalAttempted.value * 100),
)

const wrongList = computed(() => Array.from(wrongPool.value.values()))

// kick off
buildNextSet()
</script>

<template>
  <div>
    <!-- Header / progress -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-base font-700 text-fg-strong flex items-center gap-2">
          <span>⌨️</span> 5문 입력 시험
        </h2>
        <p class="text-[11px] text-fg-faint">5개 글자 → 띄어쓰기로 답 입력 → 채점</p>
      </div>
      <div class="text-right">
        <div class="text-xs text-fg-muted font-en tabular-nums">{{ totalCorrect }}/{{ totalAttempted }}</div>
        <div class="text-[10px] text-fg-faint uppercase tracking-wider">
          {{ wrongOnlyMode ? '약점만' : `세트 ${round}` }}
        </div>
      </div>
    </div>

    <!-- ========== INPUT ========== -->
    <div v-if="phase === 'input'" class="animate-fade-in-up">
      <div class="card p-5 mb-4">
        <div class="grid grid-cols-5 gap-1.5 sm:gap-3 mb-5">
          <div
            v-for="(item, i) in currentSet"
            :key="item.kana + i"
            class="aspect-square rounded-lg bg-bg-inset border border-fg-faint/15 flex flex-col items-center justify-center"
          >
            <span class="kana-display text-3xl sm:text-5xl text-fg-strong leading-none">{{ item.kana }}</span>
            <span class="text-[9px] text-fg-faint mt-1 font-en">{{ i + 1 }}</span>
          </div>
        </div>

        <label class="block">
          <span class="text-[11px] text-fg-muted uppercase tracking-wider mb-1.5 block">
            한국어 발음을 띄어쓰기로 입력
          </span>
          <input
            ref="inputRef"
            v-model="inputText"
            type="text"
            inputmode="text"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            class="w-full text-lg font-600 bg-bg border-2 border-fg-faint/15 rounded-lg px-4 py-3 focus:outline-none focus:border-ai/50 text-fg-strong"
            :class="isCta ? 'focus:border-cta/50' : 'focus:border-ai/50'"
            placeholder="예) 코 유 오 와 나"
            @keydown.enter="grade"
          >
          <div class="text-[11px] text-fg-faint mt-1.5">모르겠으면 ?·빈칸으로 두고 채점하면 돼요</div>
        </label>
      </div>

      <div class="flex gap-2">
        <button
          class="btn flex-1 py-3 text-sm font-600 border border-fg-faint/20 bg-card text-fg-muted"
          @click="emit('back')"
        >
          ← 그만
        </button>
        <button
          class="btn flex-1 py-3 text-sm font-700 text-bg-DEFAULT"
          :class="isCta ? 'bg-cta' : 'bg-ai'"
          @click="grade"
        >
          채점 →
        </button>
      </div>
    </div>

    <!-- ========== RESULT ========== -->
    <div v-else-if="phase === 'result'" class="animate-fade-in-up">
      <!-- Per-item grading row -->
      <div class="card p-4 mb-4">
        <div class="grid grid-cols-5 gap-1.5 sm:gap-3 mb-2">
          <div
            v-for="(item, i) in currentSet"
            :key="item.kana + i"
            class="aspect-square rounded-lg flex flex-col items-center justify-center border-2"
            :class="item.correct ? 'border-success bg-success-light' : 'border-error bg-error-light'"
          >
            <span class="kana-display text-2xl sm:text-4xl text-fg-strong leading-none">{{ item.kana }}</span>
            <span class="text-[10px] mt-0.5 font-en" :class="item.correct ? 'text-success' : 'text-error'">
              {{ item.correct ? '✓' : '✗' }}
            </span>
          </div>
        </div>

        <!-- correct-answer line -->
        <div class="grid grid-cols-5 gap-1.5 sm:gap-3 text-center text-[11px]">
          <div
            v-for="(item, i) in currentSet"
            :key="item.kana + i + '-ans'"
            class="text-fg-muted"
          >
            <span class="font-700" :class="item.correct ? 'text-fg' : 'text-error'">
              {{ item.korean }}
            </span>
          </div>
        </div>
      </div>

      <!-- Correction notes for wrong items -->
      <div v-if="currentSet.some(c => !c.correct)" class="space-y-2 mb-4">
        <h3 class="text-xs font-700 text-fg-muted uppercase tracking-wider">📌 교정 포인트</h3>
        <template v-for="(item) in currentSet" :key="item.kana + '-fix'">
          <div
            v-if="!item.correct"
            class="card p-3 border-l-4 border-error"
          >
            <div class="flex items-start gap-3">
              <div class="shrink-0 text-center">
                <div class="kana-display text-3xl text-fg-strong leading-none">{{ item.kana }}</div>
                <div class="text-[10px] text-fg-faint font-en mt-0.5">{{ item.romaji }}</div>
              </div>
              <div class="flex-1 min-w-0 text-sm">
                <div class="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span class="font-700 text-fg-strong">{{ item.korean }}</span>
                  <span v-if="item.userInput" class="text-[11px] text-error">
                    입력: "{{ item.userInput }}"
                  </span>
                </div>
                <div v-if="confusionFor(item)" class="text-[12px] text-yama mb-1">
                  👉 <span class="kana-display">{{ confusionFor(item)?.kana }}</span>({{ confusionFor(item)?.korean }})와 혼동
                </div>
                <p class="text-[12px] text-fg-muted leading-snug">{{ item.mnemonic }}</p>
              </div>
              <button
                v-if="tts.supported.value"
                class="shrink-0 w-7 h-7 rounded-full bg-bg-inset hover:bg-bg-elevated flex items-center justify-center text-fg-muted text-xs"
                @click="speak(item.kana)"
              >🔊</button>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="card p-4 mb-4 text-center border-success/40 bg-success-soft/30">
        <span class="text-2xl">🎯</span>
        <p class="text-sm font-700 text-success mt-1">5개 모두 정답!</p>
      </div>

      <div class="flex gap-2">
        <button
          class="btn flex-1 py-3 text-sm font-600 border border-fg-faint/20 bg-card text-fg-muted"
          @click="finishSession"
        >
          끝내기
        </button>
        <button
          v-if="wrongPool.size > 0 && !wrongOnlyMode"
          class="btn flex-1 py-3 text-sm font-700 bg-error text-bg-DEFAULT"
          @click="reviewWrongOnly"
        >
          🩹 약점만 ({{ wrongPool.size }})
        </button>
        <button
          class="btn flex-1 py-3 text-sm font-700 text-bg-DEFAULT"
          :class="isCta ? 'bg-cta' : 'bg-ai'"
          @click="nextRound"
        >
          다음 5문 →
        </button>
      </div>
    </div>

    <!-- ========== SUMMARY ========== -->
    <div v-else class="animate-fade-in-up text-center py-6">
      <div class="text-5xl mb-3">{{ wrongList.length === 0 ? '🌟' : '📈' }}</div>
      <h2 class="text-xl font-700 text-fg-strong mb-1">시험 종료</h2>
      <p class="text-sm text-fg-muted mb-1">총 {{ totalAttempted }}문제 · 정답 {{ totalCorrect }}개</p>
      <p class="text-[11px] text-fg-faint mb-6">정답률 {{ accuracy }}%</p>

      <!-- Pattern summary block: this is the "거의 안정 / 남은 건 X뿐" mood -->
      <div class="card p-5 max-w-md mx-auto mb-4 text-left">
        <div v-if="wrongList.length === 0">
          <p class="text-sm font-700 text-success mb-2">✅ 전부 안정</p>
          <p class="text-xs text-fg-muted">이 풀에서 약점이 안 보여요. 다음 단계 가도 좋아요.</p>
        </div>
        <div v-else>
          <p class="text-sm font-700 text-fg-strong mb-2">
            <span v-if="wrongList.length === 1">학습 완료 직전 단계</span>
            <span v-else-if="wrongList.length <= 3">거의 안정 · 일부만 보정 필요</span>
            <span v-else>약점 정리 한 번 더</span>
          </p>
          <p class="text-xs text-fg-muted mb-3">
            남은 건
            <span v-if="wrongList.length === 1">사실상 하나:</span>
            <span v-else>{{ wrongList.length }}개:</span>
          </p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="c in wrongList"
              :key="c.kana"
              class="inline-flex items-center gap-1.5 bg-error-soft text-error rounded-md px-2 py-1"
            >
              <span class="kana-display text-base leading-none">{{ c.kana }}</span>
              <span class="text-[11px]">{{ c.korean }}</span>
            </span>
          </div>
          <p class="text-[11px] text-fg-faint">
            👉 자동으로 <strong class="text-fg">복습 탭</strong>에 추가됐어요. 잊을 만할 때 다시 나옵니다.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
        <button
          class="btn py-2.5 px-5 text-sm font-600 border border-fg-faint/20 bg-card text-fg"
          @click="emit('back')"
        >
          ← 메뉴로
        </button>
        <button
          v-if="wrongList.length > 0"
          class="btn py-2.5 px-5 text-sm font-700 bg-error text-bg-DEFAULT"
          @click="(wrongOnlyMode = true, buildNextSet())"
        >
          🩹 약점만 다시
        </button>
        <button
          class="btn py-2.5 px-5 text-sm font-700 text-bg-DEFAULT"
          :class="isCta ? 'bg-cta' : 'bg-ai'"
          @click="restartFull"
        >
          🔁 처음부터
        </button>
      </div>
    </div>
  </div>
</template>
