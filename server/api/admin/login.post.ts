import { createAdminSession, credentialsAreValid } from '../../utils/auth'

export default defineEventHandler(async event => {
  const body = await readBody<{ username?: string; password?: string }>(event)
  if (!await credentialsAreValid(body.username || '', body.password || '')) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }
  await createAdminSession(event)
  return { ok: true }
})
