import { db } from '@/lib/db/client'
import { siteSettings } from '@/lib/db/schema'
import SettingsForm from '@/components/admin/SettingsForm'
import PageHeader from '@/components/layout/PageHeader'

export default async function AdminSettingsPage() {
  const rows = await db.select().from(siteSettings)
  const raw = new Map(rows.map((row) => [row.key, row.value]))

  function textValue(key: string): string {
    const value = raw.get(key)
    if (value === undefined) return ''
    try {
      const parsed = JSON.parse(value)
      return typeof parsed === 'string' ? parsed : ''
    } catch {
      return value
    }
  }

  const initial = {
    heroSubtitle: textValue('heroSubtitle'),
    aboutText: textValue('aboutText'),
    aboutImageUrl: textValue('aboutImageUrl'),
    workText: textValue('workText'),
    workImageUrl: textValue('workImageUrl'),
    resumeUrl: textValue('resumeUrl'),
    linkedinUrl: textValue('linkedinUrl'),
    contactEmail: textValue('contactEmail'),
    educationContent: textValue('educationContent'),
    skillsContent: textValue('skillsContent'),
  }

  return (
    <div>
      <PageHeader>Settings</PageHeader>
      <div className="mt-8">
        <SettingsForm initial={initial} />
      </div>
    </div>
  )
}
