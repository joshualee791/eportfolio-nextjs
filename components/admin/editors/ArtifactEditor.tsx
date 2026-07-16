'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import TagInput from '@/components/admin/TagInput'
import { toDatetimeLocal, fromDatetimeLocal } from '@/lib/utils'
import type { PostFormState } from '@/components/admin/PostEditor'

type ArtifactEditorProps = {
  form: PostFormState
  update: <K extends keyof PostFormState>(key: K, value: PostFormState[K]) => void
  onTitleChange: (title: string) => void
}

const typeOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'slides', label: 'Slide Deck' },
  { value: 'design', label: 'Design File' },
  { value: 'link', label: 'External Link' },
  { value: 'other', label: 'Other' },
]

export default function ArtifactEditor({ form, update, onTitleChange }: ArtifactEditorProps) {
  return (
    <div className="space-y-6">
      <Input
        value={form.title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Artifact title"
        className="text-xl font-bold h-auto py-2"
      />

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs text-zinc-600">
          Description
        </Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => update('description', e.target.value.slice(0, 300))}
        />
        <p className="text-xs text-zinc-400 text-right">{form.description.length}/300</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">Type</Label>
        <Select value={form.artifactType} onValueChange={(value) => update('artifactType', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fileUrl" className="text-xs text-zinc-600">
          File URL
        </Label>
        <Input
          id="fileUrl"
          value={form.fileUrl}
          onChange={(e) => update('fileUrl', e.target.value)}
          placeholder="Set automatically when uploaded in the Media tab, or paste a URL"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">Tags</Label>
        <TagInput
          value={form.tags}
          onChange={(tags) => update('tags', tags)}
          placeholder="Add a tag and press Enter"
          ariaLabel="Tags"
        />
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
