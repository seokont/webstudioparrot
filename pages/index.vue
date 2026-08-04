<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight } from '@lucide/vue'
import type { PortfolioItem } from '~/types/portfolio'

const { t, te, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const { data: portfolio } = await useFetch<PortfolioItem[]>('/api/portfolio', {
  default: () => []
})

const languages = [
  { code: 'uk', label: 'UA', name: 'Українська', dir: 'ltr' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'he', label: 'HE', name: 'עברית', dir: 'rtl' }
] as const

const serviceKeys = ['first', 'second', 'third'] as const
const services = computed(() => serviceKeys.map(key => ({
  name: t(`services.items.${key}.name`),
  description: t(`services.items.${key}.description`)
})))

const processKeys = ['first', 'second', 'third', 'fourth'] as const
const processItems = computed(() => processKeys.map(key => ({
  title: t(`process.items.${key}.title`),
  description: t(`process.items.${key}.description`)
})))

const ticker = computed(() => {
  if (locale.value === 'uk') return ['UX/UI ДИЗАЙН', 'NUXT РОЗРОБКА', 'CRM', 'AI-АГЕНТИ', 'АВТОМАТИЗАЦІЯ', 'БРЕНД-СИСТЕМИ']
  if (locale.value === 'he') return ['עיצוב UX/UI', 'פיתוח NUXT', 'מערכות CRM', 'סוכני AI', 'אוטומציה', 'מערכות מותג']
  return ['UX/UI DESIGN', 'NUXT DEVELOPMENT', 'CRM', 'AI AGENTS', 'AUTOMATION', 'BRAND SYSTEMS']
})

function projectSummary(item: PortfolioItem) {
  const key = `portfolio.items.${item.id}`
  return te(key) ? t(key) : item.summary
}

const videoRef = ref<HTMLVideoElement | null>(null)
let animationFrame = 0
let targetTime = 5
let revealObserver: IntersectionObserver | null = null

function scrubVideo(clientX: number, clientY: number) {
  const video = videoRef.value
  if (!video || !video.duration || window.matchMedia('(pointer: coarse)').matches) return

  const ratio = Math.max(0, Math.min(1, clientX / window.innerWidth))
  targetTime = Math.max(.05, Math.min(video.duration - .05, ratio * video.duration))
  document.documentElement.style.setProperty('--pointer-x', `${clientX}px`)
  document.documentElement.style.setProperty('--pointer-y', `${clientY}px`)

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(() => {
      if (video.readyState >= 2) video.currentTime += (targetTime - video.currentTime) * .7
      animationFrame = 0
    })
  }
}

function handlePointerMove(event: PointerEvent) {
  scrubVideo(event.clientX, event.clientY)
}

onMounted(() => {
  const video = videoRef.value
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (video) {
    if (coarse) video.play().catch(() => {})
    else {
      video.pause()
      video.addEventListener('loadedmetadata', () => { video.currentTime = video.duration / 2 }, { once: true })
    }
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting))
  }, { threshold: .12 })
  document.querySelectorAll('.reveal').forEach(element => revealObserver?.observe(element))
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  window.removeEventListener('pointermove', handlePointerMove)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'uk' ? 'uk-UA' : locale.value === 'he' ? 'he-IL' : 'en-US',
    dir: locale.value === 'he' ? 'rtl' : 'ltr'
  }
}))

const requestUrl = useRequestURL()
const socialImage = new URL('/og.png', requestUrl.origin).href
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImage: socialImage,
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: socialImage
})
</script>

