import { db } from './client'
import { siteSettings } from './schema'
import { eq } from 'drizzle-orm'

export async function getSetting(key: string): Promise<string> {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  if (!row) return ''
  try {
    return JSON.parse(row.value)
  } catch {
    return row.value
  }
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings)
  const map: Record<string, string> = {}
  for (const row of rows) {
    if (keys.includes(row.key)) {
      try {
        map[row.key] = JSON.parse(row.value)
      } catch {
        map[row.key] = row.value
      }
    }
  }
  return map
}
