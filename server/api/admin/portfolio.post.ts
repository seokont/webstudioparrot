import type { PortfolioItem } from '~/types/portfolio'
import { requireAdmin } from '../../utils/auth'
import { addPortfolio, formValue, saveMedia } from '../../utils/portfolio-store'

export default defineEventHandler(async event => {
  await requireAdmin(event)
  const parts = await readMultipartFormData(event)
  if (!parts) throw createError({ statusCode: 400, statusMessage: 'Пустая форма' })
  const title = formValue(parts, 'title')
  const category = formValue(parts, 'category')
  const summary = formValue(parts, 'summary')
  const year = formValue(parts, 'year') || String(new Date().getFullYear())
  const accent = formValue(parts, 'accent') || '#d7ff45'
  if (!title || !category || !summary) throw createError({ statusCode: 400, statusMessage: 'Заполните название, категорию и описание' })
  const file = parts.find(part => part.name === 'image' && part.filename)
  const imageKey = file ? await saveMedia(event, file) : null
  const item: PortfolioItem = {
    id: `${title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/(^-|-$)/g, '') || 'project'}-${Date.now().toString(36)}`,
    title,
    category,
    summary,
    year,
    accent: /^#[0-9a-f]{6}$/i.test(accent) ? accent : '#d7ff45',
    imageKey,
    imageUrl: imageKey ? `/api/media/${encodeURIComponent(imageKey)}` : null,
    createdAt: new Date().toISOString()
  }
  await addPortfolio(event, item)
  return item
})
