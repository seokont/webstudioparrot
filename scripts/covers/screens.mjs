/**
 * Screen contents for the portfolio covers.
 * Each function returns SVG authored in the screen's own coordinate space.
 */

import { rect, circle, path, g, text, MONO, SANS } from './lib.mjs'

const panel = (x, y, w, h, r = 10, op = 0.045) => rect(x, y, w, h, r, '#ffffff', { fillOpacity: op })
const line = (x, y, w, h = 7, op = 0.3) => rect(x, y, w, h, h / 2, '#ffffff', { fillOpacity: op })
const mono = (x, y, s, o = {}) => text(x, y, s, { fam: MONO, size: 10, fill: '#ffffff', fillOpacity: 0.5, letterSpacing: 1.1, ...o })
const label = (x, y, s, o = {}) => text(x, y, s, { fam: SANS, size: 11, fill: '#ffffff', fillOpacity: 0.72, ...o })

function avatar(cx, cy, r, initials, color) {
  return [
    circle(cx, cy, r, color, { fillOpacity: 0.85 }),
    text(cx, cy + r * 0.35, initials, { fam: SANS, size: r * 0.9, fill: '#08110f', fontWeight: 700, textAnchor: 'middle' })
  ].join('')
}

function pill(x, y, w, h, txt, color, o = {}) {
  return [
    rect(x, y, w, h, h / 2, color, { fillOpacity: o.fill ?? 0.16, stroke: color, strokeOpacity: o.stroke ?? 0.32 }),
    text(x + w / 2, y + h / 2 + 3.4, txt, { fam: MONO, size: 8.5, fill: color, letterSpacing: 0.6, textAnchor: 'middle' })
  ].join('')
}

function sidebar({ w = 196, accent, brand, items, active = 0, user }) {
  const rows = items
    .map((item, i) => {
      const y = 92 + i * 36
      const on = i === active
      return [
        on ? rect(10, y - 17, w - 20, 32, 9, accent, { fillOpacity: 0.13 }) : '',
        on ? rect(10, y - 17, 2.5, 32, 1.2, accent) : '',
        rect(24, y - 8, 11, 11, 3, on ? accent : '#ffffff', { fillOpacity: on ? 0.9 : 0.25 }),
        text(46, y + 3, item, { size: 11, fill: '#ffffff', fillOpacity: on ? 0.95 : 0.5 })
      ].join('')
    })
    .join('')

  return [
    rect(0, 0, w, 490, 0, '#070b0e'),
    rect(w - 1, 0, 1, 490, 0, '#ffffff', { fillOpacity: 0.07 }),
    rect(20, 26, 20, 20, 6, accent, { fillOpacity: 0.95 }),
    text(48, 41, brand, { fam: SANS, size: 13, fill: '#ffffff', fontWeight: 600, letterSpacing: 0.4 }),
    rows,
    rect(12, 424, w - 24, 50, 12, '#ffffff', { fillOpacity: 0.05 }),
    avatar(36, 449, 14, user.initials, accent),
    text(58, 446, user.name, { size: 11, fill: '#ffffff', fillOpacity: 0.85 }),
    text(58, 460, user.role, { size: 9.5, fill: '#ffffff', fillOpacity: 0.4 })
  ].join('')
}

function topbar({ x0, w, title, accent, action }) {
  return [
    rect(x0, 0, w, 54, 0, '#080c10'),
    rect(x0, 53, w, 1, 0, '#ffffff', { fillOpacity: 0.07 }),
    text(x0 + 22, 33, title, { size: 14, fill: '#ffffff', fontWeight: 600 }),
    rect(x0 + w - 320, 15, 168, 24, 12, '#ffffff', { fillOpacity: 0.06 }),
    text(x0 + w - 306, 31, 'Пошук…', { size: 10, fill: '#ffffff', fillOpacity: 0.35 }),
    rect(x0 + w - 146, 14, 96, 26, 13, accent, { fillOpacity: 0.92 }),
    text(x0 + w - 98, 31, action, { fam: MONO, size: 9.5, fill: '#08110f', fontWeight: 700, textAnchor: 'middle', letterSpacing: 0.5 }),
    avatar(x0 + w - 26, 27, 13, 'МК', accent)
  ].join('')
}

/* ---------------------------------------------------------------- */

