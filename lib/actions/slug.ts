'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { artifacts, blogPosts, caseStudies } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/auth/session'

const tableByType = {
  blog: blogPosts,
  'case-study': caseStudies,
  artifact: artifacts,
} as const

export type ContentType = keyof typeof tableByType

export async function isSlugTaken(
  type: ContentType,
  slug: string,
  excludeId?: string
): Promise<boolean> {
  await requireAdmin()
  const table = tableByType[type]
  const rows = await db.select({ id: table.id }).from(table).where(eq(table.slug, slug))
  return rows.some((row) => row.id !== excludeId)
}
