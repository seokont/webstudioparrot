<script setup lang="ts">
import { ArrowLeft, LogOut, Trash2, UploadCloud } from '@lucide/vue'
import type { PortfolioItem } from '~/types/portfolio'

definePageMeta({ layout: false })
useSeoMeta({ title: 'Админка — SEOKONT', robots: 'noindex, nofollow' })

const { data: session, refresh: refreshSession } = await useFetch('/api/admin/session', { default: () => ({ authenticated: false }) })
const authenticated = computed(() => Boolean(session.value?.authenticated))
const items = ref<PortfolioItem[]>([])
const loginForm = reactive({ username: 'admin', password: '' })
const projectForm = reactive({ title: '', category: 'WEB / DESIGN', summary: '', year: String(new Date().getFullYear()), accent: '#d7ff45' })
const imageFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const loginError = ref('')
const formError = ref('')
const isLoggingIn = ref(false)
const isSaving = ref(false)

async function loadItems() {
  items.value = await $fetch<PortfolioItem[]>('/api/portfolio')
}

if (authenticated.value) await loadItems()

async function login() {
  loginError.value = ''
  isLoggingIn.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: loginForm })
    await refreshSession()
    await loadItems()
  } catch (error: any) {
    loginError.value = error?.data?.statusMessage || 'Не удалось войти'
  } finally { isLoggingIn.value = false }
}

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  session.value = { authenticated: false }
  loginForm.password = ''
}

function selectFile(event: Event) {
  imageFile.value = (event.target as HTMLInputElement).files?.[0] || null
}

function dropFile(event: DragEvent) {
  imageFile.value = event.dataTransfer?.files?.[0] || null
}

async function addProject() {
  formError.value = ''
  isSaving.value = true
  try {
    const body = new FormData()
    Object.entries(projectForm).forEach(([key, value]) => body.append(key, value))
    if (imageFile.value) body.append('image', imageFile.value)
    const item = await $fetch<PortfolioItem>('/api/admin/portfolio', { method: 'POST', body })
    items.value.unshift(item)
    Object.assign(projectForm, { title: '', category: 'WEB / DESIGN', summary: '', year: String(new Date().getFullYear()), accent: '#d7ff45' })
    imageFile.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (error: any) {
    formError.value = error?.data?.statusMessage || 'Не удалось сохранить проект'
  } finally { isSaving.value = false }
}

async function removeProject(item: PortfolioItem) {
  if (!confirm(`Удалить проект «${item.title}»?`)) return
  await $fetch(`/api/admin/portfolio/${encodeURIComponent(item.id)}`, { method: 'DELETE' })
  items.value = items.value.filter(entry => entry.id !== item.id)
}
</script>

<template>
  <div class="admin-page">
    <header class="admin-topbar">
      <NuxtLink to="/" class="brand admin-brand"><img class="brand-logo" src="/brand/logo.png" alt="SEOKONT"><span>/ ADMIN</span></NuxtLink>
      <NuxtLink v-if="!authenticated" to="/" class="text-button"><ArrowLeft :size="16" style="vertical-align: -3px" /> На сайт</NuxtLink>
      <button v-else class="text-button" type="button" @click="logout"><LogOut :size="16" style="vertical-align: -3px" /> Выйти</button>
    </header>

    <main v-if="!authenticated" class="admin-login">
      <p class="section-kicker">Закрытый раздел</p>
      <h1>Вход в админку</h1>
      <p>Здесь вы можете управлять проектами, которые отображаются в портфолио.</p>
      <form class="form-stack" @submit.prevent="login">
        <div class="field"><label for="username">Логин</label><input id="username" v-model="loginForm.username" autocomplete="username" required></div>
        <div class="field"><label for="password">Пароль</label><input id="password" v-model="loginForm.password" type="password" autocomplete="current-password" required></div>
        <p v-if="loginError" class="error-note">{{ loginError }}</p>
        <button class="button" type="submit" :disabled="isLoggingIn">{{ isLoggingIn ? 'Проверяем…' : 'Войти' }}</button>
      </form>
    </main>

    <main v-else class="admin-main">
      <div class="admin-heading">
        <div><p class="section-kicker">Portfolio manager</p><h1>Проекты</h1><p>{{ items.length }} проектов опубликовано на сайте</p></div>
        <NuxtLink to="/" class="button secondary"><ArrowLeft :size="17" /> Открыть сайт</NuxtLink>
      </div>

      <div class="admin-grid">
        <section class="admin-panel">
          <h2>Добавить кейс</h2>
          <form class="form-stack" @submit.prevent="addProject">
            <div class="field"><label for="title">Название</label><input id="title" v-model="projectForm.title" placeholder="NOVA SYSTEM" required></div>
            <div class="field"><label for="category">Категория</label><input id="category" v-model="projectForm.category" placeholder="WEB / CRM" required></div>
            <div class="field"><label for="summary">Короткое описание</label><textarea id="summary" v-model="projectForm.summary" placeholder="Что сделали и какой получили результат" required /></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              <div class="field"><label for="year">Год</label><input id="year" v-model="projectForm.year" inputmode="numeric"></div>
              <div class="field"><label for="accent">Цвет карточки</label><input id="accent" v-model="projectForm.accent" type="color" style="padding:6px"></div>
            </div>
            <div class="field">
              <label>Обложка проекта</label>
              <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden @change="selectFile">
              <div class="dropzone" role="button" tabindex="0" @click="fileInput?.click()" @keydown.enter="fileInput?.click()" @dragover.prevent @drop.prevent="dropFile">
                <div><UploadCloud :size="28" style="margin-bottom:10px" /><strong>{{ imageFile ? imageFile.name : 'Загрузить изображение' }}</strong><span>PNG, JPG, WEBP или AVIF · до 8 МБ</span></div>
              </div>
            </div>
            <p v-if="formError" class="error-note">{{ formError }}</p>
            <button class="button" type="submit" :disabled="isSaving">{{ isSaving ? 'Публикуем…' : 'Опубликовать проект' }}</button>
          </form>
        </section>

        <section class="admin-panel">
          <h2>Опубликовано</h2>
          <div class="admin-list">
            <article v-for="item in items" :key="item.id" class="admin-item">
              <div class="admin-thumb" :style="{ '--thumb': item.accent }"><img v-if="item.imageUrl" :src="item.imageUrl" alt=""></div>
              <div><h3>{{ item.title }}</h3><p>{{ item.category }} · {{ item.year }}</p></div>
              <button class="icon-button" type="button" :aria-label="`Удалить ${item.title}`" @click="removeProject(item)"><Trash2 :size="17" /></button>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