export function screenOrion(accent = '#d7ff45') {
  const cols = [
    { x: 220, title: 'НОВІ', count: 12, cards: [['Олена К.', 'ЖК River · 2-кімн.', '4.2M'], ['Андрій П.', 'ЖК Sky · 3-кімн.', '6.8M'], ['Ірина М.', 'Дім · Печерськ', '11.4M']] },
    { x: 434, title: 'У РОБОТІ', count: 27, cards: [['Сергій Л.', 'ЖК Park · 1-кімн.', '2.9M'], ['Марія Т.', 'ЖК River · 4-кімн.', '8.1M'], ['Олег В.', 'Офіс · Центр', '15.2M']] }
  ]

  const kanban = cols
    .map(
      (col) => `
    ${rect(col.x, 168, 198, 24, 7, accent, { fillOpacity: col.title === 'НОВІ' ? 0.22 : 0.08 })}
    ${text(col.x + 10, 184, col.title, { fam: MONO, size: 9.5, fill: accent, letterSpacing: 1.2, fillOpacity: col.title === 'НОВІ' ? 1 : 0.55 })}
    ${text(col.x + 164, 184, String(col.count), { fam: MONO, size: 9.5, fill: '#ffffff', fillOpacity: 0.4 })}
    ${col.cards
      .map(([name, obj, sum], i) => {
        const y = 202 + i * 92
        const hot = col.title === 'НОВІ' && i === 0
        return `
      ${rect(col.x, y, 198, 80, 11, '#ffffff', { fillOpacity: 0.045 })}
      ${hot ? rect(col.x, y, 198, 80, 11, accent, { fillOpacity: 0.09 }) : ''}
      ${hot ? rect(col.x, y, 3, 80, 1.5, accent) : ''}
      ${avatar(col.x + 20, y + 22, 11, name.slice(0, 1), accent)}
      ${text(col.x + 38, y + 19, name, { size: 11, fill: '#ffffff', fillOpacity: 0.9 })}
      ${text(col.x + 38, y + 33, obj, { size: 9.5, fill: '#ffffff', fillOpacity: 0.4 })}
      ${text(col.x + 12, y + 62, sum, { size: 15, fill: '#ffffff', fontWeight: 600 })}
      ${pill(col.x + 118, y + 48, 68, 18, i === 1 ? 'ЗУСТРІЧ' : 'ДЗВІНОК', accent)}
    `
      })
      .join('')}
  `
    )
    .join('')

  const chartPts = [
    [658, 452],
    [692, 424],
    [726, 436],
    [760, 386],
    [794, 398],
    [828, 344]
  ]
  const area = `M658 470 L${chartPts.map(([x, y]) => `${x} ${y}`).join(' L')} L828 470 Z`
  const stroke = `M${chartPts.map(([x, y]) => `${x} ${y}`).join(' L')}`

  return `
  ${rect(0, 0, 854, 490, 0, '#0a0f12')}
  ${sidebar({ accent, brand: 'ORION', items: ['Дашборд', 'Ліди', 'Угоди', 'Об’єкти', 'Завдання', 'Звіти'], active: 1, user: { initials: 'МК', name: 'Максим К.', role: 'Керівник відділу' } })}
  ${topbar({ x0: 196, w: 658, title: 'Ліди та угоди', accent, action: 'НОВА ЗАЯВКА' })}
  ${panel(212, 70, 200, 76, 11)}
  ${mono(226, 90, 'НОВІ ЛІДИ')}
  ${text(226, 122, '248', { size: 26, fill: '#ffffff', fontWeight: 600 })}
  ${pill(310, 104, 84, 18, '+18% МІС', accent)}
  ${panel(424, 70, 200, 76, 11)}
  ${mono(438, 90, 'УГОДИ')}
  ${text(438, 122, '41', { size: 26, fill: '#ffffff', fontWeight: 600 })}
  ${pill(512, 104, 96, 18, '+6 ЗА ТИЖДЕНЬ', accent)}
  ${panel(636, 70, 202, 76, 11)}
  ${mono(650, 90, 'КОМІСІЯ')}
  ${text(650, 122, '12.4M', { size: 26, fill: '#ffffff', fontWeight: 600 })}
  ${pill(760, 104, 62, 18, 'ГРИВНЯ', accent)}
  ${kanban}
  ${panel(650, 290, 188, 190, 12)}
  ${mono(666, 312, 'УГОДИ / МІСЯЦЬ')}
  ${path(area, { fill: accent, fillOpacity: 0.22 })}
  ${path(stroke, { fill: 'none', stroke: accent, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' })}
  ${chartPts.map(([x, y]) => circle(x, y, 3, '#0a0f12', { stroke: accent, strokeWidth: 2 })).join('')}
  ${[0, 1, 2, 3].map((i) => rect(666 + i * 42, 372 - i * 2, 30, 84 + i * 2, 5, '#ffffff', { fillOpacity: 0.05 })).join('')}
  ${text(666, 466, 'СІЧ', { fam: MONO, size: 8, fill: '#ffffff', fillOpacity: 0.3 })}
  ${text(790, 466, 'ЛИП', { fam: MONO, size: 8, fill: '#ffffff', fillOpacity: 0.3 })}
  `
}

