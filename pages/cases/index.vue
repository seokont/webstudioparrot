<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { PortfolioItem } from '~/types/portfolio'
const { t, te } = useI18n()
const localePath = useLocalePath()
const { data: portfolio } = await useFetch<PortfolioItem[]>('/api/portfolio', {
  default: () => []
})

function projectSummary(item: PortfolioItem) {
  const key = `portfolio.items.${item.id}`
  return te(key) ? t(key) : item.summary
}

useHead({
  title: t('portfolio.kicker'),
  meta: [{ name: 'description', content: t('portfolio.note') }]
})
</script>

<template>
  <div class="page-shell cases-list-page">
    <div class="container internal-hero reveal">
      <div class="internal-hero-heading">
        <p class="section-kicker">{{ t('portfolio.kicker') }}</p>
        <h1 class="section-title">{{ t('portfolio.title1') }}<br>{{ t('portfolio.title2') }}</h1>
      </div>
      <p class="internal-hero-note">{{ t('portfolio.note') }}</p>
    </div>

    <section class="internal-content-section internal-portfolio-section">
      <div class="container">
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
