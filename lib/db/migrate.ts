import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { config } from 'dotenv'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  await migrate(db, { migrationsFolder: 'lib/db/migrations' })
  console.log('Migrations complete')
  process.exit(0)
}

main()