export function screenAxiom(accent = '#4ad9ff') {
  const route = 'M52 400 C 130 360, 150 268, 226 244 S 320 208, 356 154 S 430 116, 470 92'
  const nodes = [
    [52, 400],
    [226, 244],
    [356, 154],
    [470, 92]
  ]

  const drivers = [
    ['Ігор Д.', 'Рейс 4821', 'В ДОРОЗІ', 0.95],
    ['Петро С.', 'Рейс 4822', 'ЗАВАНТ.', 0.7],
    ['Анна Р.', 'Рейс 4825', 'ВІЛЬНИЙ', 0.42],
    ['Тарас Ж.', 'Рейс 4827', 'ПАУЗА', 0.28]
  ]

  return `
  ${rect(0, 0, 854, 490, 0, '#070d12')}
  ${rect(0, 0, 854, 56, 0, '#080f14')}
  ${rect(0, 55, 854, 1, 0, '#ffffff', { fillOpacity: 0.07 })}
  ${rect(22, 18, 18, 18, 5, accent, { fillOpacity: 0.95 })}
  ${text(48, 33, 'Диспетчерська', { size: 14, fill: '#ffffff', fontWeight: 600 })}
  ${mono(206, 33, 'LIVE / 34 РЕЙСИ')}
  ${pill(330, 17, 92, 22, 'СЬОГОДНІ', accent)}
  ${pill(430, 17, 108, 22, 'ПРІОРИТЕТ', '#ffffff')}
  ${rect(726, 15, 108, 26, 13, accent, { fillOpacity: 0.92 })}
  ${text(780, 32, 'РОЗПОДІЛИТИ', { fam: MONO, size: 8.5, fill: '#061016', fontWeight: 700, textAnchor: 'middle', letterSpacing: 0.4 })}

  ${panel(16, 70, 520, 404, 14, 0.035)}
  ${[0, 1, 2, 3, 4].map((i) => rect(16, 138 + i * 68, 520, 1, 0, '#ffffff', { fillOpacity: 0.05 })).join('')}
  ${[0, 1, 2, 3, 4, 5].map((i) => rect(90 + i * 74, 70, 1, 404, 0, '#ffffff', { fillOpacity: 0.05 })).join('')}
  ${path(route, { fill: 'none', stroke: accent, strokeWidth: 3, strokeOpacity: 0.35, strokeLinecap: 'round' })}
  ${path(route, { fill: 'none', stroke: accent, strokeWidth: 1.6, strokeDasharray: '8 9', strokeLinecap: 'round' })}
  ${nodes.map(([x, y]) => circle(x, y, 6, '#070d12', { stroke: accent, strokeWidth: 2.4 })).join('')}
  ${circle(470, 92, 16, accent, { fillOpacity: 0.18 })}
  ${circle(470, 92, 6, accent)}
  ${rect(206, 168, 150, 52, 9, '#0b141a', { stroke: accent, strokeOpacity: 0.35 })}
  ${mono(218, 188, 'ETA 14:20', { fill: accent, fillOpacity: 1 })}
  ${text(218, 207, 'Маршрут оптимізовано', { size: 9.5, fill: '#ffffff', fillOpacity: 0.55 })}
  ${rect(352, 350, 168, 60, 10, '#0b141a', { fillOpacity: 0.9, stroke: '#ffffff', strokeOpacity: 0.12 })}
  ${mono(366, 372, 'ЗАВАНТАЖЕННЯ 6.2Т')}
  ${line(366, 382, 120, 6, 0.2)}
  ${rect(366, 382, 74, 6, 3, accent, { fillOpacity: 0.8 })}
  ${text(366, 402, 'Одеса → Київ', { size: 10, fill: '#ffffff', fillOpacity: 0.7 })}

  ${panel(552, 70, 286, 190, 14, 0.05)}
  ${mono(570, 96, 'AI-ПРІОРИТЕТ')}
  ${text(570, 148, '92', { size: 44, fill: '#ffffff', fontWeight: 600 })}
  ${text(622, 148, '%', { size: 20, fill: accent })}
  ${[['ТЕРМІНОВІ', 0.92], ['ЗВИЧАЙНІ', 0.58], ['ГНУЧКІ', 0.3]].map(([t, v], i) => {
    const y = 172 + i * 26
    return `
    ${mono(570, y + 8, t, { size: 8.5 })}
    ${rect(646, y, 174, 9, 4.5, '#ffffff', { fillOpacity: 0.08 })}
    ${rect(646, y, 174 * v, 9, 4.5, accent, { fillOpacity: 0.85 })}`
  }).join('')}
  ${mono(570, 246, 'ЧЕРГА: 4 / 11 / 19')}

  ${panel(552, 274, 286, 200, 14, 0.04)}
  ${mono(570, 298, 'ЕКІПАЖІ / ЗМІНА А')}
  ${drivers
    .map(([name, trip, status, v], i) => {
      const y = 314 + i * 40
      return `
    ${rect(566, y, 258, 34, 10, '#ffffff', { fillOpacity: 0.05 })}
    ${avatar(586, y + 17, 11, name.slice(0, 1), accent)}
    ${text(604, y + 14, name, { size: 10.5, fill: '#ffffff', fillOpacity: 0.85 })}
    ${text(604, y + 26, trip, { size: 9, fill: '#ffffff', fillOpacity: 0.4 })}
    ${rect(676, y + 14, 54, 6, 3, '#ffffff', { fillOpacity: 0.1 })}
    ${rect(676, y + 14, 54 * v, 6, 3, accent, { fillOpacity: 0.7 })}
    ${text(818, y + 19, status, { fam: MONO, size: 7.5, fill: accent, fillOpacity: 0.85, textAnchor: 'end' })}`
    })
    .join('')}
  `
}

