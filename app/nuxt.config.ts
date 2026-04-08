export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // localStorage 기반 순수 정적 사이트 — Amplify의 자동 amplify 프리셋 무시하고
  // 어디서 빌드하든 .output/public 산출물을 만들도록 고정.
  nitro: {
    preset: 'static',
  },

  modules: ['@unocss/nuxt'],

  app: {
    head: {
      title: 'localhost',
      titleTemplate: 'localhost',
      htmlAttrs: { lang: 'ko' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5' },
        { name: 'description', content: '' },
        { name: 'theme-color', content: '#F8F4EC' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'localhost' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/global.css'],
})
