<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="footer">
    <div class="container footer-main">
      <NuxtLink :to="localePath('/')" class="footer-logo" :aria-label="t('nav.home')">
        <img src="/brand/logo.png" alt="SEOKONT">
      </NuxtLink>
      <nav class="footer-nav" :aria-label="t('footer.rights')">
        <NuxtLink :to="{ path: localePath('/'), hash: '#services' }">{{ t('nav.services') }}</NuxtLink>
        <NuxtLink :to="{ path: localePath('/'), hash: '#work' }">{{ t('nav.projects') }}</NuxtLink>
        <NuxtLink :to="{ path: localePath('/'), hash: '#process' }">{{ t('nav.approach') }}</NuxtLink>
        <NuxtLink :to="{ path: localePath('/'), hash: '#faq' }">{{ t('nav.faq') }}</NuxtLink>
      </nav>
      <a class="footer-email" href="mailto:hello@seokont.com">
        hello@seokont.com <ArrowUpRight :size="18" />
      </a>
    </div>
    <div class="container footer-row">
      <span>© {{ new Date().getFullYear() }} {{ t('footer.rights') }}</span>
      <span>{{ t('footer.services') }}</span>
      <NuxtLink :to="localePath('/admin')">ADMIN ↗</NuxtLink>
    </div>
  </footer>
</template>
