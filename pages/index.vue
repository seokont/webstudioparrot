<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Send } from '@lucide/vue'
import type { PortfolioItem } from '~/types/portfolio'

const { t, te, locale, getLocaleMessage } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const { data: portfolio } = await useFetch<PortfolioItem[]>('/api/portfolio', {
  default: () => []
})

const serviceSlugs = ['web-development', 'crm-development', 'ai-automation'] as const
const serviceKeys = ['first', 'second', 'third'] as const
const services = computed(() => serviceKeys.map((key, index) => ({
  slug: serviceSlugs[index],
  name: t(`services.items.${key}.name`),
  description: t(`services.items.${key}.description`)
})))

const processKeys = ['first', 'second', 'third', 'fourth'] as const
const processItems = computed(() => processKeys.map(key => ({
  title: t(`process.items.${key}.title`),
  description: t(`process.items.${key}.description`)
})))

const localeMessages = computed(() => getLocaleMessage(locale.value) as Record<string, any>)
const businessProblems = computed(() => localeMessages.value?.businessProblems?.items ?? [])
const aiWorkflowData = computed(() => localeMessages.value?.aiWorkflow ?? { sectors: [], examples: {}, steps: [] })
const aiSectors = computed(() => aiWorkflowData.value?.sectors ?? [])
const aiExamples = computed(() => aiWorkflowData.value?.examples ?? {})
const aiSteps = computed(() => aiWorkflowData.value?.steps ?? [])
const advantages = computed(() => localeMessages.value?.advantages?.items ?? [])
const timeline = computed(() => localeMessages.value?.timeline?.items ?? [])
const technologies = computed(() => localeMessages.value?.technologies?.items ?? [])
const faqItems = computed(() => localeMessages.value?.faq?.items ?? [])
const projectTypes = computed(() => localeMessages.value?.contact?.form?.projectTypes ?? [])
const workflowExamples = computed(() => Object.values(aiExamples.value) as string[])

const ticker = computed(() => {
  if (locale.value === 'uk') return ['UX/UI ДИЗАЙН', 'NUXT РОЗРОБКА', 'CRM', 'AI-АГЕНТИ', 'АВТОМАТИЗАЦІЯ', 'БРЕНД-СИСТЕМИ']
  if (locale.value === 'he') return ['עיצוב UX/UI', 'פיתוח NUXT', 'מערכות CRM', 'סוכני AI', 'אוטומציה', 'מערכות מותג']
  return ['UX/UI DESIGN', 'NUXT DEVELOPMENT', 'CRM', 'AI AGENTS', 'AUTOMATION', 'BRAND SYSTEMS']
})

function projectSummary(item: PortfolioItem) {
  const key = `portfolio.items.${item.id}`
  return te(key) ? t(key) : item.summary
}

function itemNumber(index: string | number) {
  return String(Number(index) + 1).padStart(2, '0')
}

const videoRef = ref<HTMLVideoElement | null>(null)
let animationFrame = 0
let targetTime = 5

const contactForm = reactive({
  name: '',
  phone: '',
  email: '',
  messenger: '',
  type: '',
  message: ''
})
const formStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

async function submitContact() {
  formStatus.value = 'loading'

  try {
    const utm = Object.fromEntries(
      Object.entries(route.query)
        .filter(([key]) => key.startsWith('utm_'))
        .map(([key, value]) => [key, Array.isArray(value) ? String(value[0] ?? '') : String(value ?? '')])
    )

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...contactForm,
        language: locale.value,
        page: route.fullPath,
        utm
      }
    })

    Object.assign(contactForm, { name: '', phone: '', email: '', messenger: '', type: '', message: '' })
    formStatus.value = 'success'
  } catch {
    formStatus.value = 'error'
  }
}

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

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
})

