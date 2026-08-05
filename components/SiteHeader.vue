<script setup lang="ts">
import { ArrowUpRight, Menu, X } from '@lucide/vue'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const menuOpen = ref(false)

const languages = [
  { code: 'uk', label: 'UA', name: 'Українська', dir: 'ltr' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'he', label: 'HE', name: 'עברית', dir: 'rtl' }
] as const

const navItems = computed(() => [
  { key: 'services', label: t('nav.services') },
  { key: 'work', label: t('nav.projects') },
  { key: 'process', label: t('nav.approach') },
  { key: 'faq', label: t('nav.faq') }
])

function sectionLink(hash: string) {
  return { path: localePath('/'), hash: `#${hash}` }
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

watch(() => route.fullPath, closeMenu)
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="site-header">
    <nav class="container nav-shell" :aria-label="t('nav.home')">
      <NuxtLink :to="localePath('/')" class="brand" :aria-label="t('nav.home')" @click="closeMenu">
        <img class="brand-logo" src="/brand/logo.png" alt="SEOKONT">
      </NuxtLink>

      <div class="nav-links">
        <NuxtLink v-for="item in navItems" :key="item.key" :to="sectionLink(item.key)">
          {{ item.label }}
        </NuxtLink>
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
        <NuxtLink :to="sectionLink('contact')" class="nav-cta">
          {{ t('nav.discuss') }} <ArrowUpRight :size="16" />
        </NuxtLink>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </nav>

    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-navigation" class="container mobile-navigation">
        <NuxtLink v-for="(item, index) in navItems" :key="item.key" :to="sectionLink(item.key)" @click="closeMenu">
          <span>0{{ index + 1 }}</span>{{ item.label }}
        </NuxtLink>
        <NuxtLink :to="sectionLink('contact')" class="mobile-navigation-cta" @click="closeMenu">
          {{ t('nav.discuss') }} <ArrowUpRight :size="20" />
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>
