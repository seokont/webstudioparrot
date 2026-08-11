<script setup lang="ts">
const route = useRoute()
const isAdminRoute = computed(() => /^\/(?:(?:uk|en|he)\/)?admin(?:\/|$)/.test(route.path))

let revealObserver: IntersectionObserver | null = null

async function observeReveals() {
  if (import.meta.server || isAdminRoute.value) return

  await nextTick()
  revealObserver?.disconnect()
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
  const groupIndexes = new Map<Element, number>()

  revealElements.forEach((element) => {
    const parent = element.parentElement
    const groupIndex = parent ? (groupIndexes.get(parent) ?? 0) : 0
    if (parent) groupIndexes.set(parent, groupIndex + 1)

    element.style.setProperty('--reveal-delay', `${Math.min(groupIndex * 85, 340)}ms`)

    if (element.matches('.project-card, .info-card, .feature-card, .timeline-card, .service-card')) {
      element.dataset.reveal = 'card'
    } else if (element.matches('.service-row, .process-item, .workflow-example, .faq-item, .detail-section')) {
      element.dataset.reveal = 'line'
    } else if (element.matches('.section-head, .internal-hero, .process-sticky')) {
      element.dataset.reveal = 'heading'
    } else if (element.matches('.workflow-grid, .workflow-steps, .tech-list, .case-example, .case-detail-grid, .cta-card, .internal-cta')) {
      element.dataset.reveal = 'panel'
    }
  })

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, { threshold: 0.11, rootMargin: '0px 0px -44px' })

  revealElements.forEach(element => revealObserver?.observe(element))
}

onMounted(observeReveals)
watch(() => route.fullPath, observeReveals)
onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <div :class="{ 'public-site': !isAdminRoute }">
    <NuxtRouteAnnouncer />
    <SiteHeader v-if="!isAdminRoute" />
    <NuxtPage />
    <SiteFooter v-if="!isAdminRoute" />
  </div>
</template>
