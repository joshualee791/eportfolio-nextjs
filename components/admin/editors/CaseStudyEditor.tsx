'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import TiptapEditor from '@/components/admin/TiptapEditor'
import TagInput from '@/components/admin/TagInput'
import { toDatetimeLocal, fromDatetimeLocal } from '@/lib/utils'
import type { PostFormState } from '@/components/admin/PostEditor'

type CaseStudyEditorProps = {
  form: PostFormState
  update: <K extends keyof PostFormState>(key: K, value: PostFormState[K]) => void
  onTitleChange: (title: string) => void
}

export default function CaseStudyEditor({ form, update, onTitleChange }: CaseStudyEditorProps) {
  return (
    <div className="space-y-6">
      <Input
        value={form.title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Case study title"
        className="text-xl font-bold h-auto py-2"
      />

      <div className="space-y-1.5">
        <Label htmlFor="summary" className="text-xs text-zinc-600">
          Summary
        </Label>
        <Input
          id="summary"
          value={form.summary}
          onChange={(e) => update('summary', e.target.value.slice(0, 140))}
          placeholder="A one-liner for cards"
        />
        <p className="text-xs text-zinc-400 text-right">{form.summary.length}/140</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">Tech Stack</Label>
        <TagInput
          value={form.techStack}
          onChange={(tags) => update('techStack', tags)}
          placeholder="Add a technology and press Enter"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl" className="text-xs text-zinc-600">
            GitHub URL
          </Label>
          <Input
            id="githubUrl"
            value={form.githubUrl}
            onChange={(e) => update('githubUrl', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl" className="text-xs text-zinc-600">
            Live URL
          </Label>
          <Input id="liveUrl" value={form.liveUrl} onChange={(e) => update('liveUrl', e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">The Problem</Label>
        <TiptapEditor content={form.problem} onChange={(html) => update('problem', html)} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">Our Approach</Label>
        <TiptapEditor content={form.approach} onChange={(html) => update('approach', html)} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">The Outcome</Label>
        <TiptapEditor content={form.outcome} onChange={(html) => update('outcome', html)} />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={form.featured} onCheckedChange={(checked) => update('featured', checked)} />
        <Label className="text-xs text-zinc-600">Feature on homepage</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="order" className="text-xs text-zinc-600">
            Display order (lower = first)
          </Label>
          <Input
            id="order"
            type="number"
            value={form.order}
            onChange={(e) => update('order', Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="publishedAt" className="text-xs text-zinc-600">
            Published At
          </Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            value={toDatetimeLocal(form.publishedAt)}
            onChange={(e) => update('publishedAt', fromDatetimeLocal(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
