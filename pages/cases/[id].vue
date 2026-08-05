<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check } from '@lucide/vue'

const route = useRoute()
const { t, te, locale, getLocaleMessage } = useI18n()
const localePath = useLocalePath()
const id = route.params.id as string
const caseSlugs = ['orion-estate', 'pulse-clinic', 'mono-market'] as const

if (!caseSlugs.includes(id as any)) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found' })
}

const messages = computed(() => getLocaleMessage(locale.value) as Record<string, any>)
const caseData = computed(() => messages.value.portfolioCases?.[id] ?? {})
const summary = computed(() => t(`portfolio.items.${id}`))

const taskHeading = computed(() => {
  const titleKey = `portfolioCases.${id}.taskTitle`
  return te(titleKey) ? t(titleKey) : t(`portfolioCases.${id}.task`)
})

const solutionHeading = computed(() => {
  const titleKey = `portfolioCases.${id}.solutionTitle`
  return te(titleKey) ? t(titleKey) : t(`portfolioCases.${id}.solution`)
})

useHead({
  title: t(`portfolioCases.${id}.title`),
  meta: [{ name: 'description', content: t(`portfolioCases.${id}.description`) }]
})
</script>

<template>
  <div class="page-shell case-detail-page">
    <div class="container internal-hero detail-hero reveal">
      <div class="internal-hero-heading">
        <NuxtLink :to="localePath('/cases')" class="back-link"><ArrowLeft :size="17" /> {{ t('nav.projects') }}</NuxtLink>
        <p class="section-kicker">{{ caseData.category }}</p>
        <h1 class="section-title">{{ caseData.title }}</h1>
      </div>
      <p class="internal-hero-note">{{ summary }}</p>
    </div>

    <div class="container">
      <section class="case-detail-grid reveal">
        <div class="case-main">
          <p class="case-description">{{ caseData.description }}</p>
          <div class="case-block">
            <div class="detail-section-heading"><span>01</span><h2>{{ taskHeading }}</h2></div>
            <p>{{ caseData.task }}</p>
          </div>
          <div class="case-block">
            <div class="detail-section-heading"><span>02</span><h2>{{ solutionHeading }}</h2></div>
            <p>{{ caseData.solution }}</p>
          </div>
        </div>

        <aside class="case-sidebar">
          <div class="case-card case-note-card">
            <span class="case-category">CASE NOTE</span>
            <p>{{ caseData.note }}</p>
          </div>
          <div class="case-card">
            <h3>FUNCTIONS</h3>
            <ul>
              <li v-for="(item, index) in caseData.functions" :key="`function-${index}`"><Check :size="15" />{{ item }}</li>
            </ul>
          </div>
          <div class="case-card technology-card">
            <h3>STACK</h3>
            <div class="case-tech-list">
              <span v-for="(item, index) in caseData.technologies" :key="`technology-${index}`">{{ item }}</span>
            </div>
          </div>
        </aside>
      </section>
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
