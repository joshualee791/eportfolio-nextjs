import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { users, siteSettings } from './schema'
import { config } from 'dotenv'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL!
  const password = process.env.ADMIN_PASSWORD!
  const hash = await bcrypt.hash(password, 10)

  const existing = await db.select().from(users).where(eq(users.email, email))
  if (existing.length === 0) {
    await db.insert(users).values({ email, password: hash, name: 'Joshua', role: 'admin' })
    console.log('Admin user created')
  } else {
    console.log('Admin user already exists — skipping')
  }

  // Default site settings (idempotent upsert — does not overwrite existing values)
  const defaults = [
    { key: 'heroHeadline', value: JSON.stringify('Joshua Lee Garza') },
    { key: 'aboutText', value: JSON.stringify('') },
    { key: 'aboutImageUrl', value: JSON.stringify('') },
    { key: 'resumeUrl', value: JSON.stringify('') },
    { key: 'linkedinUrl', value: JSON.stringify('') },
    { key: 'contactEmail', value: JSON.stringify('joshualee791@gmail.com') },
    { key: 'educationContent', value: JSON.stringify('') },
    { key: 'skillsContent', value: JSON.stringify('') },
  ]

  for (const row of defaults) {
    await db.insert(siteSettings).values(row).onConflictDoNothing()
  }

  // heroSubtitle text was revised — force-update the live value even if already seeded
  const heroSubtitle = JSON.stringify('Computer Science · Full-Stack Developer')
  await db
    .insert(siteSettings)
    .values({ key: 'heroSubtitle', value: heroSubtitle })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: heroSubtitle } })

  console.log('Site settings seeded')
  process.exit(0)
}

main()
