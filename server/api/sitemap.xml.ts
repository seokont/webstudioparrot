export default defineEventHandler((event) => {
  const requestUrl = useRequestURL()
  const origin = requestUrl.origin
  const locales = ['uk', 'en', 'he']
  const serviceSlugs = ['web-development', 'crm-development', 'ai-automation', 'ai-agents', 'integrations']
  const portfolioSlugs = ['orion-estate', 'pulse-clinic', 'mono-market']
  const pages = ['/', '/thank-you', '/services', '/portfolio']

  const routes = [
    ...pages,
    ...serviceSlugs.map(slug => `/services/${slug}`),
    ...portfolioSlugs.map(slug => `/portfolio/${slug}`)
  ]

  const lastmod = new Date().toISOString().slice(0, 10)
  const urlSet = locales.flatMap(locale => routes.map(route => ({
    loc: `${origin}/${locale}${route}`.replace(/\/\/+/g, '/'),
    lastmod
  })))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet.map(item => `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')}\n</urlset>`

  event.node.res.setHeader('content-type', 'application/xml; charset=utf-8')
  return xml
})
