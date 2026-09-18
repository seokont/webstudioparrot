/**
 * Builds the six portfolio cover images into public/projects/.
 *
 *   node scripts/covers/build.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { laptop, phone, tablet, scene } from './lib.mjs'
import { screenAxiom, screenLumen, screenMono, screenNord, screenOrion, screenPulse } from './screens.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../../public/projects')

const covers = [
  {
    id: 'orion-estate',
    accent: '#d7ff45',
    fill: '#6fa8ff',
    index: '01',
    kicker: 'SALES PIPELINE / BROKER ROUTING',
    meta: 'REAL ESTATE CRM / 2026',
    device: (accent) => laptop({ content: screenOrion(accent), accent, lidCenterY: 384 })
  },
  {
    id: 'pulse-clinic',
    accent: '#9b8cff',
    fill: '#5f7bff',
    index: '02',
    kicker: 'AI ASSISTANT / PATIENT INTAKE',
    meta: 'HEALTHCARE PRODUCT / 2026',
    device: (accent) => phone({ content: screenPulse(accent), accent, cx: 600, cy: 424, w: 350, rotate: -5 })
  },
  {
    id: 'mono-market',
    accent: '#ff6b4a',
    fill: '#ffa46b',
    index: '03',
    kicker: 'UNIFIED ORDERS / STOCK / ANALYTICS',
    meta: 'E-COMMERCE PLATFORM / 2025',
    device: (accent) => laptop({ content: screenMono(accent), accent, lidCenterY: 384 })
  },
  {
    id: 'axiom-logistics',
    accent: '#4ad9ff',
    fill: '#7a9bff',
    index: '04',
    kicker: 'ROUTE PLANNING / AI DISPATCH CRM',
    meta: 'LOGISTICS CRM / 2026',
    device: (accent) => laptop({ content: screenAxiom(accent), accent, lidCenterY: 384 })
  },
  {
    id: 'nord-build',
    accent: '#ffd24a',
    fill: '#ff9a5c',
    index: '05',
    kicker: 'AUTO ESTIMATES / OBJECT CRM',
    meta: 'CONSTRUCTION SYSTEM / 2025',
    device: (accent) => tablet({ content: screenNord(accent), accent, cx: 600, cy: 424, w: 762, rotate: -2.5 })
  },
  {
    id: 'lumen-edu',
    accent: '#7dffb0',
    fill: '#66d9ff',
    index: '06',
    kicker: 'AI CURATOR / STUDENT LIFECYCLE',
    meta: 'EDTECH CRM / 2026',
    device: (accent) => laptop({ content: screenLumen(accent), accent, lidCenterY: 384 })
  }
]

mkdirSync(outDir, { recursive: true })

for (const cover of covers) {
  const svg = scene({
    accent: cover.accent,
    fill: cover.fill,
    index: cover.index,
    kicker: cover.kicker,
    meta: cover.meta,
    device: cover.device(cover.accent)
  })
  writeFileSync(resolve(outDir, `${cover.id}.svg`), svg, 'utf8')
  console.log(`${cover.id}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`)
}
