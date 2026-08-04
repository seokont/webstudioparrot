import { getMedia } from '../../utils/portfolio-store'

export default defineEventHandler(async event => {
  const key = getRouterParam(event, 'key') || ''
  const media = await getMedia(event, key)
  if (!media) throw createError({ statusCode: 404, statusMessage: 'Файл не найден' })
  setHeader(event, 'content-type', media.type)
  setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
  return media.body
})
