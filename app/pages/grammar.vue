<script setup lang="ts">
import { getAllGrammar, getGrammarByLevel, getGrammarCategories, type GrammarItem, type JlptLevel } from '~/data/grammar'

const srs = useSrs()
onMounted(() => srs.load())

const selectedLevel = ref<JlptLevel>('N5')
const selectedCategory = ref<string | null>(null)

const lessons = computed(() => {
  let pool = getGrammarByLevel(selectedLevel.value)
  if (selectedCategory.value) pool = pool.filter(p => p.category === selectedCategory.value)
  return pool
})

const cats = computed(() => getGrammarCategories(selectedLevel.value))

// Lesson view state
const activeLesson = ref<GrammarItem | null>(null)
const lessonPhase = ref<'read' | 'practice' | 'result'>('read')
const picked = ref<string | null>(null)

function openLesson(g: GrammarItem) {
  activeLesson.value = g
  lessonPhase.value = 'read'
  picked.value = null
}
function startPractice() { lessonPhase.value = 'practice'; picked.value = null }
function pickOption(text: string) {
  if (picked.value) return
  picked.value = text
  const correct = activeLesson.value!.practice.options.find(o => o.text === text)?.isCorrect ?? false
  srs.review(activeLesson.value!.id, 'grammar-' + selectedLevel.value.toLowerCase(), correct)
  lessonPhase.value = 'result'
}
function backToList() {
  activeLesson.value = null
}
function nextLesson() {
  if (!activeLesson.value) return
  const idx = lessons.value.findIndex(l => l.id === activeLesson.value!.id)
  const next = lessons.value[idx + 1]
  if (next) openLesson(next)
  else backToList()
}

const tts = useTts()
function speak(text: string) { tts.speak(text, { rate: 0.85 }) }

// Per-lesson learning status
function lessonStatus(id: string) {
  const c = srs.root.value.cards[id]
  if (!c?.introduced) return 'new'
  if (c.box >= 5) return 'mastered'
  return 'learning'
}
</script>