export function screenMono(accent = '#ff6b4a') {
  const products = [
    ['Крісло Nord', '4 240', 0.9],
    ['Лампа Arc', '1 890', 0.65],
    ['Стіл Oak', '8 500', 0.4],
    ['Полиця Line', '2 350', 0.8]
  ]
  const orders = [
    ['#10241', 'Олена К.', '4 240', 'ОПЛАЧЕНО', 1],
    ['#10240', 'Ігор П.', '12 890', 'В ДОРОЗІ', 0.75],
    ['#10239', 'Марія Т.', '2 350', 'НОВЕ', 0.5],
    ['#10238', 'Олег В.', '8 500', 'ОПЛАЧЕНО', 0.9]
  ]

  return `
  ${rect(0, 0, 854, 490, 0, '#0c0a09')}
  ${sidebar({ w: 172, accent, brand: 'MONO', items: ['Огляд', 'Замовлення', 'Товари', 'Склад', 'Клієнти', 'Аналітика'], active: 1, user: { initials: 'АС', name: 'Анна С.', role: 'Оператор' } })}
  ${topbar({ x0: 172, w: 682, title: 'Замовлення', accent, action: 'ДОДАТИ ТОВАР' })}
  ${panel(188, 70, 200, 74, 11)}
  ${mono(202, 90, 'ВИРУЧКА / ДЕНЬ')}
  ${text(202, 122, '184 200', { size: 24, fill: '#ffffff', fontWeight: 600 })}
  ${panel(400, 70, 172, 74, 11)}
  ${mono(414, 90, 'ЗАМОВЛЕННЯ')}
  ${text(414, 122, '96', { size: 24, fill: '#ffffff', fontWeight: 600 })}
  ${panel(584, 70, 254, 74, 11)}
  ${mono(598, 90, 'КОНВЕРСІЯ КОШИКА')}
  ${text(598, 122, '64%', { size: 24, fill: '#ffffff', fontWeight: 600 })}
  ${rect(682, 96, 140, 9, 4.5, '#ffffff', { fillOpacity: 0.08 })}
  ${rect(682, 96, 90, 9, 4.5, accent, { fillOpacity: 0.9 })}
  ${mono(682, 122, 'АВТОМАТИЗАЦІЯ / ON')}

  ${products
    .map(([name, price, stock], i) => {
      const x = 188 + i * 162
      return `
    ${rect(x, 158, 148, 148, 12, '#ffffff', { fillOpacity: 0.04 })}
    ${rect(x + 12, 170, 124, 78, 9, accent, { fillOpacity: 0.16 + i * 0.14 })}
    ${rect(x + 40, 194, 68, 30, 6, '#0c0a09', { fillOpacity: 0.25 })}
    ${text(x + 12, 268, name, { size: 11, fill: '#ffffff', fillOpacity: 0.88 })}
    ${text(x + 12, 288, `${price} грн`, { size: 13, fill: '#ffffff', fontWeight: 600 })}
    ${rect(x + 12, 292, 60, 5, 2.5, '#ffffff', { fillOpacity: 0.1 })}
    ${rect(x + 12, 292, 60 * stock, 5, 2.5, accent, { fillOpacity: 0.75 })}`
    })
    .join('')}

  ${rect(188, 320, 650, 154, 12, '#ffffff', { fillOpacity: 0.035 })}
  ${mono(206, 344, 'ОСТАННІ ЗАМОВЛЕННЯ')}
  ${mono(700, 344, 'ОНОВЛЕНО 2 ХВ')}
  ${orders
    .map(([num, client, sum, status, note], i) => {
      const y = 358 + i * 28
      return `
    ${i % 2 === 0 ? rect(200, y, 626, 24, 6, '#ffffff', { fillOpacity: 0.035 }) : ''}
    ${text(212, y + 16, num, { fam: MONO, size: 9.5, fill: '#ffffff', fillOpacity: 0.55 })}
    ${text(280, y + 16, client, { size: 10.5, fill: '#ffffff', fillOpacity: 0.85 })}
    ${rect(420, y + 9, 96, 6, 3, '#ffffff', { fillOpacity: 0.09 })}
    ${rect(420, y + 9, 96 * note, 6, 3, accent, { fillOpacity: 0.6 })}
    ${pill(560, y + 3, 92, 18, status, status === 'ОПЛАЧЕНО' ? accent : '#ffffff', { fill: status === 'ОПЛАЧЕНО' ? 0.18 : 0.07 })}
    ${text(742, y + 16, sum, { fam: MONO, size: 9.5, fill: '#ffffff', fillOpacity: 0.7, textAnchor: 'end' })}
    ${text(814, y + 16, 'грн', { fam: MONO, size: 8.5, fill: '#ffffff', fillOpacity: 0.32, textAnchor: 'end' })}`
    })
    .join('')}
  `
}

