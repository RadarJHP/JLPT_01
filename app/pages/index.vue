<script setup lang="ts">
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="text-center py-16 md:py-24">
      <div class="kana-display text-6xl md:text-7xl mb-4 text-ai">あ ア</div>
      <h1 class="text-3xl md:text-4xl font-800 text-fg-strong leading-tight mb-3">
        맞춰가며 배우는<br>일본어 첫걸음
      </h1>
      <p class="text-base text-fg-muted max-w-md mx-auto leading-relaxed">
        몰라도 괜찮아요. 찍어보고, 틀리고, 연상 이미지로 외우세요.<br>
        그게 가장 빠른 방법이에요.
      </p>
    </section>

    <!-- Course selection -->
    <section class="space-y-3 mb-12">
      <NuxtLink to="/hiragana" class="no-underline block group">
        <div class="card p-5 group-hover:border-ai/30 group-hover:shadow-glow-ai">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-md bg-ai-light flex items-center justify-center shrink-0">
              <span class="kana-display text-3xl text-ai">あ</span>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-700 text-fg-strong mb-0.5">히라가나</h2>
              <p class="text-sm text-fg-muted">일본어의 기본 문자 46자. 여기서부터 시작하세요.</p>
            </div>
            <span class="text-fg-faint group-hover:text-ai transition-colors text-lg">→</span>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/katakana" class="no-underline block group">
        <div class="card p-5 group-hover:border-cta/30 group-hover:shadow-glow-cta">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-md bg-cta-light flex items-center justify-center shrink-0">
              <span class="kana-display text-3xl text-cta">ア</span>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-700 text-fg-strong mb-0.5">카타카나</h2>
              <p class="text-sm text-fg-muted">외래어 표기 문자 46자. 히라가나 다음에 도전!</p>
            </div>
            <span class="text-fg-faint group-hover:text-cta transition-colors text-lg">→</span>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- How it works -->
    <section class="mb-12">
      <h2 class="text-sm font-600 text-fg-muted mb-4 text-center uppercase tracking-wider">학습 방법</h2>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-card rounded-md p-4 border border-fg-faint/10">
          <div class="text-2xl mb-2">🎯</div>
          <h3 class="font-600 text-xs text-fg-strong mb-1">찍어보기</h3>
          <p class="text-xs text-fg-faint">몰라도 일단 골라봐요</p>
        </div>
        <div class="bg-card rounded-md p-4 border border-fg-faint/10">
          <div class="text-2xl mb-2">💡</div>
          <h3 class="font-600 text-xs text-fg-strong mb-1">연상 학습</h3>
          <p class="text-xs text-fg-faint">틀리면 기억법을 알려줘요</p>
        </div>
        <div class="bg-card rounded-md p-4 border border-fg-faint/10">
          <div class="text-2xl mb-2">🔄</div>
          <h3 class="font-600 text-xs text-fg-strong mb-1">반복</h3>
          <p class="text-xs text-fg-faint">틀린 것만 다시 나와요</p>
        </div>
      </div>
    </section>
  </div>
</template>
