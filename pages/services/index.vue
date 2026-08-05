<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

const { t } = useI18n()
const localePath = useLocalePath()
const serviceSlugs = ['web-development', 'crm-development', 'ai-automation'] as const
const services = computed(() => serviceSlugs.map((slug) => ({
  slug,
  title: t(`servicePages.${slug}.title`),
  subtitle: t(`servicePages.${slug}.subtitle`),
  deck: t(`servicePages.${slug}.solution`)
})))

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description')
})
</script>

<template>
  <div class="page-shell service-list-page">
    <div class="container internal-hero reveal">
      <div class="internal-hero-heading">
        <p class="section-kicker">{{ t('services.kicker') }}</p>
        <h1 class="section-title">{{ t('services.title1') }}<br>{{ t('services.title2') }}</h1>
      </div>
      <p class="internal-hero-note">{{ t('services.note') }}</p>
    </div>

    <section class="container internal-content-section">
      <div class="service-card-grid">
        <NuxtLink
          v-for="(service, index) in services"
          :key="service.slug"
          :to="localePath(`/services/${service.slug}`)"
          class="service-card reveal"
        >
          <span class="service-card-number">0{{ index + 1 }}</span>
          <div class="service-card-body">
            <h2>{{ service.title }}</h2>
            <p>{{ service.subtitle }}</p>
            <p class="service-card-deck">{{ service.deck }}</p>
          </div>
          <span class="service-card-action"><ArrowUpRight :size="24" /></span>
        </NuxtLink>
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