export function screenLumen(accent = '#7dffb0') {
  const lessons = [
    ['Модуль 1 · Основи', 'Завершено', 1],
    ['Модуль 2 · Практика', 'У процесі', 0.62],
    ['Модуль 3 · Проєкт', 'Доступно', 0.18]
  ]
  const cohort = [0.32, 0.46, 0.58, 0.44, 0.72, 0.6, 0.92, 0.5, 0.66]

  return `
  ${rect(0, 0, 854, 490, 0, '#08120d')}
  ${sidebar({ w: 186, accent, brand: 'LUMEN', items: ['Огляд', 'Студенти', 'Групи', 'Курси', 'Оплати', 'Аналітика'], active: 1, user: { initials: 'ДК', name: 'Діана К.', role: 'Куратор школи' } })}
  ${topbar({ x0: 186, w: 668, title: 'Студенти', accent, action: 'НОВА ГРУПА' })}

  ${panel(202, 70, 200, 74, 11)}
  ${mono(216, 90, 'АКТИВНІ')}
  ${text(216, 122, '1 248', { size: 24, fill: '#ffffff', fontWeight: 600 })}
  ${panel(416, 70, 200, 74, 11)}
  ${mono(430, 90, 'УТРИМАННЯ')}
  ${text(430, 122, '78%', { size: 24, fill: '#ffffff', fontWeight: 600 })}
  ${rect(500, 108, 100, 8, 4, '#ffffff', { fillOpacity: 0.09 })}
  ${rect(500, 108, 78, 8, 4, accent, { fillOpacity: 0.85 })}
  ${panel(630, 70, 208, 74, 11)}
  ${mono(644, 90, 'ДОХІД / МІСЯЦЬ')}
  ${text(644, 122, '486 000', { size: 22, fill: '#ffffff', fontWeight: 600 })}

  ${rect(202, 158, 414, 178, 12, '#ffffff', { fillOpacity: 0.04 })}
  ${mono(220, 182, 'ПРОГРЕС ГРУПИ / ТИЖНІ')}
  ${cohort
    .map((v, i) => {
      const x = 222 + i * 44
      const h = 108 * v
      return `
    ${rect(x, 310 - h, 30, h, 6, accent, { fillOpacity: 0.3 + v * 0.6 })}
    ${rect(x, 312, 30, 1.5, 0.75, '#ffffff', { fillOpacity: 0.12 })}`
    })
    .join('')}

  ${rect(630, 158, 208, 178, 12, '#ffffff', { fillOpacity: 0.04 })}
  ${mono(646, 182, 'AI-КУРАТОР')}
  ${circle(658, 206, 11, accent, { fillOpacity: 0.9 })}
  ${text(658, 210, 'AI', { fam: MONO, size: 9, fill: '#08120d', fontWeight: 700, textAnchor: 'middle' })}
  ${rect(678, 196, 144, 30, 10, accent, { fillOpacity: 0.14 })}
  ${line(688, 205, 112, 5, 0.35)}
  ${line(688, 216, 84, 5, 0.25)}
  ${rect(646, 240, 176, 32, 10, '#ffffff', { fillOpacity: 0.06 })}
  ${line(658, 250, 120, 5, 0.28)}
  ${line(658, 261, 92, 5, 0.2)}
  ${pill(646, 284, 118, 22, 'НАГАДАТИ', accent)}
  ${text(774, 299, '14:20', { fam: MONO, size: 8.5, fill: '#ffffff', fillOpacity: 0.35 })}

  ${lessons
    .map(([name, status, v], i) => {
      const y = 350 + i * 42
      return `
    ${rect(202, y, 636, 36, 10, '#ffffff', { fillOpacity: 0.045 })}
    ${i === 0 ? circle(224, y + 18, 9, accent, { fillOpacity: 0.9 }) : circle(224, y + 18, 9, '#ffffff', { fillOpacity: 0.1 })}
    ${i === 0 ? path(`M220 ${y + 18} l3 3.5 6-7`, { fill: 'none', stroke: '#08120d', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }) : ''}
    ${text(244, y + 22, name, { size: 11.5, fill: '#ffffff', fillOpacity: 0.85 })}
    ${rect(470, y + 14, 220, 7, 3.5, '#ffffff', { fillOpacity: 0.09 })}
    ${rect(470, y + 14, 220 * v, 7, 3.5, accent, { fillOpacity: 0.8 })}
    ${text(760, y + 22, status, { fam: MONO, size: 8.5, fill: accent, fillOpacity: i === 2 ? 0.5 : 0.9, textAnchor: 'end' })}`
    })
    .join('')}
  `
}

