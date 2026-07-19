import { db } from './client'
import { siteSettings } from './schema'
import { eq } from 'drizzle-orm'

function parseValue(raw: string): string {
  try {
    const parsed = JSON.parse(raw)
    return typeof parsed === 'string' ? parsed : ''
  } catch {
    return raw
  }
}

export async function getSetting(key: string): Promise<string> {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  if (!row) return ''
  return parseValue(row.value)
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings)
  const map: Record<string, string> = {}
  for (const row of rows) {
    if (keys.includes(row.key)) {
      map[row.key] = parseValue(row.value)
    }
  }
  return map
}