<template>
  <div>
    <header class="site-header">
      <nav class="container nav-shell" aria-label="SEOKONT">
        <NuxtLink :to="localePath('/')" class="brand" :aria-label="t('nav.home')">
          <img class="brand-logo" src="/brand/logo.png" alt="">
        </NuxtLink>
        <div class="nav-links">
          <a href="#services">{{ t('nav.services') }}</a>
          <a href="#work">{{ t('nav.projects') }}</a>
          <a href="#process">{{ t('nav.approach') }}</a>
        </div>
        <div class="nav-actions">
          <div class="locale-switcher" aria-label="Language">
            <NuxtLink
              v-for="language in languages"
              :key="language.code"
              :to="switchLocalePath(language.code)"
              :class="{ active: locale === language.code }"
              :lang="language.code"
              :dir="language.dir"
              :title="language.name"
            >{{ language.label }}</NuxtLink>
          </div>
          <a href="#contact" class="nav-cta">{{ t('nav.discuss') }} <ArrowUpRight :size="16" /></a>
        </div>
      </nav>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-video-layer">
          <video ref="videoRef" class="hero-bg-video" src="/video/parrot.mp4" muted loop playsinline preload="auto" aria-hidden="true" />
        </div>
        <div class="container hero-layout">
          <div class="hero-content">
            <div class="eyebrow">{{ t('hero.eyebrow') }}</div>
            <h1 id="hero-title">{{ t('hero.line1') }}<br><span class="accent-word">{{ t('hero.accent') }}</span> {{ t('hero.line2') }}</h1>
            <div class="hero-copy">
              <p>{{ t('hero.description') }}</p>
              <a href="#services" class="round-link" :aria-label="t('hero.servicesLabel')"><ArrowDownRight :size="24" /></a>
            </div>
          </div>
        </div>
        <div class="container hero-edge-meta" aria-hidden="true">
          <div class="parrot-label"><span class="status-dot" /> {{ t('hero.cursor') }}</div>
          <img class="hero-edge-logo" src="/brand/logo.png" alt="">
        </div>
        <div class="orbit-copy" aria-hidden="true">SMART<br>SYSTEMS<br>✦ 2026</div>
      </section>

      <div class="ticker" aria-hidden="true">
        <div class="ticker-track">
          <div v-for="group in 2" :key="group" class="ticker-group">
            <span v-for="item in ticker" :key="`${group}-${item}`" class="ticker-item">{{ item }}</span>
          </div>
        </div>
      </div>

      <section id="services" class="section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">{{ t('services.kicker') }}</p>
              <h2 class="section-title">{{ t('services.title1') }}<br>{{ t('services.title2') }}</h2>
            </div>
            <p class="section-note">{{ t('services.note') }}</p>
          </div>
          <div class="services">
            <article v-for="(service, index) in services" :key="service.name" class="service-row reveal">
              <span class="service-number">0{{ index + 1 }}</span>
              <div class="service-name">{{ service.name }}</div>
              <p class="service-desc">{{ service.description }}</p>
              <span class="service-icon"><ArrowUpRight :size="22" /></span>
            </article>
          </div>
        </div>
      </section>

      <section id="work" class="section portfolio-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">{{ t('portfolio.kicker') }}</p>
              <h2 class="section-title">{{ t('portfolio.title1') }}<br>{{ t('portfolio.title2') }}</h2>
            </div>
            <p class="section-note">{{ t('portfolio.note') }}</p>
          </div>
          <div class="portfolio-grid">
            <article v-for="item in portfolio" :key="item.id" class="project-card reveal" :style="{ '--project-accent': item.accent }">
              <div class="project-visual">
                <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="project-image">
                <div v-else class="project-art" :data-monogram="item.title.slice(0, 1)" />
                <span class="project-tag">{{ item.category }}</span>
              </div>
              <div class="project-meta">
                <div><h3>{{ item.title }}</h3><p>{{ projectSummary(item) }}</p></div>
                <span class="project-year">{{ item.year }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="section">
        <div class="container process-grid">
          <div class="process-sticky reveal">
            <p class="section-kicker">{{ t('process.kicker') }}</p>
            <h2 class="section-title">{{ t('process.title1') }}<br>{{ t('process.title2') }}<br><span style="color: var(--acid)">{{ t('process.accent') }}</span></h2>
          </div>
          <div class="process-list">
            <article v-for="item in processItems" :key="item.title" class="process-item reveal">
              <div><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="cta-section">
        <div class="container">
          <div class="cta-card reveal">
            <img class="cta-watermark" src="/brand/logo.png" alt="" aria-hidden="true">
            <div class="cta-top"><span>{{ t('contact.question') }}</span><span>{{ t('contact.availability') }}</span></div>
            <h2 class="cta-title">{{ t('contact.title') }}</h2>
            <div class="cta-bottom">
              <p>{{ t('contact.description') }}</p>
              <a class="cta-link" href="mailto:hello@seokont.com">hello@seokont.com <ArrowUpRight :size="24" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-row">
        <div class="footer-brand"><span>© {{ new Date().getFullYear() }}</span><img src="/brand/logo.png" alt="SEOKONT"></div>
        <span>{{ t('footer.services') }}</span>
        <NuxtLink to="/admin">ADMIN ↗</NuxtLink>
      </div>
    </footer>
  </div>
</template>
