import { requireAdmin } from '../../../utils/auth'
import { removePortfolio } from '../../../utils/portfolio-store'

export default defineEventHandler(async event => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Не указан проект' })
  await removePortfolio(event, id)
  return { ok: true }
})
