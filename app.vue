<script setup lang="ts">
const route = useRoute()
const isAdminRoute = computed(() => /^\/(?:(?:uk|en|he)\/)?admin(?:\/|$)/.test(route.path))

let revealObserver: IntersectionObserver | null = null

async function observeReveals() {
  if (import.meta.server || isAdminRoute.value) return

  await nextTick()
  revealObserver?.disconnect()
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -32px' })

  document.querySelectorAll('.reveal').forEach(element => revealObserver?.observe(element))
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
