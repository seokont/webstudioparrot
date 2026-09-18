import type { H3Event, MultiPartData } from 'h3'
import type { PortfolioItem } from '~/types/portfolio'

interface D1Result<T> { results?: T[] }
interface D1Statement {
  bind: (...values: unknown[]) => D1Statement
  all: <T>() => Promise<D1Result<T>>
  run: () => Promise<unknown>
}
interface D1Database { prepare: (query: string) => D1Statement; batch: (statements: D1Statement[]) => Promise<unknown> }
interface R2Bucket { put: (key: string, value: Uint8Array, options?: unknown) => Promise<unknown>; get: (key: string) => Promise<any>; delete: (key: string) => Promise<unknown> }
interface CloudBindings { DB?: D1Database; FILES?: R2Bucket }

const seed: PortfolioItem[] = [
  { id: 'orion-estate', title: 'ORION ESTATE', category: 'WEB / CRM', summary: 'Сайт премиальной недвижимости с автоматическим распределением лидов между брокерами.', year: '2026', accent: '#d7ff45', imageKey: null, imageUrl: '/projects/orion-estate.svg', createdAt: '2026-07-20T10:00:00.000Z' },
  { id: 'pulse-clinic', title: 'PULSE CLINIC', category: 'PRODUCT / AI', summary: 'Цифровая запись и AI-ассистент, который отвечает пациентам круглосуточно.', year: '2026', accent: '#9b8cff', imageKey: null, imageUrl: '/projects/pulse-clinic.svg', createdAt: '2026-06-11T10:00:00.000Z' },
  { id: 'axiom-logistics', title: 'AXIOM LOGISTICS', category: 'LOGISTICS / AI', summary: 'Диспетчерська CRM з AI-пріоритезацією рейсів і кабінетом водія.', year: '2026', accent: '#4ad9ff', imageKey: null, imageUrl: '/projects/axiom-logistics.svg', createdAt: '2026-05-14T10:00:00.000Z' },
  { id: 'lumen-edu', title: 'LUMEN EDU', category: 'EDTECH / CRM', summary: 'CRM онлайн-школи з AI-куратором і аналітикою утримання студентів.', year: '2026', accent: '#7dffb0', imageKey: null, imageUrl: '/projects/lumen-edu.svg', createdAt: '2026-03-08T10:00:00.000Z' },
  { id: 'mono-market', title: 'MONO MARKET', category: 'E-COM / AUTOMATION', summary: 'Магазин с единой системой заказов, складом и автоматическими сценариями продаж.', year: '2025', accent: '#ff6b4a', imageKey: null, imageUrl: '/projects/mono-market.svg', createdAt: '2025-12-03T10:00:00.000Z' },
  { id: 'nord-build', title: 'NORD BUILD', category: 'CONSTRUCTION / AI', summary: 'Кошториси, об’єкти та платежі в одній системі з AI-прорахунком вартості.', year: '2025', accent: '#ffd24a', imageKey: null, imageUrl: '/projects/nord-build.svg', createdAt: '2025-09-22T10:00:00.000Z' }
]

function bindings(event: H3Event): CloudBindings {
  return ((event.context as any).cloudflare?.env || (event.context as any).env || {}) as CloudBindings
}

async function ensureCloudDatabase(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS portfolio (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      summary TEXT NOT NULL,
      year TEXT NOT NULL,
      accent TEXT NOT NULL,
      image_key TEXT,
      image_url TEXT,
      created_at TEXT NOT NULL
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS portfolio_created_at_idx ON portfolio(created_at DESC)')
  ])
  try { await db.prepare('ALTER TABLE portfolio ADD COLUMN image_url TEXT').run() } catch {}
  const count = await db.prepare('SELECT id FROM portfolio LIMIT 1').all<{ id: string }>()
  if (!count.results?.length) {
    await db.batch(seed.map(item => db.prepare(
      'INSERT INTO portfolio (id, title, category, summary, year, accent, image_key, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(item.id, item.title, item.category, item.summary, item.year, item.accent, null, item.imageUrl || null, item.createdAt)))
  }
}

function fromRow(row: any): PortfolioItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    summary: row.summary,
    year: row.year,
    accent: row.accent,
    imageKey: row.image_key || null,
    imageUrl: row.image_key
      ? `/api/media/${encodeURIComponent(row.image_key)}`
      : row.image_url || null,
    createdAt: row.created_at
  }
}

