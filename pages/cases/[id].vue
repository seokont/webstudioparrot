<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check } from '@lucide/vue'
import type { PortfolioItem } from '~/types/portfolio'

const route = useRoute()
const { t, te, locale, getLocaleMessage } = useI18n()
const localePath = useLocalePath()
const id = route.params.id as string

const { data: portfolio } = await useFetch<PortfolioItem[]>('/api/portfolio', {
  default: () => []
})

const project = computed(() => portfolio.value.find(item => item.id === id) ?? null)
const hasCaseContent = te(`portfolioCases.${id}.title`)

if (!project.value && !hasCaseContent) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found' })
}

const messages = computed(() => getLocaleMessage(locale.value) as Record<string, any>)
const caseData = computed(() => messages.value.portfolioCases?.[id] ?? {})

const caseTitle = computed(() => caseData.value.title || project.value?.title || '')
const caseCategory = computed(() => caseData.value.category || project.value?.category || '')
const caseDescription = computed(() => caseData.value.description || project.value?.summary || '')
const summary = computed(() => {
  const key = `portfolio.items.${id}`
  return te(key) ? t(key) : project.value?.summary || caseDescription.value
})

const taskHeading = computed(() => {
  const titleKey = `portfolioCases.${id}.taskTitle`
  return te(titleKey) ? t(titleKey) : t(`portfolioCases.${id}.task`)
})

const solutionHeading = computed(() => {
  const titleKey = `portfolioCases.${id}.solutionTitle`
  return te(titleKey) ? t(titleKey) : t(`portfolioCases.${id}.solution`)
})

useHead({
  title: () => caseTitle.value,
  meta: [
    { name: 'description', content: () => caseDescription.value },
    { property: 'og:title', content: () => caseTitle.value },
    { property: 'og:description', content: () => caseDescription.value }
  ]
})
</script>

<template>
  <div class="page-shell case-detail-page">
    <div class="container internal-hero detail-hero reveal">
      <div class="internal-hero-heading">
        <NuxtLink :to="localePath('/cases')" class="back-link"><ArrowLeft :size="17" /> {{ t('nav.projects') }}</NuxtLink>
        <p class="section-kicker">{{ caseCategory }}</p>
        <h1 class="section-title">{{ caseTitle }}</h1>
      </div>
      <p class="internal-hero-note">{{ summary }}</p>
    </div>

    <figure v-if="project?.imageUrl" class="container case-cover reveal">
      <img
        :src="project.imageUrl"
        :alt="`${caseTitle} — ${caseCategory}`"
        loading="lazy"
        decoding="async"
      >
      <figcaption>
        <span>{{ caseCategory }}</span>
        <span v-if="project?.year">{{ project.year }}</span>
        <span>SEOKONT / CONCEPT CASE</span>
      </figcaption>
    </figure>

    <div class="container">
      <section class="case-detail-grid reveal">
        <div class="case-main">
          <p class="case-description">{{ caseDescription }}</p>
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
