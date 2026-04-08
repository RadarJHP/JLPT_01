<script setup lang="ts">
import { getAllVocab, getVocabByLevel } from '~/data/vocab'
import { getAllHiragana } from '~/data/hiragana'
import { getAllKatakana } from '~/data/katakana'
import { getAllKanji } from '~/data/kanji'
import { getAllGrammar } from '~/data/grammar'

const srs = useSrs()
const mix = useMixSettings()
onMounted(() => { srs.load(); mix.load() })

const allHiragana = getAllHiragana().map(c => ({ ...c, id: `hiragana:${c.kana}` }))
const allKatakana = getAllKatakana().map(c => ({ ...c, id: `katakana:${c.kana}` }))
const n5 = getVocabByLevel('N5')
const n4 = getVocabByLevel('N4')
const n3 = getVocabByLevel('N3')
const allKanji = getAllKanji()
const allGrammar = getAllGrammar()

const dueHira = computed(() => srs.getDueCount(allHiragana))
const dueKata = computed(() => srs.getDueCount(allKatakana))
const dueVocab = computed(() => srs.getDueCount(getAllVocab()))
const dueKanji = computed(() => srs.getDueCount(allKanji))
const dueGrammar = computed(() => srs.getDueCount(allGrammar))
const totalDue = computed(() => dueHira.value + dueKata.value + dueVocab.value + dueKanji.value + dueGrammar.value)

const today = computed(() => srs.getTodayStats())
const streak = computed(() => srs.root.value.streak)

function levelStats(pool: { id: string }[]) {
  let learned = 0, mastered = 0
  for (const p of pool) {
    const c = srs.root.value.cards[p.id]
    if (c?.introduced) learned++
    if (c && c.box >= 5) mastered++
  }
  return { learned, mastered, total: pool.length }
}

const hiraStats = computed(() => levelStats(allHiragana))
const kataStats = computed(() => levelStats(allKatakana))
const n5Stats = computed(() => levelStats(n5))
const n4Stats = computed(() => levelStats(n4))
const n3Stats = computed(() => levelStats(n3))
const kanjiStats = computed(() => levelStats(allKanji))
const grammarStats = computed(() => levelStats(allGrammar))

// Overall N3 progress: weight kana + N5+N4+N3 vocab evenly
const overallProgress = computed(() => {
  const total = allHiragana.length + allKatakana.length + n5.length + n4.length + n3.length
  const learned = hiraStats.value.learned + kataStats.value.learned + n5Stats.value.learned + n4Stats.value.learned + n3Stats.value.learned
  return total === 0 ? 0 : Math.round(learned / total * 100)
})

// Leech cards across all decks (kana + vocab) — items missed at least once.
// Each entry carries a deck label so the UI can route the user back to where it lives.
interface LeechRow {
  id: string
  display: string  // kana or word
  reading: string
  meaning: string
  lapses: number
  deck: string     // 'hiragana' | 'katakana' | 'vocab' | ...
  href: string
}
const leechRows = computed<LeechRow[]>(() => {
  const out: LeechRow[] = []
  const hira = srs.getLeechCards(allHiragana, 1)
  for (const c of hira) {
    out.push({ id: c.id, display: c.kana, reading: c.romaji, meaning: c.korean, lapses: srs.root.value.cards[c.id].lapses, deck: 'hiragana', href: '/hiragana' })
  }
  const kata = srs.getLeechCards(allKatakana, 1)
  for (const c of kata) {
    out.push({ id: c.id, display: c.kana, reading: c.romaji, meaning: c.korean, lapses: srs.root.value.cards[c.id].lapses, deck: 'katakana', href: '/katakana' })
  }
  const vocab = srs.getLeechCards(getAllVocab(), 1)
  for (const v of vocab) {
    out.push({ id: v.id, display: v.word, reading: v.reading, meaning: v.meaning, lapses: srs.root.value.cards[v.id].lapses, deck: 'vocab', href: '/vocab' })
  }
  return out.sort((a, b) => b.lapses - a.lapses).slice(0, 10)
})

// Mix-ratio total for normalized display
const mixTotal = computed(() => {
  const s = mix.settings.value
  return Math.max(s.current + s.mastered + s.words, 1)
})
const showMixPanel = ref(false)

