'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import TiptapEditor from '@/components/admin/TiptapEditor'
import { toDatetimeLocal, fromDatetimeLocal } from '@/lib/utils'
import type { PostFormState } from '@/components/admin/PostEditor'

type BlogPostEditorProps = {
  form: PostFormState
  update: <K extends keyof PostFormState>(key: K, value: PostFormState[K]) => void
  onTitleChange: (title: string) => void
}

export default function BlogPostEditor({ form, update, onTitleChange }: BlogPostEditorProps) {
  return (
    <div className="space-y-6">
      <Input
        value={form.title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Post title"
        className="text-xl font-bold h-auto py-2"
      />

      <div className="space-y-1.5">
        <Label htmlFor="excerpt" className="text-xs text-zinc-600">
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          value={form.excerpt}
          onChange={(e) => update('excerpt', e.target.value.slice(0, 200))}
          placeholder="This appears in cards and meta descriptions"
        />
        <p className="text-xs text-zinc-400 text-right">{form.excerpt.length}/200</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-600">Content</Label>
        <TiptapEditor content={form.content} onChange={(html) => update('content', html)} />
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
  )
}
