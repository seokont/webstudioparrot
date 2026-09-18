/**
 * Photographic scene renderer for portfolio covers.
 *
 * Everything is emitted as a self-contained SVG: no external assets, no photos.
 * Realism comes from materials (brushed aluminium, glass, matte deck),
 * three-point studio lighting, depth of field, screen glare, contact shadows,
 * a table-top reflection and film grain.
 */

export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
export const SANS = "Inter, 'Helvetica Neue', Arial, sans-serif"

const n = (v) => (Number.isInteger(v) ? v : Math.round(v * 100) / 100)

const XML = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => XML[c])

const ATTR = {
  opacity: 'opacity',
  fillOpacity: 'fill-opacity',
  stroke: 'stroke',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  filter: 'filter',
  transform: 'transform',
  style: 'style',
  mask: 'mask',
  clipPath: 'clip-path',
  fontWeight: 'font-weight',
  letterSpacing: 'letter-spacing',
  textAnchor: 'text-anchor',
  fontFamily: 'font-family',
  fontSize: 'font-size'
}

export function attrs(o = {}) {
  let out = ''
  for (const [k, v] of Object.entries(o)) {
    if (v === undefined || v === null || v === false) continue
    out += ` ${ATTR[k] ?? k}="${v}"`
  }
  return out
}

export const rect = (x, y, w, h, r, fill, o = {}) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(r)}" fill="${fill}"${attrs(o)}/>`

