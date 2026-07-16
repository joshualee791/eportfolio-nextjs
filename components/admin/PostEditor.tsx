'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { UploadButton } from '@uploadthing/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { OurFileRouter } from '@/lib/uploadthing'
import { isSlugTaken, type ContentType } from '@/lib/actions/slug'
import { createBlogPost, updateBlogPost } from '@/lib/actions/blog'
import { createCaseStudy, updateCaseStudy } from '@/lib/actions/caseStudies'
import { createArtifact, updateArtifact } from '@/lib/actions/artifacts'
import BlogPostEditor from '@/components/admin/editors/BlogPostEditor'
import CaseStudyEditor from '@/components/admin/editors/CaseStudyEditor'
import ArtifactEditor from '@/components/admin/editors/ArtifactEditor'

export type PostFormState = {
  title: string
  slug: string
  seoTitle: string
  metaDescription: string
  canonicalUrl: string
  coverImage: string
  coverImageAlt: string
  publishedAt: Date | null
  // blog
  excerpt: string
  content: string
  // case study
  summary: string
  problem: string
  approach: string
  outcome: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  order: number
  // artifact
  description: string
  artifactType: string
  fileUrl: string
  tags: string[]
}

const emptyState: PostFormState = {
  title: '',
  slug: '',
  seoTitle: '',
  metaDescription: '',
  canonicalUrl: '',
  coverImage: '',
  coverImageAlt: '',
  publishedAt: null,
  excerpt: '',
  content: '',
  summary: '',
  problem: '',
  approach: '',
  outcome: '',
  techStack: [],
  githubUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
  description: '',
  artifactType: 'pdf',
  fileUrl: '',
  tags: [],
}

const typeMeta: Record<ContentType, { label: string; publicPath: string }> = {
  blog: { label: 'Blog Posts', publicPath: '/blog' },
  'case-study': { label: 'Case Studies', publicPath: '/case-studies' },
  artifact: { label: 'Artifacts', publicPath: '/artifacts' },
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type SaveResult = { success: boolean; id?: string; error?: string }

type PostEditorProps = {
  type: ContentType
  initialData?: Partial<PostFormState>
  id?: string
}

function save(type: ContentType, id: string | undefined, form: PostFormState): Promise<SaveResult> {
  if (type === 'blog') {
    const data = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      coverImageAlt: form.coverImageAlt,
      seoTitle: form.seoTitle,
      metaDescription: form.metaDescription,
      canonicalUrl: form.canonicalUrl,
      published: Boolean(form.publishedAt),
      publishedAt: form.publishedAt,
    }
    return id ? updateBlogPost(id, data) : createBlogPost(data)
  }

  if (type === 'case-study') {
    const data = {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      problem: form.problem,
      approach: form.approach,
      outcome: form.outcome,
      techStack: form.techStack,
      githubUrl: form.githubUrl,
      liveUrl: form.liveUrl,
      coverImage: form.coverImage,
      coverImageAlt: form.coverImageAlt,
      seoTitle: form.seoTitle,
      metaDescription: form.metaDescription,
      canonicalUrl: form.canonicalUrl,
      featured: form.featured,
      order: form.order,
      publishedAt: form.publishedAt,
    }
    return id ? updateCaseStudy(id, data) : createCaseStudy(data)
  }

  const data = {
    title: form.title,
    slug: form.slug,
    description: form.description,
    type: form.artifactType as 'pdf' | 'slides' | 'design' | 'link' | 'other',
    fileUrl: form.fileUrl,
    tags: form.tags,
    coverImage: form.coverImage,
    coverImageAlt: form.coverImageAlt,
    seoTitle: form.seoTitle,
    metaDescription: form.metaDescription,
    canonicalUrl: form.canonicalUrl,
    featured: form.featured,
    order: form.order,
    publishedAt: form.publishedAt,
  }
  return id ? updateArtifact(id, data) : createArtifact(data)
}

