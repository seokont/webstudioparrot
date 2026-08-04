export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  i18n: {
    defaultLocale: 'uk',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'uk', language: 'uk-UA', name: 'UA', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'EN', dir: 'ltr' },
      { code: 'he', language: 'he-IL', name: 'HE', dir: 'rtl' }
    ],
    vueI18n: '../i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'seokont_locale',
      redirectOn: 'root'
    }
  },
  runtimeConfig: {
    adminUsername: process.env.NUXT_ADMIN_USERNAME || 'admin',
    adminPassword: process.env.NUXT_ADMIN_PASSWORD || 'seokont-demo-2026',
    adminSessionSecret: process.env.NUXT_ADMIN_SESSION_SECRET || 'seokont-local-session-secret-change-in-production'
  },
  app: {
    head: {
      htmlAttrs: { lang: 'uk', dir: 'ltr' },
      title: 'SEOKONT — сайти, CRM та AI-автоматизація',
      meta: [
        { name: 'description', content: 'SEOKONT створює сайти, CRM-системи та AI-автоматизації, що перетворюють рутину на зростання.' },
        { name: 'theme-color', content: '#0b0d0c' },
        { property: 'og:title', content: 'SEOKONT — digital-системи для зростання' },
        { property: 'og:description', content: 'Сайти, CRM та AI-автоматизація під ключ.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  nitro: {
    routeRules: {
      '/api/**': { cors: false }
    }
  }
})