export const circle = (cx, cy, r, fill, o = {}) =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${attrs(o)}/>`

export const ellipse = (cx, cy, rx, ry, fill, o = {}) =>
  `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${attrs(o)}/>`

export const path = (d, o = {}) => `<path d="${d}"${attrs(o)}/>`

export const g = (inner, o = {}) => `<g${attrs(o)}>${inner}</g>`

export function text(x, y, str, o = {}) {
  const { size = 13, fill = '#ffffff', fam = SANS, ...rest } = o
  return `<text x="${n(x)}" y="${n(y)}" font-family="${fam}" font-size="${n(size)}" fill="${fill}"${attrs(rest)}>${esc(str)}</text>`
}

/* ------------------------------------------------------------------ *
 * shared art direction
 * ------------------------------------------------------------------ */

/** Studio backdrop: soft key light, cool fill, out-of-focus highlights. */
function backdrop(accent, fill = '#6fa8ff') {
  const bokeh = [
    [180, 150, 190, accent, 0.5],
    [1040, 240, 150, accent, 0.32],
    [900, 780, 210, fill, 0.3],
    [140, 820, 160, fill, 0.24]
  ]
    .map(([cx, cy, r, color, op]) => circle(cx, cy, r, color, { fillOpacity: op }))
    .join('')

  const sparks = [
    [250, 300, 9, 0.5],
    [330, 210, 6, 0.35],
    [980, 360, 7, 0.4],
    [880, 640, 11, 0.3],
    [1105, 620, 5, 0.35],
    [90, 560, 8, 0.22]
  ]
    .map(([cx, cy, r, op]) => circle(cx, cy, r, '#ffffff', { fillOpacity: op }))
    .join('')

  return [
    rect(0, 0, 1200, 1000, 0, '#06080a'),
    rect(0, 0, 1200, 1000, 0, 'url(#bgGrad)'),
    g(bokeh, { filter: 'url(#bokeh)' }),
    g(sparks, { filter: 'url(#haze)' }),
    rect(0, 0, 1200, 1000, 0, 'url(#keyLight)'),
    rect(0, 0, 1200, 1000, 0, 'url(#fillLight)'),
    // table top
    rect(0, 690, 1200, 310, 0, 'url(#tableTop)'),
    rect(0, 688.5, 1200, 1.5, 0, '#ffffff', { fillOpacity: 0.07 }),
    rect(0, 0, 1200, 1000, 0, 'url(#vignette)')
  ].join('')
}

function sceneDefs(accent, fill) {
  return `<defs>
  <linearGradient id="bgGrad" x1="0.1" y1="0" x2="0.7" y2="1">
    <stop offset="0" stop-color="#12181a"/>
    <stop offset="0.5" stop-color="#0a0f11"/>
    <stop offset="1" stop-color="#04070a"/>
  </linearGradient>
  <radialGradient id="keyLight" cx="0.14" cy="0.06" r="0.72">
    <stop offset="0" stop-color="${accent}" stop-opacity="0.36"/>
    <stop offset="0.42" stop-color="${accent}" stop-opacity="0.09"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="fillLight" cx="0.92" cy="0.9" r="0.66">
    <stop offset="0" stop-color="${fill}" stop-opacity="0.2"/>
    <stop offset="1" stop-color="${fill}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vignette" cx="0.5" cy="0.44" r="0.8">
    <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000000" stop-opacity="0.6"/>
  </radialGradient>
  <linearGradient id="tableTop" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d1214" stop-opacity="0"/>
    <stop offset="0.3" stop-color="#131b1d" stop-opacity="0.9"/>
    <stop offset="1" stop-color="#05080a"/>
  </linearGradient>
  <linearGradient id="captionFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#04070a" stop-opacity="0"/>
    <stop offset="0.55" stop-color="#04070a" stop-opacity="0.62"/>
    <stop offset="1" stop-color="#04070a" stop-opacity="0.86"/>
  </linearGradient>
  <linearGradient id="metal" x1="0.05" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="#454c52"/>
    <stop offset="0.22" stop-color="#2a3035"/>
    <stop offset="0.6" stop-color="#1c2226"/>
    <stop offset="1" stop-color="#10151a"/>
  </linearGradient>
  <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2e353a"/>
    <stop offset="0.35" stop-color="#20262a"/>
    <stop offset="1" stop-color="#141a1e"/>
  </linearGradient>
  <linearGradient id="glassTop" x1="0.1" y1="0" x2="0.75" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.09"/>
    <stop offset="0.3" stop-color="#ffffff" stop-opacity="0.02"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="glare" x1="0" y1="0" x2="1" y2="0.35">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="0.35" stop-color="#ffffff" stop-opacity="0.16"/>
    <stop offset="0.7" stop-color="#ffffff" stop-opacity="0.06"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="screenBloom" cx="0.5" cy="0.08" r="1">
    <stop offset="0" stop-color="${accent}" stop-opacity="0.16"/>
    <stop offset="0.6" stop-color="${accent}" stop-opacity="0.04"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#3d444a"/>
    <stop offset="0.18" stop-color="#20262b"/>
    <stop offset="0.55" stop-color="#171d21"/>
    <stop offset="1" stop-color="#2a3136"/>
  </linearGradient>
  <linearGradient id="rim" x1="0.05" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
    <stop offset="0.35" stop-color="#ffffff" stop-opacity="0.08"/>
    <stop offset="0.75" stop-color="#ffffff" stop-opacity="0.04"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity="0.22"/>
  </linearGradient>
  <filter id="bokeh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="54"/></filter>
  <filter id="haze" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="12"/></filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
  <filter id="dof" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="reflBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.6"/></filter>
  <filter id="keyBlur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="0.8"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