async function localPaths() {
  const { promises: fs } = await import('node:fs')
  const { resolve } = await import('node:path')
  const dataDir = resolve(process.cwd(), '.data')
  const uploadDir = resolve(dataDir, 'uploads')
  const dataFile = resolve(dataDir, 'portfolio.json')
  await fs.mkdir(uploadDir, { recursive: true })
  try { await fs.access(dataFile) } catch { await fs.writeFile(dataFile, JSON.stringify(seed, null, 2), 'utf8') }
  return { fs, resolve, dataDir, uploadDir, dataFile }
}

async function readLocal() {
  const { fs, dataFile } = await localPaths()
  return JSON.parse(await fs.readFile(dataFile, 'utf8')) as PortfolioItem[]
}

async function writeLocal(items: PortfolioItem[]) {
  const { fs, dataFile } = await localPaths()
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), 'utf8')
}

export async function listPortfolio(event: H3Event) {
  const { DB } = bindings(event)
  if (DB) {
    await ensureCloudDatabase(DB)
    const rows = await DB.prepare('SELECT * FROM portfolio ORDER BY created_at DESC').all<any>()
    return (rows.results || []).map(fromRow)
  }
  const items = await readLocal()
  return items.map(item => ({ ...item, imageUrl: item.imageKey ? `/api/media/${encodeURIComponent(item.imageKey)}` : item.imageUrl || null }))
}

export async function addPortfolio(event: H3Event, item: PortfolioItem) {
  const { DB } = bindings(event)
  if (DB) {
    await ensureCloudDatabase(DB)
    await DB.prepare('INSERT INTO portfolio (id, title, category, summary, year, accent, image_key, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(item.id, item.title, item.category, item.summary, item.year, item.accent, item.imageKey || null, item.imageKey ? null : item.imageUrl || null, item.createdAt).run()
    return
  }
  const items = await readLocal()
  items.unshift(item)
  await writeLocal(items)
}

export async function removePortfolio(event: H3Event, id: string) {
  const { DB } = bindings(event)
  if (DB) {
    await ensureCloudDatabase(DB)
    const row = await DB.prepare('SELECT image_key FROM portfolio WHERE id = ?').bind(id).all<{ image_key?: string }>()
    const imageKey = row.results?.[0]?.image_key
    await DB.prepare('DELETE FROM portfolio WHERE id = ?').bind(id).run()
    if (imageKey) await deleteMedia(event, imageKey)
    return
  }
  const items = await readLocal()
  const item = items.find(entry => entry.id === id)
  await writeLocal(items.filter(entry => entry.id !== id))
  if (item?.imageKey) await deleteMedia(event, item.imageKey)
}

export function formValue(parts: MultiPartData[], name: string) {
  const part = parts.find(entry => entry.name === name)
  return part?.data ? part.data.toString('utf8').trim() : ''
}

export async function saveMedia(event: H3Event, file: MultiPartData) {
  if (!file.filename || !file.type?.startsWith('image/') || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Разрешены только изображения' })
  }
  if (file.data.byteLength > 8 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'Изображение должно быть меньше 8 МБ' })
  }
  const extension = file.filename.split('.').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg'
  const key = `${Date.now()}-${crypto.randomUUID()}.${extension}`
  const { FILES } = bindings(event)
  if (FILES) {
    await FILES.put(key, new Uint8Array(file.data), { httpMetadata: { contentType: file.type } })
  } else {
    const { fs, resolve, uploadDir } = await localPaths()
    await fs.writeFile(resolve(uploadDir, key), file.data)
    await fs.writeFile(resolve(uploadDir, `${key}.type`), file.type, 'utf8')
  }
  return key
}

export async function getMedia(event: H3Event, key: string) {
  const { FILES } = bindings(event)
  if (FILES) {
    const object = await FILES.get(key)
    if (!object) return null
    return { body: object.body, type: object.httpMetadata?.contentType || 'application/octet-stream' }
  }
  const { fs, resolve, uploadDir } = await localPaths()
  const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '')
  try {
    const [body, type] = await Promise.all([
      fs.readFile(resolve(uploadDir, safeKey)),
      fs.readFile(resolve(uploadDir, `${safeKey}.type`), 'utf8').catch(() => 'image/jpeg')
    ])
    return { body, type }
  } catch { return null }
}

async function deleteMedia(event: H3Event, key: string) {
  const { FILES } = bindings(event)
  if (FILES) { await FILES.delete(key); return }
  const { fs, resolve, uploadDir } = await localPaths()
  const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '')
  await Promise.all([
    fs.unlink(resolve(uploadDir, safeKey)).catch(() => {}),
    fs.unlink(resolve(uploadDir, `${safeKey}.type`)).catch(() => {})
  ])
}