export default function PostEditor({ type, initialData, id }: PostEditorProps) {
  const router = useRouter()
  const [form, setForm] = useState<PostFormState>({ ...emptyState, ...initialData })
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug))
  const [slugWarning, setSlugWarning] = useState('')
  const [isSaving, setIsSaving] = useState<'draft' | 'publish' | null>(null)

  const meta = typeMeta[type]

  function update<K extends keyof PostFormState>(key: K, value: PostFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleTitleChange(title: string) {
    update('title', title)
    if (!slugTouched) {
      update('slug', slugify(title))
    }
  }

  async function handleSlugChange(slug: string) {
    setSlugTouched(true)
    update('slug', slug)
    setSlugWarning('')
    const clean = slugify(slug)
    if (clean && clean === slug) {
      const taken = await isSlugTaken(type, slug, id)
      if (taken) setSlugWarning('This slug is already in use.')
    }
  }

  async function handleSave(mode: 'draft' | 'publish') {
    setIsSaving(mode)
    const publishedAt = mode === 'draft' ? null : (form.publishedAt ?? new Date())
    const result = await save(type, id, { ...form, publishedAt })
    setIsSaving(null)

    if (result.success) {
      toast.success(mode === 'publish' ? 'Published' : 'Draft saved')
      router.push('/admin/content')
      router.refresh()
    } else {
      toast.error(result.error ?? 'Something went wrong')
    }
  }

  const slugValid = useMemo(() => /^[a-z0-9-]*$/.test(form.slug), [form.slug])

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between border-b border-zinc-100 py-4 mb-6 -mx-8 px-8">
        <Link
          href="/admin/content"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft size={14} />
          {meta.label}
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={isSaving !== null} onClick={() => handleSave('draft')}>
            {isSaving === 'draft' && <Loader2 size={14} className="animate-spin" />}
            Save Draft
          </Button>
          <Button
            disabled={isSaving !== null}
            onClick={() => handleSave('publish')}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isSaving === 'publish' && <Loader2 size={14} className="animate-spin" />}
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6 max-w-2xl">
          {type === 'blog' && (
            <BlogPostEditor form={form} update={update} onTitleChange={handleTitleChange} />
          )}
          {type === 'case-study' && (
            <CaseStudyEditor form={form} update={update} onTitleChange={handleTitleChange} />
          )}
          {type === 'artifact' && (
            <ArtifactEditor form={form} update={update} onTitleChange={handleTitleChange} />
          )}
        </TabsContent>

        <TabsContent value="seo" className="mt-6 max-w-lg space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="seoTitle" className="text-xs text-zinc-600">
              SEO Title
            </Label>
            <Input
              id="seoTitle"
              value={form.seoTitle}
              onChange={(e) => update('seoTitle', e.target.value)}
              placeholder="Leave blank to use the post title"
            />
            <p className="text-xs text-zinc-400 text-right">{form.seoTitle.length}/60</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="metaDescription" className="text-xs text-zinc-600">
              Meta Description
            </Label>
            <Textarea
              id="metaDescription"
              value={form.metaDescription}
              onChange={(e) => update('metaDescription', e.target.value)}
              placeholder="Write a compelling description for search engines and social sharing"
              className="min-h-20"
            />
            <p className="text-xs text-zinc-400 text-right">{form.metaDescription.length}/160</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="slug" className="text-xs text-zinc-600">
              Slug
            </Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              aria-invalid={!slugValid}
            />
            <p className="text-xs text-zinc-400">
              yourdomain.com{meta.publicPath}/{form.slug || 'your-slug'}
            </p>
            {!slugValid && (
              <p className="text-xs text-red-500">
                Only lowercase letters, numbers, and hyphens are allowed.
              </p>
            )}
            {slugWarning && <p className="text-xs text-red-500">{slugWarning}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="canonicalUrl" className="text-xs text-zinc-600">
              Canonical URL
            </Label>
            <Input
              id="canonicalUrl"
              value={form.canonicalUrl}
              onChange={(e) => update('canonicalUrl', e.target.value)}
              placeholder="Leave blank to auto-generate"
            />
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6 max-w-lg space-y-6">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-600">Cover Image</Label>
            {form.coverImage && (
              <div className="relative w-full aspect-video rounded-lg border border-zinc-200 overflow-hidden">
                <Image
                  src={form.coverImage}
                  alt={form.coverImageAlt || 'Cover preview'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <UploadButton<OurFileRouter, 'imageUploader'>
              endpoint="imageUploader"
              content={{ button: form.coverImage ? 'Replace image' : 'Upload image' }}
              onClientUploadComplete={(res) => {
                const url = res?.[0]?.url
                if (url) update('coverImage', url)
              }}
              onUploadError={(err) => { toast.error(err.message) }}
            />
            <Input
              value={form.coverImageAlt}
              onChange={(e) => update('coverImageAlt', e.target.value)}
              placeholder="Alt text"
            />
          </div>

          {type === 'artifact' && (
            <div className="space-y-2">
              <Label className="text-xs text-zinc-600">Artifact File</Label>
              {form.fileUrl && (
                <p className="text-xs text-zinc-500 truncate">{form.fileUrl}</p>
              )}
              <UploadButton<OurFileRouter, 'pdfUploader'>
                endpoint="pdfUploader"
                content={{ button: form.fileUrl ? 'Replace file' : 'Upload file' }}
                onClientUploadComplete={(res) => {
                  const url = res?.[0]?.url
                  if (url) update('fileUrl', url)
                }}
                onUploadError={(err) => { toast.error(err.message) }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