</defs>`
}

/* ------------------------------------------------------------------ *
 * devices
 * ------------------------------------------------------------------ */

function laptopLid({ content, vb, w, lidH, bezel, accent, clipId }) {
  const sX = -w / 2 + bezel
  const sY = -lidH / 2 + bezel + 6
  const sW = w - bezel * 2
  const sH = lidH - (bezel + 6) * 2

  const glare = [
    path(`M${-w / 2 + 176} ${-lidH / 2} L${-w / 2 + 334} ${-lidH / 2} L${-w / 2 + 168} ${lidH / 2} L${-w / 2 + 10} ${lidH / 2} Z`, {
      fill: 'url(#glare)',
      opacity: 0.55,
      filter: 'url(#haze)'
    }),
    path(`M${-w / 2 + 360} ${-lidH / 2} L${-w / 2 + 392} ${-lidH / 2} L${-w / 2 + 226} ${lidH / 2} L${-w / 2 + 194} ${lidH / 2} Z`, {
      fill: '#ffffff',
      fillOpacity: 0.05,
      filter: 'url(#haze)'
    })
  ].join('')

  return [
    rect(-w / 2, -lidH / 2, w, lidH, 22, 'url(#metal)'),
    rect(-w / 2, -lidH / 2, w, lidH, 22, 'none', { stroke: '#ffffff', strokeOpacity: 0.12 }),
    rect(-w / 2 + 2, -lidH / 2 + 2, w - 4, 2.5, 1.2, '#ffffff', { fillOpacity: 0.2 }),
    rect(sX - 7, sY - 7, sW + 14, sH + 14, 11, '#030608', { fillOpacity: 0.72 }),
    `<svg x="${sX}" y="${sY}" width="${sW}" height="${sH}" viewBox="${vb}" preserveAspectRatio="none">${content}</svg>`,
    rect(sX, sY, sW, sH, 3, 'url(#screenBloom)'),
    rect(sX, sY, sW, sH, 3, 'url(#glassTop)'),
    g(glare, { clipPath: `url(#${clipId})` }),
    circle(0, -lidH / 2 + 8, 2.3, '#141a1e'),
    circle(0, -lidH / 2 + 8, 0.9, accent, { fillOpacity: 0.5 }),
    rect(sX, sY, sW, sH, 3, 'none', { stroke: '#ffffff', strokeOpacity: 0.07 })
  ].join('')
}

/**
 * Open laptop shot straight-on from a camera slightly above the deck.
 */
export function laptop({ content, vb = '0 0 854 490', w = 880, cx = 600, lidCenterY = 372, accent = '#d7ff45' }) {
  const lidH = Math.round(w * 0.6)
  const bezel = 13
  const deckH = 88
  const hinge = lidH / 2
  const mirrorY = hinge + deckH

  const lid = laptopLid({ content, vb, w, lidH, bezel, accent, clipId: 'lidClip' })

  const rows = 4
  let keys = ''
  for (let row = 0; row < rows; row++) {
    const t = row / (rows - 1)
    const inset = 104 - 44 * t
    const rowW = w - inset * 2
    const cols = 15
    const gap = 5
    const kw = (rowW - gap * (cols - 1)) / cols
    const rowY = hinge + 11 + row * 16
    for (let c = 0; c < cols; c++) {
      keys += rect(-rowW / 2 + c * (kw + gap), rowY, kw, 12, 2.5, '#0b0f12', { fillOpacity: 0.85 })
    }
  }

  const deck = [
    path(`M${-w / 2} ${hinge - 5} L${w / 2} ${hinge - 5} L${w / 2 + 48} ${hinge + deckH} L${-w / 2 - 48} ${hinge + deckH} Z`, { fill: 'url(#deck)' }),
    g(keys, { filter: 'url(#keyBlur)' }),
    rect(-98, hinge + 72, 196, 13, 4, '#0d1215', { fillOpacity: 0.9 }),
    path(`M${-w / 2} ${hinge - 5} L${w / 2} ${hinge - 5} L${w / 2 + 48} ${hinge + deckH} L${-w / 2 - 48} ${hinge + deckH} Z`, {
      fill: 'none',
      stroke: '#ffffff',
      strokeOpacity: 0.09
    }),
    rect(-w / 2 - 3, hinge - 8, w + 6, 7, 3.5, '#080c0f'),
    path(`M${-w / 2 - 48} ${hinge + deckH} L${w / 2 + 48} ${hinge + deckH} L${w / 2 + 30} ${hinge + deckH + 6} L${-w / 2 - 30} ${hinge + deckH + 6} Z`, { fill: '#080c0f' })
  ].join('')

  const shadow = [
    ellipse(0, hinge + deckH + 30, w * 0.5, 26, '#000000', { opacity: 0.5, filter: 'url(#soft)' }),
    ellipse(0, hinge + deckH + 16, w * 0.44, 12, '#000000', { opacity: 0.55, filter: 'url(#haze)' })
  ].join('')

  const reflection = `<g mask="url(#reflMask)"><g transform="translate(0 ${2 * mirrorY}) scale(1 -1)" opacity="0.22" filter="url(#reflBlur)">${lid}</g></g>`

  const maskDefs = `<defs>
    <clipPath id="lidClip"><rect x="${-w / 2}" y="${-lidH / 2}" width="${w}" height="${lidH}" rx="22"/></clipPath>
    <linearGradient id="reflFade" gradientUnits="userSpaceOnUse" x1="0" y1="${mirrorY - 6}" x2="0" y2="${mirrorY + 150}">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="reflMask" maskUnits="userSpaceOnUse" x="-760" y="${mirrorY - 10}" width="1520" height="180">
      <rect x="-760" y="${mirrorY - 10}" width="1520" height="180" fill="url(#reflFade)"/>
    </mask>
  </defs>`

  return g([maskDefs, reflection, shadow, deck, lid].join(''), {
    transform: `translate(${cx} ${lidCenterY})`
  })
}

