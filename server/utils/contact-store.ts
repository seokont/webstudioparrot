import type { ContactLead } from '~/types/contact'

async function localPaths() {
  const { promises: fs } = await import('node:fs')
  const { resolve } = await import('node:path')
  const dataDir = resolve(process.cwd(), '.data')
  const dataFile = resolve(dataDir, 'contacts.json')
  await fs.mkdir(dataDir, { recursive: true })
  try { await fs.access(dataFile) } catch { await fs.writeFile(dataFile, '[]', 'utf8') }
  return { fs, dataFile }
}

async function readLocal() {
  const { fs, dataFile } = await localPaths()
  const raw = await fs.readFile(dataFile, 'utf8')
  return JSON.parse(raw) as ContactLead[]
}

async function writeLocal(items: ContactLead[]) {
  const { fs, dataFile } = await localPaths()
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), 'utf8')
}

export async function addContactLead(lead: ContactLead) {
  const items = await readLocal()
  items.unshift(lead)
  await writeLocal(items)
}