onBeforeUnmount(() => {
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
            <NuxtLink
            v-for="(service, index) in services"
            :key="service.slug"
            :to="localePath(`/services/${service.slug}`)"
            class="service-row reveal"
          >
            <span class="service-number">0{{ index + 1 }}</span>
            <div class="service-name">{{ service.name }}</div>
            <p class="service-desc">{{ service.description }}</p>
            <span class="service-icon"><ArrowUpRight :size="22" /></span>
          </NuxtLink>
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
            <NuxtLink
              v-for="item in portfolio"
              :key="item.id"
              :to="localePath(`/cases/${item.id}`)"
              class="project-card reveal"
              :style="{ '--project-accent': item.accent }"
            >
              <div class="project-visual">
                <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="project-image">
                <div v-else class="project-art" :data-monogram="item.title.slice(0, 1)" />
                <span class="project-tag">{{ item.category }}</span>
              </div>
              <div class="project-meta">
                <div><h3>{{ item.title }}</h3><p>{{ projectSummary(item) }}</p></div>
                <span class="project-year">{{ item.year }}</span>
              </div>
            </NuxtLink>
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

      <section id="problems" class="section problems-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">04 / SYSTEM AUDIT</p>
              <h2 class="section-title">{{ t('businessProblems.title') }}</h2>
            </div>
          </div>
          <div class="info-grid">
            <article v-for="(item, index) in businessProblems" :key="index" class="info-card reveal">
              <div class="info-card-top">
                <span>{{ itemNumber(index) }}</span>
                <Check :size="18" />
              </div>
              <h3>{{ item.problem }}</h3>
              <p>{{ item.solution }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="workflow" class="section workflow-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">05 / AI WORKFLOW</p>
              <h2 class="section-title">{{ t('aiWorkflow.title') }}</h2>
            </div>
            <p class="section-note">{{ t('aiWorkflow.intro') }}</p>
          </div>
          <div class="workflow-grid reveal" aria-label="Business sectors">
            <span v-for="(sector, index) in aiSectors" :key="index" class="workflow-tag">
              <b>{{ itemNumber(index) }}</b>{{ sector }}
            </span>
          </div>
          <div class="workflow-showcase">
            <div class="workflow-examples">
              <article v-for="(text, index) in workflowExamples" :key="index" class="workflow-example reveal">
                <div class="workflow-example-marker"><span>{{ itemNumber(index) }}</span></div>
                <div>
                  <h3>{{ aiSectors[index] }}</h3>
                  <p>{{ text }}</p>
                </div>
              </article>
            </div>
            <aside class="workflow-steps reveal">
              <p class="workflow-steps-label">CRM + AI / LIVE FLOW</p>
              <h3>{{ t('aiWorkflow.intro') }}</h3>
              <ol>
                <li v-for="(step, index) in aiSteps" :key="index">
                  <span>{{ itemNumber(index) }}</span>{{ step }}
                </li>
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <section id="advantages" class="section advantages-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">06 / CUSTOM BUILD</p>
              <h2 class="section-title">{{ t('advantages.title') }}</h2>
            </div>
          </div>
          <div class="advantages-grid">
            <article v-for="(item, index) in advantages" :key="index" class="feature-card reveal">
              <span class="feature-number">{{ itemNumber(index) }}</span>
              <p>{{ item }}</p>
              <span class="feature-check"><Check :size="17" /></span>
            </article>
          </div>
        </div>
      </section>

      <section id="timeline" class="section timeline-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">07 / ROADMAP</p>
              <h2 class="section-title">{{ t('timeline.title') }}</h2>
            </div>
          </div>
          <div class="timeline-grid timeline-track">
            <article v-for="(item, index) in timeline" :key="index" class="timeline-card reveal">
              <div class="timeline-node"><span>{{ itemNumber(index) }}</span></div>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="technologies" class="section technologies-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">08 / TECHNOLOGY</p>
              <h2 class="section-title">{{ t('technologies.title') }}</h2>
            </div>
          </div>
          <div class="tech-list reveal" aria-label="Technology stack">
            <span v-for="(tech, index) in technologies" :key="index" class="tech-item">
              <i />{{ tech }}<small>{{ itemNumber(index) }}</small>
            </span>
          </div>
        </div>
      </section>

      <section id="faq" class="section faq-section">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <p class="section-kicker">09 / FAQ</p>
              <h2 class="section-title">{{ t('faq.title') }}</h2>
            </div>
          </div>
          <div class="faq-list">
            <details v-for="(item, index) in faqItems" :key="index" class="faq-item reveal" :open="index === 0">
              <summary>
                <span class="faq-number">{{ itemNumber(index) }}</span>
                <h3>{{ item.question }}</h3>
                <span class="faq-toggle"><ChevronDown :size="20" /></span>
              </summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" class="cta-section">
        <div class="container">
          <div class="cta-card reveal">
            <img class="cta-watermark" src="/brand/logo.png" alt="" aria-hidden="true">
            <div class="cta-top"><span>{{ t('contact.question') }}</span><span>{{ t('contact.availability') }}</span></div>
            <div class="cta-layout">
              <div class="cta-copy">
                <h2 class="cta-title">{{ t('contact.title') }}</h2>
                <p>{{ t('contact.description') }}</p>
                <a class="cta-link" href="mailto:hello@seokont.com">hello@seokont.com <ArrowUpRight :size="24" /></a>
              </div>
              <form class="contact-form" @submit.prevent="submitContact">
                <div class="contact-fields contact-fields-two">
                  <label>
                    <span>{{ t('contact.form.name') }} *</span>
                    <input v-model.trim="contactForm.name" name="name" autocomplete="name" required>
                  </label>
                  <label>
                    <span>{{ t('contact.form.phone') }} *</span>
                    <input v-model.trim="contactForm.phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
                  </label>
                </div>
                <div class="contact-fields contact-fields-two">
                  <label>
                    <span>{{ t('contact.form.email') }}</span>
                    <input v-model.trim="contactForm.email" name="email" type="email" autocomplete="email">
                  </label>
                  <label>
                    <span>{{ t('contact.form.messenger') }}</span>
                    <input v-model.trim="contactForm.messenger" name="messenger" autocomplete="off">
                  </label>
                </div>
                <label>
                  <span>{{ t('contact.form.type') }} *</span>
                  <select v-model="contactForm.type" name="type" required>
                    <option disabled value="">{{ t('contact.form.type') }}</option>
                    <option v-for="projectType in projectTypes" :key="projectType" :value="projectType">{{ projectType }}</option>
                  </select>
                </label>
                <label>
                  <span>{{ t('contact.form.description') }} *</span>
                  <textarea v-model.trim="contactForm.message" name="message" rows="4" required></textarea>
                </label>
                <button class="contact-submit" type="submit" :disabled="formStatus === 'loading'">
                  <span>{{ formStatus === 'loading' ? t('contact.form.sending') : t('contact.form.submit') }}</span>
                  <Send :size="19" />
                </button>
                <p v-if="formStatus === 'success'" class="form-message success" role="status">{{ t('contact.form.success') }}</p>
                <p v-else-if="formStatus === 'error'" class="form-message error" role="alert">{{ t('contact.form.error') }}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>