/** Phone, optionally thrown out of focus to fake depth of field. */
export function phone({ content, vb = '0 0 286 606', w = 300, cx = 600, cy = 500, rotate = -4, accent = '#9b8cff', depth = 0, clipId = 'phoneClip' }) {
  const h = Math.round(w * 2.06)
  const bezel = 8
  const sX = -w / 2 + bezel
  const sY = -h / 2 + bezel
  const sW = w - bezel * 2
  const sH = h - bezel * 2

  const body = [
    rect(-w / 2, -h / 2, w, h, 42, 'url(#phoneBody)'),
    rect(-w / 2, -h / 2, w, h, 42, 'none', { stroke: '#ffffff', strokeOpacity: 0.16 }),
    rect(sX - 5, sY - 5, sW + 10, sH + 10, 34, '#03060a'),
    `<svg x="${sX}" y="${sY}" width="${sW}" height="${sH}" viewBox="${vb}" preserveAspectRatio="none">${content}</svg>`,
    rect(sX, sY, sW, sH, 34, 'url(#screenBloom)'),
    rect(sX, sY, sW, sH, 34, 'url(#glassTop)'),
    path(`M${-w / 2 + 22} ${-h / 2} L${-w / 2 + 116} ${-h / 2} L${-w / 2 - 6} ${h / 2} L${-w / 2 - 74} ${h / 2} Z`, {
      fill: 'url(#glare)',
      opacity: 0.5,
      filter: 'url(#haze)',
      clipPath: `url(#${clipId})`
    }),
    rect(sX, sY, sW, sH, 34, 'none', { stroke: '#ffffff', strokeOpacity: 0.08 }),
    rect(-w / 2, -h / 2, w, h, 42, 'none', { stroke: 'url(#rim)', strokeWidth: 1.6 }),
    rect(w / 2 - 3, -h / 2 + 132, 3.5, 78, 2, '#0d1215'),
    rect(-w / 2 - 0.5, -h / 2 + 118, 3.5, 48, 2, '#0d1215')
  ].join('')

  const clip = `<defs>
    <clipPath id="${clipId}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="42"/></clipPath>
    <radialGradient id="${clipId}-shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>`
  const shadow = ellipse(0, h / 2 + 20, w * 0.5, 20, `url(#${clipId}-shadow)`, { filter: 'url(#haze)' })
  const halo = ellipse(0, 0, w * 0.82, h * 0.55, accent, { fillOpacity: 0.2, filter: 'url(#soft)' })

  return g([clip, halo, shadow, body].join(''), {
    transform: `translate(${cx} ${cy}) rotate(${rotate})`,
    filter: depth ? 'url(#dof)' : undefined,
    opacity: depth ? 0.72 : 1
  })
}

