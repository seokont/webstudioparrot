export default defineNuxtConfig({
  compatibilityDate: "2026-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/color-mode", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },
  i18n: {
    defaultLocale: "uk",
    strategy: "prefix",
    locales: [
      { code: "uk", language: "uk-UA", name: "UA", dir: "ltr" },
      { code: "en", language: "en-US", name: "EN", dir: "ltr" },
      { code: "he", language: "he-IL", name: "HE", dir: "rtl" },
    ],
    vueI18n: "../i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "seokont_locale",
      redirectOn: "root",
    },
  },
  runtimeConfig: {
    adminUsername: process.env.NUXT_ADMIN_USERNAME || "admin",
    adminPassword: process.env.NUXT_ADMIN_PASSWORD || "seokont-demo-2026",
    adminSessionSecret:
      process.env.NUXT_ADMIN_SESSION_SECRET ||
      "seokont-local-session-secret-change-in-production",
    mailUser: process.env.NUXT_MAIL_USER || "",
    mailAppPassword: process.env.NUXT_MAIL_APP_PASSWORD || "",
    contactRecipient:
      process.env.NUXT_CONTACT_RECIPIENT || "maks@seokont.online",
  },
  app: {
    head: {
      title: "SEOKONT — сайти, CRM та AI-автоматизація",
      htmlAttrs: { lang: "uk", dir: "ltr" },
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=AW-18217009551",
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18217009551');`,
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "SEOKONT створює сайти, CRM-системи та AI-автоматизації, що перетворюють рутину на зростання.",
        },
        { name: "theme-color", content: "#0b0d0c" },
        {
          property: "og:title",
          content: "SEOKONT — digital-системи для зростання",
        },
        {
          property: "og:description",
          content: "Сайти, CRM та AI-автоматизація під ключ.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },
  nitro: {
    routeRules: {
      "/api/**": { cors: false },
    },
  },
});
