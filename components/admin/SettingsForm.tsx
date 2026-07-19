'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import TiptapEditor from '@/components/admin/TiptapEditor'
import HeroImageField from '@/components/admin/HeroImageField'
import { updateSettings } from '@/lib/actions/settings'

type SettingsFormProps = {
  initial: {
    heroSubtitle: string
    aboutText: string
    aboutImageUrl: string
    workText: string
    workImageUrl: string
    resumeUrl: string
    linkedinUrl: string
    contactEmail: string
    educationContent: string
    educationImageUrl: string
    skillsContent: string
    skillsImageUrl: string
  }
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-zinc-100 pt-6 mt-6 first:border-t-0 first:pt-0 first:mt-0 space-y-4">
      <h2 className="text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight">
        {label}
      </h2>
      {children}
    </div>
  )
}

export default function SettingsForm({ initial }: SettingsFormProps) {
  const [form, setForm] = useState(initial)
  const [isSaving, setIsSaving] = useState(false)

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setIsSaving(true)
    const result = await updateSettings(form)
    setIsSaving(false)

    if (result.success) {
      toast.success('Settings saved')
    } else {
      toast.error(result.error ?? 'Something went wrong')
    }
  }

  return (
    <div className="max-w-3xl">
      <Section label="Hero">
        <div className="space-y-1.5">
          <Label htmlFor="heroSubtitle" className="text-xs text-zinc-600">
            Hero Subtitle
          </Label>
          <Input
            id="heroSubtitle"
            value={form.heroSubtitle}
            onChange={(e) => update('heroSubtitle', e.target.value)}
          />
        </div>
      </Section>

      <Section label="About">
        <HeroImageField
          label="About Image"
          value={form.aboutImageUrl}
          onChange={(url) => update('aboutImageUrl', url)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="aboutText" className="text-xs text-zinc-600">
            About Text
          </Label>
          <TiptapEditor
            content={form.aboutText}
            onChange={(html) => update('aboutText', html)}
            placeholder="Write something about yourself..."
          />
        </div>
      </Section>

      <Section label="Work">
        <HeroImageField
          label="Work Image"
          value={form.workImageUrl}
          onChange={(url) => update('workImageUrl', url)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="workText" className="text-xs text-zinc-600">
            Work Text
          </Label>
          <TiptapEditor
            content={form.workText}
            onChange={(html) => update('workText', html)}
            placeholder="Write something about your work..."
          />
        </div>
      </Section>

      <Section label="Education">
        <HeroImageField
          label="Education Image"
          value={form.educationImageUrl}
          onChange={(url) => update('educationImageUrl', url)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="educationContent" className="text-xs text-zinc-600">
            Education Content
          </Label>
          <TiptapEditor
            content={form.educationContent}
            onChange={(html) => update('educationContent', html)}
            placeholder="List schools, degrees, and coursework..."
          />
        </div>
      </Section>

      <Section label="Skills">
        <HeroImageField
          label="Skills Image"
          value={form.skillsImageUrl}
          onChange={(url) => update('skillsImageUrl', url)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="skillsContent" className="text-xs text-zinc-600">
            Skills Content
          </Label>
          <TiptapEditor
            content={form.skillsContent}
            onChange={(html) => update('skillsContent', html)}
            placeholder="List skills and areas of expertise..."
          />
        </div>
      </Section>

      <Section label="Links">
        <div className="space-y-1.5">
          <Label htmlFor="resumeUrl" className="text-xs text-zinc-600">
            Resume URL
          </Label>
          <Input id="resumeUrl" value={form.resumeUrl} onChange={(e) => update('resumeUrl', e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedinUrl" className="text-xs text-zinc-600">
            LinkedIn URL
          </Label>
          <Input
            id="linkedinUrl"
            value={form.linkedinUrl}
            onChange={(e) => update('linkedinUrl', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactEmail" className="text-xs text-zinc-600">
            Contact Email
          </Label>
          <Input
            id="contactEmail"
            value={form.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
          />
        </div>
      </Section>

      <Button onClick={handleSave} disabled={isSaving} className="mt-8 bg-teal-600 hover:bg-teal-700">
        {isSaving && <Loader2 size={14} className="animate-spin" />}
        Save All Settings
      </Button>
    </div>
  )
}