/** Tablet lying on the table, seen from a slightly high angle. */
export function tablet({ content, vb = '0 0 700 460', w = 720, cx = 600, cy = 470, rotate = -2.5, accent = '#ffd24a' }) {
  const h = Math.round(w * 0.7)
  const bezel = 16
  const sX = -w / 2 + bezel
  const sY = -h / 2 + bezel
  const sW = w - bezel * 2
  const sH = h - bezel * 2

  const body = [
    rect(-w / 2, -h / 2, w, h, 26, 'url(#metal)'),
    rect(-w / 2, -h / 2, w, h, 26, 'none', { stroke: '#ffffff', strokeOpacity: 0.13 }),
    rect(-w / 2 + 2, -h / 2 + 2, w - 4, 2.5, 1.2, '#ffffff', { fillOpacity: 0.18 }),
    rect(sX - 6, sY - 6, sW + 12, sH + 12, 10, '#03060a'),
    `<svg x="${sX}" y="${sY}" width="${sW}" height="${sH}" viewBox="${vb}" preserveAspectRatio="none">${content}</svg>`,
    rect(sX, sY, sW, sH, 4, 'url(#screenBloom)'),
    rect(sX, sY, sW, sH, 4, 'url(#glassTop)'),
    path(`M${-w / 2 + 150} ${-h / 2} L${-w / 2 + 292} ${-h / 2} L${-w / 2 + 130} ${h / 2} L${-w / 2 - 12} ${h / 2} Z`, {
      fill: 'url(#glare)',
      opacity: 0.5,
      filter: 'url(#haze)',
      clipPath: 'url(#tabClip)'
    }),
    rect(sX, sY, sW, sH, 4, 'none', { stroke: '#ffffff', strokeOpacity: 0.07 }),
    circle(0, -h / 2 + 8, 2.6, '#141a1e')
  ].join('')

  const clip = `<clipPath id="tabClip"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26"/></clipPath>`
  const shadow = [
    ellipse(6, h / 2 + 26, w * 0.5, 24, '#000000', { opacity: 0.5, filter: 'url(#soft)' }),
    ellipse(4, h / 2 + 12, w * 0.44, 11, '#000000', { opacity: 0.5, filter: 'url(#haze)' })
  ].join('')

  return g([clip, shadow, body].join(''), {
    transform: `translate(${cx} ${cy}) rotate(${rotate})`
  })
}

/* ------------------------------------------------------------------ *
 * scene assembly
 * ------------------------------------------------------------------ */

export function scene({ accent, fill = '#6fa8ff', device, kicker, meta, index, tag = 'SEOKONT' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000" width="1200" height="1000" role="img" aria-label="${esc(kicker)}">
${sceneDefs(accent, fill)}
${backdrop(accent, fill)}
${device}
${rect(0, 806, 1200, 194, 0, 'url(#captionFade)')}
${circle(84, 100, 5, accent)}
${text(100, 105, 'SEOKONT / CASE STUDY', { fam: MONO, size: 17, fill: '#ffffff', fillOpacity: 0.5, letterSpacing: 3.4 })}
${text(80, 906, kicker, { fam: MONO, size: 21, fill: accent, letterSpacing: 4.6 })}
${text(80, 948, `${index} — ${meta}`, { fam: MONO, size: 18, fill: '#ffffff', fillOpacity: 0.42, letterSpacing: 3 })}
${rect(940, 884, 182, 46, 23, 'none', { stroke: accent, strokeOpacity: 0.38 })}
${text(1031, 913, tag, { fam: MONO, size: 15, fill: accent, letterSpacing: 3, textAnchor: 'middle' })}
${rect(0, 0, 1200, 1000, 0, '#808080', { filter: 'url(#grain)', opacity: 0.075 })}
</svg>
`
}
