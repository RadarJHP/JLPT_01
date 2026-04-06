export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@unocss/nuxt'],

  app: {
    head: {
      title: 'にほんご Duel — 이미지로 배우는 히라가나·카타카나',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '한국인을 위한 이미지 연상 일본어 학습. 히라가나와 카타카나를 그림으로 쉽게 외우세요.' },
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