<template>
  <div>
    <div v-if="!activeLesson">
      <div class="mb-5">
        <h1 class="text-2xl font-700 text-fg-strong mb-1 flex items-center gap-2">
          <span class="text-accent">文</span> 문법
        </h1>
        <p class="text-sm text-fg-muted">JLPT N5 핵심 문법 패턴 + 빈칸 채우기 연습</p>
      </div>

      <!-- Level tab -->
      <div class="flex gap-1 p-1 bg-bg-inset rounded-lg mb-4">
        <button class="flex-1 py-2 rounded-md text-xs font-600 transition-all bg-card text-accent shadow-xs">N5</button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 text-fg-faint" disabled>N4</button>
        <button class="flex-1 py-2 rounded-md text-xs font-600 text-fg-faint" disabled>N3</button>
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <button class="text-xs px-3 py-1.5 rounded-full"
          :class="selectedCategory === null ? 'bg-accent text-white' : 'bg-bg-inset text-fg-muted'"
          @click="selectedCategory = null">
          전체
        </button>
        <button v-for="c in cats" :key="c"
          class="text-xs px-3 py-1.5 rounded-full"
          :class="selectedCategory === c ? 'bg-accent text-white' : 'bg-bg-inset text-fg-muted hover:text-fg'"
          @click="selectedCategory = c">
          {{ c }}
        </button>
      </div>

      <!-- Lesson list -->
      <div class="space-y-2">
        <button v-for="g in lessons" :key="g.id" class="card-hover w-full p-4 text-left" @click="openLesson(g)">
          <div class="flex items-start gap-3">
            <div class="text-jp text-2xl text-fg-strong shrink-0 min-w-12">{{ g.pattern }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="font-700 text-fg-strong text-sm">{{ g.title }}</span>
                <span v-if="lessonStatus(g.id) === 'mastered'" class="badge bg-success-soft text-success">✓</span>
                <span v-else-if="lessonStatus(g.id) === 'learning'" class="badge bg-yama-soft text-yama">학습중</span>
                <span v-else class="badge bg-bg-inset text-fg-muted">새</span>
              </div>
              <div class="text-xs text-fg-muted line-clamp-2">{{ g.meaning }}</div>
            </div>
            <span class="text-fg-faint">→</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Lesson view -->
    <div v-else class="max-w-md mx-auto">
      <button class="text-sm text-fg-muted hover:text-fg mb-4" @click="backToList">← 목록</button>

      <!-- READ phase -->
      <div v-if="lessonPhase === 'read'" class="animate-fade-in-up">
        <div class="card p-5 mb-3">
          <span class="pill bg-accent/15 text-accent mb-3">{{ activeLesson.category }}</span>
          <div class="text-jp text-4xl text-fg-strong mt-3 mb-2">{{ activeLesson.pattern }}</div>
          <h2 class="text-lg font-700 text-fg-strong mb-2">{{ activeLesson.title }}</h2>
          <p class="text-sm text-fg leading-relaxed">{{ activeLesson.meaning }}</p>
          <div v-if="activeLesson.formation" class="mt-3 bg-bg-inset rounded-md p-3 text-xs">
            <div class="text-fg-faint mb-1 font-600 uppercase tracking-wider">형태</div>
            <div class="text-fg">{{ activeLesson.formation }}</div>
          </div>
        </div>

        <div class="mb-4">
          <div class="text-xs font-700 text-fg-muted uppercase tracking-wider mb-2">예문</div>
          <div class="space-y-2">
            <div v-for="(ex, i) in activeLesson.examples" :key="i" class="card p-3 flex items-start gap-2">
              <button v-if="tts.supported.value" class="text-fg-faint hover:text-fg shrink-0" @click="speak(ex.jp)">🔊</button>
              <div class="flex-1 min-w-0">
                <div class="text-jp text-base text-fg-strong leading-relaxed">{{ ex.jp }}</div>
                <div class="text-xs text-fg-muted mt-0.5">{{ ex.kr }}</div>
              </div>
            </div>
          </div>
        </div>

        <button class="btn w-full font-700 bg-accent text-white" @click="startPractice">
          연습 문제 풀기 →
        </button>
      </div>

      <!-- PRACTICE phase -->
      <div v-else-if="lessonPhase === 'practice'" class="animate-fade-in-up">
        <div class="card p-5 mb-4 text-center">
          <div class="text-xs text-fg-faint uppercase tracking-wider mb-3">빈칸을 채우세요</div>
          <div class="text-jp text-2xl text-fg-strong leading-relaxed mb-2">{{ activeLesson.practice.sentence }}</div>
          <div class="text-xs text-fg-muted">{{ activeLesson.practice.sentenceKr }}</div>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <button v-for="opt in activeLesson.practice.options" :key="opt.text"
            class="option-btn py-4 px-3 rounded-md border-2 border-fg-faint/15 bg-card text-jp text-lg font-600"
            @click="pickOption(opt.text)">
            {{ opt.text }}
          </button>
        </div>
      </div>

      <!-- RESULT phase -->
      <div v-else-if="lessonPhase === 'result'" class="animate-fade-in-up">
        <div class="card p-5 mb-4">
          <div v-if="activeLesson.practice.options.find(o => o.text === picked)?.isCorrect" class="text-center">
            <div class="text-4xl mb-2 animate-pop">✨</div>
            <p class="text-success font-700 text-lg mb-3">정답!</p>
          </div>
          <div v-else class="text-center">
            <div class="text-4xl mb-2">💧</div>
            <p class="text-error font-700 text-lg mb-1">아쉬워요</p>
            <p class="text-xs text-fg-muted mb-3">정답: <span class="text-jp font-700 text-fg">{{ activeLesson.practice.options.find(o => o.isCorrect)?.text }}</span></p>
          </div>
          <div class="bg-bg-inset rounded-md p-3 text-center mb-3">
            <div class="text-jp text-xl text-fg-strong">
              {{ activeLesson.practice.sentence.replace('___', activeLesson.practice.options.find(o => o.isCorrect)?.text || '') }}
            </div>
            <div class="text-xs text-fg-muted mt-1">{{ activeLesson.practice.sentenceKr }}</div>
          </div>
          <p v-if="activeLesson.practice.explanation" class="text-xs text-fg-muted leading-relaxed">
            💡 {{ activeLesson.practice.explanation }}
          </p>
        </div>
        <div class="flex gap-2">
          <button class="flex-1 btn-ghost" @click="backToList">목록으로</button>
          <button class="flex-1 btn font-700 bg-accent text-white" @click="nextLesson">다음 →</button>
        </div>
      </div>
    </div>
  </div>
</template>
