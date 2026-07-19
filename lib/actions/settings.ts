'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { siteSettings } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/auth/session'

type ActionResult = { success: true } | { success: false; error: string }

export async function updateSettings(data: Record<string, string>): Promise<ActionResult> {
  await requireAdmin()

  try {
    for (const [key, value] of Object.entries(data)) {
      const stored = JSON.stringify(value)
      await db
        .insert(siteSettings)
        .values({ key, value: stored })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value: stored } })
    }
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/education')
    revalidatePath('/skills')
    revalidatePath('/work')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to save settings' }
  }
}