const greetings = ['おはよう', 'こんにちは', 'こんばんは']
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 11) return greetings[0]
  if (h < 18) return greetings[1]
  return greetings[2]
})
</script>

<template>
  <div class="space-y-6">
    <!-- Hero / greeting -->
    <section class="text-center pt-6 pb-2">
      <div class="kana-display text-4xl text-ai mb-2 animate-float">{{ greeting }}</div>
      <h1 class="text-2xl md:text-3xl font-800 text-fg-strong leading-tight mb-1">
        오늘도 한 걸음씩 🌸
      </h1>
      <p class="text-sm text-fg-muted">짬짬이 복습하고, 틀린 건 다시 보고. 그게 N3로 가는 길.</p>
    </section>

    <!-- Streak / today / due -->
    <section class="grid grid-cols-3 gap-2.5">
      <div class="card p-3 text-center">
        <div class="text-2xl mb-0.5">🔥</div>
        <div class="text-xl font-800 text-yama font-en tabular-nums">{{ streak }}</div>
        <div class="text-[10px] text-fg-muted uppercase tracking-wider">연속</div>
      </div>
      <div class="card p-3 text-center">
        <div class="text-2xl mb-0.5">📖</div>
        <div class="text-xl font-800 text-matcha font-en tabular-nums">{{ today.studied }}</div>
        <div class="text-[10px] text-fg-muted uppercase tracking-wider">오늘</div>
      </div>
      <NuxtLink to="/review" class="card-hover p-3 text-center no-underline">
        <div class="text-2xl mb-0.5">⏰</div>
        <div class="text-xl font-800 text-sakura font-en tabular-nums">{{ totalDue }}</div>
        <div class="text-[10px] text-fg-muted uppercase tracking-wider">복습</div>
      </NuxtLink>
    </section>

    <!-- Big CTA: today's review -->
    <NuxtLink
      v-if="totalDue > 0"
      to="/review"
      class="block no-underline animate-bounce-in"
    >
      <div class="card p-5 border-2 border-yama/30 bg-yama-soft/40 flex items-center gap-4">
        <div class="text-3xl animate-sparkle">✨</div>
        <div class="flex-1">
          <div class="font-700 text-fg-strong">복습 {{ totalDue }}개가 기다려요</div>
          <div class="text-xs text-fg-muted">5분이면 충분해요</div>
        </div>
        <span class="btn-sakura font-700 text-sm">시작 →</span>
      </div>
    </NuxtLink>

    <!-- Leech / weak items highlight -->
    <section v-if="leechRows.length > 0" class="card p-4 border-2 border-error/30 bg-error-soft/30">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h2 class="text-sm font-700 text-error flex items-center gap-1.5">
            <span>🩹</span> 자주 틀리는 것
          </h2>
          <p class="text-[11px] text-fg-muted">놓치지 말고 다시 봐요</p>
        </div>
        <NuxtLink to="/leech" class="btn text-xs py-1.5 px-3 font-700 bg-error text-bg-DEFAULT no-underline">
          이것만 테스트 →
        </NuxtLink>
      </div>
      <div class="space-y-1.5">
        <NuxtLink
          v-for="row in leechRows"
          :key="row.id"
          :to="row.href"
          class="flex items-center gap-3 py-1.5 px-2 rounded-md no-underline hover:bg-error/10 transition-colors border border-error/15 bg-card"
        >
          <span class="kana-display text-lg text-error font-700 w-16 truncate">{{ row.display }}</span>
          <span class="text-xs text-fg-muted font-en w-16 truncate">{{ row.reading }}</span>
          <span class="text-xs text-fg flex-1 truncate">{{ row.meaning }}</span>
          <span class="badge bg-error text-bg-DEFAULT text-[10px] font-700">×{{ row.lapses }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Mix ratio settings -->
    <section class="card">
      <button
        class="w-full p-4 flex items-center justify-between text-left"
        @click="showMixPanel = !showMixPanel"
      >
        <div>
          <h2 class="text-sm font-700 text-fg-strong flex items-center gap-1.5">
            <span>⚙️</span> 출제 비율 설정
          </h2>
          <p class="text-[11px] text-fg-muted mt-0.5">
            현재 행 {{ Math.round(mix.settings.value.current / mixTotal * 100) }}% ·
            잘 맞추는 것 {{ Math.round(mix.settings.value.mastered / mixTotal * 100) }}% ·
            단어 {{ Math.round(mix.settings.value.words / mixTotal * 100) }}%
          </p>
        </div>
        <span class="text-fg-faint text-xs">{{ showMixPanel ? '닫기' : '편집' }}</span>
      </button>
      <div v-if="showMixPanel" class="px-4 pb-4 border-t border-fg-faint/10 pt-4 space-y-3">
        <label class="block">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-fg-strong font-600">현재 행</span>
            <span class="text-fg-muted font-en tabular-nums">{{ mix.settings.value.current }}</span>
          </div>
          <input
            type="range" min="0" max="100" step="5"
            :value="mix.settings.value.current"
            class="w-full accent-ai"
            @input="mix.update({ current: Number(($event.target as HTMLInputElement).value) })"
          >
        </label>
        <label class="block">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-fg-strong font-600">잘 맞추는 것 (복습용)</span>
            <span class="text-fg-muted font-en tabular-nums">{{ mix.settings.value.mastered }}</span>
          </div>
          <input
            type="range" min="0" max="100" step="5"
            :value="mix.settings.value.mastered"
            class="w-full accent-matcha"
            @input="mix.update({ mastered: Number(($event.target as HTMLInputElement).value) })"
          >
        </label>
        <label class="block">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-fg-strong font-600">간단한 단어 (이미지 포함)</span>
            <span class="text-fg-muted font-en tabular-nums">{{ mix.settings.value.words }}</span>
          </div>
          <input
            type="range" min="0" max="100" step="5"
            :value="mix.settings.value.words"
            class="w-full accent-sakura"
            @input="mix.update({ words: Number(($event.target as HTMLInputElement).value) })"
          >
        </label>
        <button
          class="text-[11px] text-fg-faint hover:text-fg underline"
          @click="mix.reset()"
        >
          기본값으로 (60·20·20)
        </button>
      </div>
    </section>

    <!-- Course cards -->
    <section>
      <h2 class="text-xs font-700 text-fg-muted mb-2 uppercase tracking-wider">📚 학습 코스</h2>
      <div class="space-y-2.5">
        <NuxtLink to="/hiragana" class="no-underline block group">
          <div class="card group-hover:shadow-md group-hover:-translate-y-0.5 p-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-ai-soft flex items-center justify-center shrink-0">
                <span class="kana-display text-2xl text-ai">あ</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-700 text-fg-strong">히라가나</h3>
                  <span v-if="dueHira > 0" class="badge bg-yama-soft text-yama text-[10px]">{{ dueHira }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-fg-faint/12 rounded-full overflow-hidden">
                    <div class="h-full bg-ai rounded-full" :style="{ width: (hiraStats.learned / hiraStats.total * 100) + '%' }" />
                  </div>
                  <span class="text-[10px] text-fg-faint font-en tabular-nums">{{ hiraStats.learned }}/{{ hiraStats.total }}</span>
                </div>
              </div>
              <span class="text-fg-faint group-hover:text-ai transition-colors">→</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/katakana" class="no-underline block group">
          <div class="card group-hover:shadow-md group-hover:-translate-y-0.5 p-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-cta-soft flex items-center justify-center shrink-0">
                <span class="kana-display text-2xl text-cta">ア</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-700 text-fg-strong">카타카나</h3>
                  <span v-if="dueKata > 0" class="badge bg-yama-soft text-yama text-[10px]">{{ dueKata }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-fg-faint/12 rounded-full overflow-hidden">
                    <div class="h-full bg-cta rounded-full" :style="{ width: (kataStats.learned / kataStats.total * 100) + '%' }" />
                  </div>
                  <span class="text-[10px] text-fg-faint font-en tabular-nums">{{ kataStats.learned }}/{{ kataStats.total }}</span>
                </div>
              </div>
              <span class="text-fg-faint group-hover:text-cta transition-colors">→</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/vocab" class="no-underline block group">
          <div class="card group-hover:shadow-md group-hover:-translate-y-0.5 p-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-sakura-soft flex items-center justify-center shrink-0 text-2xl">
                🌸
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-700 text-fg-strong">단어</h3>
                  <span v-if="dueVocab > 0" class="badge bg-yama-soft text-yama text-[10px]">{{ dueVocab }}</span>
                </div>
                <div class="text-xs text-fg-muted">N5·N4·N3 예문 + 발음</div>
              </div>
              <span class="text-fg-faint group-hover:text-sakura transition-colors">→</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/kanji" class="no-underline block group">
          <div class="card group-hover:shadow-md group-hover:-translate-y-0.5 p-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-matcha-soft flex items-center justify-center shrink-0">
                <span class="kana-display text-2xl text-matcha">漢</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-700 text-fg-strong">한자</h3>
                  <span v-if="dueKanji > 0" class="badge bg-yama-soft text-yama text-[10px]">{{ dueKanji }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-fg-faint/12 rounded-full overflow-hidden">
                    <div class="h-full bg-matcha rounded-full" :style="{ width: (kanjiStats.learned / Math.max(kanjiStats.total, 1) * 100) + '%' }" />
                  </div>
                  <span class="text-[10px] text-fg-faint font-en tabular-nums">{{ kanjiStats.learned }}/{{ kanjiStats.total }}</span>
                </div>
              </div>
              <span class="text-fg-faint group-hover:text-matcha transition-colors">→</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/grammar" class="no-underline block group">
          <div class="card group-hover:shadow-md group-hover:-translate-y-0.5 p-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                <span class="text-accent text-xl font-700">文</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-700 text-fg-strong">문법</h3>
                  <span v-if="dueGrammar > 0" class="badge bg-yama-soft text-yama text-[10px]">{{ dueGrammar }}</span>
                </div>
                <div class="text-xs text-fg-muted">N5 핵심 패턴 + 빈칸 채우기</div>
              </div>
              <span class="text-fg-faint group-hover:text-accent transition-colors">→</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- N3 path progress -->
    <section class="card p-5">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h2 class="text-sm font-700 text-fg-strong">🎯 N3로 가는 길</h2>
          <p class="text-xs text-fg-muted">전체 진행도</p>
        </div>
        <div class="text-2xl font-800 text-sakura font-en tabular-nums">{{ overallProgress }}%</div>
      </div>
      <div class="h-2 bg-fg-faint/12 rounded-full overflow-hidden mb-4">
        <div
          class="h-full rounded-full bg-gradient-to-r from-success via-ai to-sakura transition-all duration-1000"
          :style="{ width: overallProgress + '%' }"
        />
      </div>
      <div class="grid grid-cols-5 gap-2 text-center text-xs">
        <div>
          <div class="font-700 text-ai">あ</div>
          <div class="text-fg-faint font-en">{{ hiraStats.learned }}/{{ hiraStats.total }}</div>
        </div>
        <div>
          <div class="font-700 text-cta">ア</div>
          <div class="text-fg-faint font-en">{{ kataStats.learned }}/{{ kataStats.total }}</div>
        </div>
        <div>
          <div class="font-700 text-success">N5</div>
          <div class="text-fg-faint font-en">{{ n5Stats.learned }}/{{ n5Stats.total }}</div>
        </div>
        <div>
          <div class="font-700 text-ai">N4</div>
          <div class="text-fg-faint font-en">{{ n4Stats.learned }}/{{ n4Stats.total }}</div>
        </div>
        <div>
          <div class="font-700 text-sakura">N3</div>
          <div class="text-fg-faint font-en">{{ n3Stats.learned }}/{{ n3Stats.total }}</div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section>
      <h2 class="text-xs font-700 text-fg-muted mb-2 uppercase tracking-wider">학습 방식</h2>
      <div class="grid grid-cols-3 gap-2">
        <div class="card p-3 text-center">
          <div class="text-xl mb-1">🎯</div>
          <h3 class="font-700 text-xs text-fg-strong mb-0.5">찍어보기</h3>
          <p class="text-[10px] text-fg-faint leading-snug">몰라도 일단 골라요</p>
        </div>
        <div class="card p-3 text-center">
          <div class="text-xl mb-1">💡</div>
          <h3 class="font-700 text-xs text-fg-strong mb-0.5">연상·예문</h3>
          <p class="text-[10px] text-fg-faint leading-snug">맥락으로 외워요</p>
        </div>
        <div class="card p-3 text-center">
          <div class="text-xl mb-1">🔄</div>
          <h3 class="font-700 text-xs text-fg-strong mb-0.5">간격 반복</h3>
          <p class="text-[10px] text-fg-faint leading-snug">잊을 때 다시 나와요</p>
        </div>
      </div>
    </section>
  </div>
</template>
