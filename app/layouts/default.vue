<script setup lang="ts">
const srs = useSrs()
const themeApi = useTheme()
const audio = useAudioPref()
const boss = useBossMode()

onMounted(() => {
  themeApi.load()
  audio.load()
  srs.load()
  boss.bindShortcuts()
})

const themeIcon = computed(() => {
  if (themeApi.theme.value === 'light') return '🌸'
  if (themeApi.theme.value === 'dark') return '🌙'
  if (themeApi.theme.value === 'mono') return '◐'
  return '💼'
})
const themeLabel = computed(() => {
  if (themeApi.theme.value === 'light') return '라이트'
  if (themeApi.theme.value === 'dark') return '다크'
  if (themeApi.theme.value === 'mono') return '흑백'
  return '잠행'
})

const isStealth = themeApi.isStealth

const route = useRoute()
function isActive(path: string) {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}
</script>

<template>
  <div class="min-h-screen bg-bg text-fg">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-bg/85 backdrop-blur-lg border-b border-fg-faint/10">
      <div class="max-w-2xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        <NuxtLink to="/" class="flex items-center gap-2 text-fg-strong font-700 text-base no-underline shrink-0">
          <span v-if="!isStealth" class="kana-display text-ai text-xl animate-float">あ</span>
          <span v-else class="text-fg-muted text-sm font-600">📁</span>
          <span v-if="!isStealth" class="font-kr text-sm hidden sm:inline">にほんご<span class="text-cta ml-0.5">Duel</span></span>
          <span v-else class="text-sm font-600 hidden sm:inline stealth-mute">Quarterly Report</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1 flex-1 justify-center">
          <NuxtLink to="/hiragana" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-ai !bg-ai-soft">
            あ
          </NuxtLink>
          <NuxtLink to="/katakana" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-cta !bg-cta-soft">
            ア
          </NuxtLink>
          <NuxtLink to="/kanji" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-matcha !bg-matcha-soft">
            漢字
          </NuxtLink>
          <NuxtLink to="/vocab" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-sakura !bg-sakura-soft">
            단어
          </NuxtLink>
          <NuxtLink to="/grammar" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-accent !bg-accent/20">
            문법
          </NuxtLink>
          <NuxtLink to="/review" class="px-2.5 py-1.5 rounded-md text-xs font-600 text-fg-muted hover:text-fg hover:bg-fg/5 transition-all no-underline" active-class="!text-yama !bg-yama-soft">
            복습
          </NuxtLink>
        </nav>

        <!-- Right-side controls -->
        <div class="flex items-center gap-1 shrink-0">
          <button
            class="tap-area w-9 h-9 rounded-md text-fg-muted hover:text-fg hover:bg-fg/5 flex items-center justify-center transition-all"
            :title="audio.muted.value ? '음소거 해제' : '음소거'"
            :aria-label="audio.muted.value ? '음소거 해제' : '음소거'"
            @click="audio.toggle"
          >
            <span class="text-base">{{ audio.muted.value ? '🔇' : '🔊' }}</span>
          </button>
          <button
            class="tap-area w-9 h-9 rounded-md text-fg-muted hover:text-fg hover:bg-fg/5 flex items-center justify-center transition-all"
            :title="`테마: ${themeLabel} (클릭으로 변경)`"
            :aria-label="`테마 변경 (현재 ${themeLabel})`"
            @click="themeApi.cycle"
          >
            <span class="text-base">{{ themeIcon }}</span>
          </button>
          <button
            class="tap-area w-9 h-9 rounded-md text-fg-muted hover:text-fg hover:bg-fg/5 flex items-center justify-center transition-all"
            title="잠행 모드 (Esc / Ctrl+B)"
            aria-label="잠행 모드"
            @click="boss.show"
          >
            <span class="text-base">🫥</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-3 sm:px-4 py-5 pb-28 md:pb-12">
      <slot />
    </main>

    <!-- Mobile bottom nav (thumb reach) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg/95 backdrop-blur-lg border-t border-fg-faint/12 safe-bottom">
      <div class="max-w-2xl mx-auto grid grid-cols-6">
        <NuxtLink to="/" class="flex flex-col items-center justify-center py-2 no-underline transition-colors"
          :class="isActive('/') && route.path === '/' ? 'text-ai' : 'text-fg-muted'">
          <span class="text-lg leading-none">🏠</span>
          <span class="text-[9px] mt-0.5">홈</span>
        </NuxtLink>
        <NuxtLink to="/hiragana" class="flex flex-col items-center justify-center py-2 no-underline transition-colors"
          :class="isActive('/hiragana') ? 'text-ai' : 'text-fg-muted'">
          <span class="kana-display text-base leading-none">あ</span>
          <span class="text-[9px] mt-0.5">히라</span>
        </NuxtLink>
        <NuxtLink to="/katakana" class="flex flex-col items-center justify-center py-2 no-underline transition-colors"
          :class="isActive('/katakana') ? 'text-cta' : 'text-fg-muted'">
          <span class="kana-display text-base leading-none">ア</span>
          <span class="text-[9px] mt-0.5">카타</span>
        </NuxtLink>
        <NuxtLink to="/vocab" class="flex flex-col items-center justify-center py-2 no-underline transition-colors"
          :class="isActive('/vocab') ? 'text-sakura' : 'text-fg-muted'">
          <span class="text-base leading-none">🌸</span>
          <span class="text-[9px] mt-0.5">단어</span>
        </NuxtLink>
        <NuxtLink to="/kanji" class="flex flex-col items-center justify-center py-2 no-underline transition-colors"
          :class="isActive('/kanji') ? 'text-matcha' : 'text-fg-muted'">
          <span class="kana-display text-base leading-none">漢</span>
          <span class="text-[9px] mt-0.5">한자</span>
        </NuxtLink>
        <NuxtLink to="/review" class="flex flex-col items-center justify-center py-2 no-underline transition-colors relative"
          :class="isActive('/review') ? 'text-yama' : 'text-fg-muted'">
          <span class="text-base leading-none">⏰</span>
          <span class="text-[9px] mt-0.5">복습</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Boss mode overlay (always mounted, controlled by state) -->
    <BossOverlay />
  </div>
</template>
