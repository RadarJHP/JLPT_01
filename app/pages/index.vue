<script setup lang="ts">
import { getAllVocab, getVocabByLevel } from '~/data/vocab'
import { getAllHiragana } from '~/data/hiragana'
import { getAllKatakana } from '~/data/katakana'
import { getAllKanji } from '~/data/kanji'
import { getAllGrammar } from '~/data/grammar'

const srs = useSrs()
onMounted(() => srs.load())

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
