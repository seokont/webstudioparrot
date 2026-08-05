<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check } from '@lucide/vue'

const route = useRoute()
const { t, locale, getLocaleMessage } = useI18n()
const localePath = useLocalePath()
const slug = route.params.slug as string
const serviceSlugs = ['web-development', 'crm-development', 'ai-automation'] as const

if (!serviceSlugs.includes(slug as any)) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

const messages = computed(() => getLocaleMessage(locale.value) as Record<string, any>)
const serviceData = computed(() => messages.value.servicePages?.[slug] ?? {})
const caseMap = {
  'web-development': 'orion-estate',
  'crm-development': 'pulse-clinic',
  'ai-automation': 'mono-market'
} as const
const caseSlug = caseMap[slug as keyof typeof caseMap]
const caseData = computed(() => messages.value.portfolioCases?.[caseSlug] ?? {})
const caseSummary = computed(() => t(`portfolio.items.${caseSlug}`))

function itemNumber(index: string | number) {
  return String(Number(index) + 1).padStart(2, '0')
}

useHead({
  title: t(`servicePages.${slug}.seo.title`),
  meta: [{ name: 'description', content: t(`servicePages.${slug}.seo.description`) }]
})
</script>

<template>
  <div class="page-shell service-detail-page">
    <div class="container internal-hero detail-hero reveal">
      <div class="internal-hero-heading">
        <NuxtLink :to="localePath('/services')" class="back-link"><ArrowLeft :size="17" /> {{ t('nav.services') }}</NuxtLink>
        <p class="section-kicker">{{ t('services.kicker') }}</p>
        <h1 class="section-title">{{ serviceData.title }}</h1>
      </div>
      <p class="internal-hero-note">{{ serviceData.subtitle }}</p>
    </div>

    <div class="container detail-layout">
      <div class="detail-main">
        <section class="detail-section reveal">
          <div class="detail-section-heading"><span>01</span><h2>{{ t(`servicePages.${slug}.problemTitle`) }}</h2></div>
          <ul class="feature-list feature-list-grid">
            <li v-for="(item, index) in serviceData.problems" :key="`problem-${index}`"><Check :size="17" />{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section solution-panel reveal">
          <div class="detail-section-heading"><span>02</span><h2>{{ t(`servicePages.${slug}.solutionTitle`) }}</h2></div>
          <p>{{ serviceData.solution }}</p>
        </section>

        <section class="detail-section reveal">
          <div class="detail-section-heading"><span>03</span><h2>{{ t(`servicePages.${slug}.featuresTitle`) }}</h2></div>
          <ul class="feature-list feature-pills">
            <li v-for="(item, index) in serviceData.features" :key="`feature-${index}`">{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section reveal">
          <div class="detail-section-heading"><span>04</span><h2>{{ t(`servicePages.${slug}.audienceTitle`) }}</h2></div>
          <ul class="feature-list audience-list">
            <li v-for="(item, index) in serviceData.audience" :key="`audience-${index}`"><span>{{ itemNumber(index) }}</span>{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section reveal">
          <div class="detail-section-heading"><span>05</span><h2>{{ t(`servicePages.${slug}.stageTitle`) }}</h2></div>
          <ol class="stage-list">
            <li v-for="(item, index) in serviceData.stages" :key="`stage-${index}`"><span>{{ itemNumber(index) }}</span>{{ item }}</li>
          </ol>
        </section>
      </div>

      <aside class="case-example reveal">
        <p class="case-example-label">06 / CASE STUDY</p>
        <h2>{{ t(`servicePages.${slug}.caseTitle`) }}</h2>
        <NuxtLink :to="localePath(`/cases/${caseSlug}`)" class="case-card case-card-link">
          <div class="case-card-meta">
            <span class="case-category">{{ caseData.category }}</span>
            <h3>{{ caseData.title }}</h3>
            <p>{{ caseSummary }}</p>
          </div>
          <p class="case-note">{{ t(`servicePages.${slug}.caseNote`) }}</p>
          <span class="case-card-action"><ArrowUpRight :size="22" /></span>
        </NuxtLink>
      </aside>
    </div>

    <section class="container internal-cta reveal">
      <div>
        <span>{{ t('contact.question') }}</span>
        <h2>{{ t('contact.title') }}</h2>
      </div>
      <NuxtLink :to="{ path: localePath('/'), hash: '#contact' }" class="button">
        {{ t('nav.discuss') }} <ArrowUpRight :size="18" />
      </NuxtLink>
    </section>
  </div>
</template>
