<template>
  <div class="min-h-screen bg-bg">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-bg/90 backdrop-blur-lg border-b border-fg-faint/10">
      <div class="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 text-fg-strong font-700 text-base no-underline">
          <span class="kana-display text-ai">あ</span>
          <span class="font-kr text-sm">にほんご<span class="text-cta ml-0.5">Duel</span></span>
        </NuxtLink>
        <nav class="flex items-center gap-0.5">
          <NuxtLink
            to="/hiragana"
            class="px-3 py-1 rounded-sm text-xs font-500 text-fg-muted hover:text-fg hover:bg-fg/8 transition-all no-underline"
            active-class="!text-ai !bg-ai-light"
          >
            히라가나
          </NuxtLink>
          <NuxtLink
            to="/katakana"
            class="px-3 py-1 rounded-sm text-xs font-500 text-fg-muted hover:text-fg hover:bg-fg/8 transition-all no-underline"
            active-class="!text-cta !bg-cta-light"
          >
            카타카나
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>