export function screenNord(accent = '#ffd24a') {
  const rows = [
    ['Фундамент', '820 000', 0.86],
    ['Стіни та перекриття', '1 240 000', 0.64],
    ['Покрівля', '610 000', 0.52],
    ['Фасад', '740 000', 0.4],
    ['Інженерні мережі', '880 000', 0.28],
    ['Оздоблення', '530 000', 0.16]
  ]

  return `
  ${rect(0, 0, 700, 460, 0, '#0d0c09')}
  ${rect(0, 0, 700, 52, 0, '#100e0a')}
  ${rect(0, 51, 700, 1, 0, '#ffffff', { fillOpacity: 0.08 })}
  ${rect(18, 16, 18, 18, 5, accent, { fillOpacity: 0.95 })}
  ${text(44, 31, 'Об’єкт · ЖК Північний', { size: 13, fill: '#ffffff', fontWeight: 600 })}
  ${mono(300, 31, 'РІВЕНЬ 02 / 14')}
  ${pill(520, 15, 84, 22, 'AI ON', accent)}
  ${pill(612, 15, 72, 22, 'ТИЖДЕНЬ 32', '#ffffff')}

  ${panel(16, 64, 340, 380, 12, 0.035)}
  ${[0, 1, 2, 3].map((i) => rect(16, 132 + i * 76, 340, 1, 0, '#ffffff', { fillOpacity: 0.05 })).join('')}
  ${mono(32, 86, 'ПЛАН / КРЕСЛЕННЯ')}
  ${rect(48, 104, 128, 106, 2, accent, { fillOpacity: 0.12 })}
  ${rect(176, 104, 148, 60, 2, '#ffffff', { fillOpacity: 0.05 })}
  ${rect(176, 164, 148, 46, 2, '#ffffff', { fillOpacity: 0.03 })}
  ${rect(48, 210, 84, 82, 2, '#ffffff', { fillOpacity: 0.05 })}
  ${rect(132, 210, 84, 82, 2, '#ffffff', { fillOpacity: 0.03 })}
  ${rect(216, 210, 108, 82, 2, accent, { fillOpacity: 0.16 })}
  ${g(
    [
      rect(48, 104, 128, 106, 2, 'none', { stroke: accent, strokeOpacity: 0.8, strokeWidth: 1.8 }),
      rect(176, 104, 148, 60, 2, 'none', { stroke: accent, strokeOpacity: 0.6, strokeWidth: 1.8 }),
      rect(176, 164, 148, 46, 2, 'none', { stroke: accent, strokeOpacity: 0.6, strokeWidth: 1.8 }),
      rect(48, 210, 84, 82, 2, 'none', { stroke: accent, strokeOpacity: 0.6, strokeWidth: 1.8 }),
      rect(132, 210, 84, 82, 2, 'none', { stroke: accent, strokeOpacity: 0.6, strokeWidth: 1.8 }),
      rect(216, 210, 108, 82, 2, 'none', { stroke: accent, strokeOpacity: 0.8, strokeWidth: 1.8 })
    ].join(''),
    { fill: 'none' }
  )}
  ${path('M48 320 L48 330 L324 330 L324 320', { fill: 'none', stroke: '#ffffff', strokeOpacity: 0.35 })}
  ${text(160, 346, '18 400 мм', { fam: MONO, size: 8.5, fill: '#ffffff', fillOpacity: 0.45 })}
  ${path('M36 104 L26 104 L26 292 L36 292', { fill: 'none', stroke: '#ffffff', strokeOpacity: 0.28 })}
  ${text(30, 200, '9 200 мм', { fam: MONO, size: 8.5, fill: '#ffffff', fillOpacity: 0.4, transform: 'rotate(-90 30 200)' })}
  ${circle(276, 172, 7, accent, { fillOpacity: 0.9 })}
  ${text(276, 175, '02', { fam: MONO, size: 7.5, fill: '#0d0c09', fontWeight: 700, textAnchor: 'middle' })}
  ${mono(32, 380, 'ЕТАПИ / ГОТОВНІСТЬ')}
  ${[
    ['Фундамент', 1],
    ['Каркас', 0.72],
    ['Фасад', 0.35],
    ['Оздоблення', 0.1]
  ]
    .map(([t, v], i) => {
      const x = 32 + i * 80
      return `
    ${rect(x, 396, 64, 6, 3, '#ffffff', { fillOpacity: 0.1 })}
    ${rect(x, 396, 64 * v, 6, 3, accent, { fillOpacity: 0.8 })}
    ${text(x, 420, t, { size: 9, fill: '#ffffff', fillOpacity: 0.6 })}`
    })
    .join('')}

  ${panel(368, 64, 316, 380, 12, 0.045)}
  ${mono(386, 88, 'AI-КОШТОРИС')}
  ${text(386, 128, '4.82M', { size: 34, fill: '#ffffff', fontWeight: 600 })}
  ${text(490, 128, 'UAH', { fam: MONO, size: 12, fill: accent })}
  ${pill(386, 142, 108, 20, '−11% ДО ПЛАНУ', accent)}
  ${rows
    .map(([name, sum, v], i) => {
      const y = 182 + i * 40
      return `
    ${rect(380, y, 292, 34, 9, '#ffffff', { fillOpacity: 0.045 })}
    ${text(392, y + 15, name, { size: 10.5, fill: '#ffffff', fillOpacity: 0.82 })}
    ${text(660, y + 15, sum, { fam: MONO, size: 9.5, fill: '#ffffff', fillOpacity: 0.7, textAnchor: 'end' })}
    ${rect(392, y + 22, 180, 5, 2.5, '#ffffff', { fillOpacity: 0.1 })}
    ${rect(392, y + 22, 180 * v, 5, 2.5, accent, { fillOpacity: 0.8 })}`
    })
    .join('')}
  ${rect(380, 424, 292, 1, 0, '#ffffff', { fillOpacity: 0.12 })}
  `
}

