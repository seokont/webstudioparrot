import { createTransport } from 'nodemailer'
import type { ContactLead } from '~/types/contact'

function clean(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character] || character)
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function sanitizeUtm(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => /^utm_[a-z0-9_]+$/i.test(key))
      .slice(0, 20)
      .map(([key, item]) => [key.slice(0, 80), clean(item, 300)])
  )
}

export default defineEventHandler(async (event) => {
  const rawBody = await readBody(event)
  const body = rawBody && typeof rawBody === 'object' ? rawBody as Record<string, unknown> : {}

  // A filled hidden field is treated as a bot submission without revealing the filter.
  if (clean(body.company, 120)) return { success: true }

  const name = clean(body.name, 120)
  const phone = clean(body.phone, 80)
  const email = clean(body.email, 254).toLowerCase()
  const message = clean(body.message, 5000)
  const type = clean(body.type, 160)

  if (!name || !phone || !message || !type) {
    throw createError({ statusCode: 422, statusMessage: 'Missing required fields' })
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid email address' })
  }

  const lead: ContactLead = {
    name,
    phone,
    email,
    messenger: clean(body.messenger, 160),
    type,
    language: clean(body.language || 'uk', 10),
    message,
    page: clean(body.page, 500),
    utm: sanitizeUtm(body.utm),
    createdAt: new Date().toISOString()
  }

  const config = useRuntimeConfig(event)
  const mailUser = String(config.mailUser || '').trim()
  const mailAppPassword = String(config.mailAppPassword || '').replace(/\s/g, '')
  const recipient = String(config.contactRecipient || 'seokont@gmail.com').trim()

  if (!mailUser || !mailAppPassword || !recipient) {
    throw createError({ statusCode: 503, statusMessage: 'Email service is not configured' })
  }

  const utmText = Object.entries(lead.utm).map(([key, value]) => `${key}: ${value}`).join('\n') || '—'
  const text = [
    'Новая заявка с сайта SEOKONT',
    '',
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Email: ${lead.email || '—'}`,
    `Мессенджер: ${lead.messenger || '—'}`,
    `Тип проекта: ${lead.type}`,
    `Язык: ${lead.language}`,
    `Страница: ${lead.page || '—'}`,
    `Дата: ${lead.createdAt}`,
    '',
    'Сообщение:',
    lead.message,
    '',
    'UTM:',
    utmText
  ].join('\n')

  const details: Array<[string, string]> = [
    ['Имя', lead.name],
    ['Телефон', lead.phone],
    ['Email', lead.email || '—'],
    ['Мессенджер', lead.messenger || '—'],
    ['Тип проекта', lead.type],
    ['Язык', lead.language],
    ['Страница', lead.page || '—'],
    ['Дата', lead.createdAt]
  ]
  const rows = details.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e6e6e6;color:#666">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e6e6e6;font-weight:600">${escapeHtml(value)}</td>
    </tr>`).join('')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111">
      <h1 style="font-size:24px;margin:0 0 18px">Новая заявка с сайта SEOKONT</h1>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <h2 style="font-size:16px;margin:24px 0 8px">Сообщение</h2>
      <div style="padding:16px;background:#f4f5ef;border-radius:10px;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
      <h2 style="font-size:16px;margin:24px 0 8px">UTM</h2>
      <pre style="padding:16px;background:#f4f5ef;border-radius:10px;white-space:pre-wrap">${escapeHtml(utmText)}</pre>
    </div>`

  const transporter = createTransport({
    service: 'gmail',
    auth: { user: mailUser, pass: mailAppPassword }
  })

  try {
    await transporter.sendMail({
      from: `"SEOKONT website" <${mailUser}>`,
      to: recipient,
      replyTo: lead.email || undefined,
      subject: sanitizeHeader(`Новая заявка SEOKONT — ${lead.type || lead.name}`),
      text,
      html
    })
  } catch {
    console.error('[contact] Email delivery failed')
    throw createError({ statusCode: 502, statusMessage: 'Could not deliver contact request' })
  }

  return { success: true }
})
