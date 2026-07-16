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

  // Default site settings (idempotent upsert)
  const defaults = [
    { key: 'heroHeadline', value: JSON.stringify('Joshua Lee Garza') },
    { key: 'heroSubtitle', value: JSON.stringify('Computer Science Student · Full-Stack Developer') },
    { key: 'aboutText', value: JSON.stringify('') },
    { key: 'resumeUrl', value: JSON.stringify('') },
    { key: 'linkedinUrl', value: JSON.stringify('') },
    { key: 'contactEmail', value: JSON.stringify('joshualee791@gmail.com') },
  ]

  for (const row of defaults) {
    await db.insert(siteSettings).values(row).onConflictDoNothing()
  }
  console.log('Site settings seeded')
  process.exit(0)
}

main()