export function screenPulse(accent = '#9b8cff') {
  return `
  ${rect(0, 0, 286, 606, 0, '#0b0a14')}
  ${text(18, 22, '9:41', { fam: SANS, size: 11, fill: '#ffffff', fontWeight: 600 })}
  ${rect(228, 13, 16, 9, 2, '#ffffff', { fillOpacity: 0.5 })}
  ${rect(248, 13, 20, 9, 2, '#ffffff', { fillOpacity: 0.35 })}
  ${path('M212 14 l3 4 3-4', { fill: 'none', stroke: '#ffffff', strokeOpacity: 0.5, strokeWidth: 1.4 })}
  ${circle(200, 17, 4, '#ffffff', { fillOpacity: 0.4 })}

  ${rect(0, 32, 286, 60, 0, '#0e0d1a')}
  ${path('M22 62 l-6 -6 6 -6', { fill: 'none', stroke: '#ffffff', strokeOpacity: 0.5, strokeWidth: 1.6, strokeLinecap: 'round' })}
  ${circle(58, 62, 15, accent, { fillOpacity: 0.9 })}
  ${text(58, 66, 'P', { fam: SANS, size: 13, fill: '#0b0a14', fontWeight: 700, textAnchor: 'middle' })}
  ${text(82, 58, 'PULSE CLINIC', { size: 12, fill: '#ffffff', fontWeight: 600 })}
  ${circle(88, 70, 3, accent)}
  ${text(96, 73, 'онлайн · відповідає одразу', { size: 8.5, fill: '#ffffff', fillOpacity: 0.45 })}
  ${rect(0, 91, 286, 1, 0, '#ffffff', { fillOpacity: 0.07 })}

  ${rect(96, 112, 172, 54, 14, '#ffffff', { fillOpacity: 0.08 })}
  ${line(110, 130, 138, 6, 0.4)}
  ${line(110, 144, 104, 6, 0.28)}
  ${text(258, 178, '9:38', { fam: MONO, size: 7.5, fill: '#ffffff', fillOpacity: 0.3, textAnchor: 'end' })}

  ${rect(18, 190, 220, 132, 14, accent, { fillOpacity: 0.14 })}
  ${rect(18, 190, 220, 132, 14, 'none', { stroke: accent, strokeOpacity: 0.3 })}
  ${line(32, 210, 178, 6, 0.45)}
  ${line(32, 224, 192, 6, 0.3)}
  ${line(32, 238, 140, 6, 0.25)}
  ${rect(32, 252, 192, 34, 9, '#0b0a14', { fillOpacity: 0.45 })}
  ${text(44, 266, 'П’ятниця, 14:30', { size: 10, fill: '#ffffff', fillOpacity: 0.85 })}
  ${text(44, 279, 'Клініка на Подолі · 12 хв', { size: 8.5, fill: '#ffffff', fillOpacity: 0.5 })}
  ${rect(134, 294, 90, 20, 10, accent, { fillOpacity: 0.95 })}
  ${text(179, 308, 'ПІДТВЕРДИТИ', { fam: MONO, size: 7.5, fill: '#0b0a14', fontWeight: 700, textAnchor: 'middle', letterSpacing: 0.3 })}

  ${['Онлайн', 'У клініці', 'Передзвонити'].map((t, i) => {
    const w = 62 + i * 8
    const x = 18 + i * 74
    return `${rect(x, 334, w, 24, 12, '#ffffff', { fillOpacity: 0.07, stroke: '#ffffff', strokeOpacity: 0.12 })}
    ${text(x + w / 2, 350, t, { size: 8.5, fill: accent, textAnchor: 'middle' })}`
  }).join('')}

  ${rect(18, 374, 74, 34, 14, '#ffffff', { fillOpacity: 0.06 })}
  ${[0, 1, 2].map((i) => circle(34 + i * 16, 391, 3.4, accent, { fillOpacity: 1 - i * 0.3 })).join('')}

  ${rect(96, 424, 172, 48, 14, '#ffffff', { fillOpacity: 0.08 })}
  ${line(110, 442, 120, 6, 0.35)}
  ${line(110, 456, 86, 6, 0.22)}
  ${text(258, 486, '9:44', { fam: MONO, size: 7.5, fill: '#ffffff', fillOpacity: 0.3, textAnchor: 'end' })}

  ${rect(18, 520, 250, 44, 22, '#ffffff', { fillOpacity: 0.06 })}
  ${text(38, 547, 'Напишіть повідомлення…', { size: 10, fill: '#ffffff', fillOpacity: 0.32 })}
  ${circle(246, 542, 17, accent, { fillOpacity: 0.95 })}
  ${path('M240 542 h12 m0 0 -5 -5 m5 5 -5 5', { fill: 'none', stroke: '#0b0a14', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' })}
  ${rect(112, 588, 62, 4, 2, '#ffffff', { fillOpacity: 0.35 })}
  `
}
