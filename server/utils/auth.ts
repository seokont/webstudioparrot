import type { H3Event } from 'h3'
import { deleteCookie, getCookie, setCookie } from 'h3'

const COOKIE_NAME = 'seokont_admin'
const SESSION_SECONDS = 60 * 60 * 12

async function digest(value: string) {
  const data = new TextEncoder().encode(value)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

function runtimeCredentials() {
  const config = useRuntimeConfig()
  return {
    username: String(config.adminUsername),
    password: String(config.adminPassword),
    secret: String(config.adminSessionSecret)
  }
}

export async function credentialsAreValid(username: string, password: string) {
  const credentials = runtimeCredentials()
  const [provided, expected] = await Promise.all([
    digest(`${username}:${password}:${credentials.secret}`),
    digest(`${credentials.username}:${credentials.password}:${credentials.secret}`)
  ])
  return provided === expected
}

export async function createAdminSession(event: H3Event) {
  const { secret } = runtimeCredentials()
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  const signature = await digest(`${expires}:${secret}`)
  setCookie(event, COOKIE_NAME, `${expires}.${signature}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_SECONDS
  })
}

export async function isAdmin(event: H3Event) {
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return false
  const [expiresString, signature] = token.split('.')
  const expires = Number(expiresString)
  if (!expires || expires < Math.floor(Date.now() / 1000) || !signature) return false
  const { secret } = runtimeCredentials()
  return signature === await digest(`${expires}:${secret}`)
}

export async function requireAdmin(event: H3Event) {
  if (!await isAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Требуется вход в админку' })
  }
}

export function clearAdminSession(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}
