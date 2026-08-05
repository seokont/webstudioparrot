import { addContactLead } from '../utils/contact-store'
import type { ContactLead } from '~/types/contact'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Record<string, any>
  const name = String(body.name || '').trim()
  const phone = String(body.phone || '').trim()
  const message = String(body.message || '').trim()

  if (!name || !phone || !message) {
    throw createError({ statusCode: 422, statusMessage: 'Missing required fields' })
  }

  const lead: ContactLead = {
    name,
    phone,
    email: String(body.email || '').trim(),
    messenger: String(body.messenger || '').trim(),
    type: String(body.type || '').trim(),
    language: String(body.language || 'uk').trim(),
    message,
    page: String(body.page || '').trim(),
    utm: typeof body.utm === 'object' && body.utm ? body.utm : {},
    createdAt: new Date().toISOString()
  }

  await addContactLead(lead)
  console.info('[contact] New lead saved', { name: lead.name, phone: lead.phone, type: lead.type, page: lead.page })

  return { success: true }
})
