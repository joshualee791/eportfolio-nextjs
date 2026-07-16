import { notFound } from 'next/navigation'
import PostEditor from '@/components/admin/PostEditor'
import type { ContentType } from '@/lib/actions/slug'

const validTypes: ContentType[] = ['blog', 'case-study', 'artifact']

type NewPostPageProps = {
  params: Promise<{ type: string }>
}

export default async function NewPostPage({ params }: NewPostPageProps) {
  const { type } = await params
  if (!validTypes.includes(type as ContentType)) notFound()

  return <PostEditor type={type as ContentType} />
}
