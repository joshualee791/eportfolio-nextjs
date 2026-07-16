'use client'

import Link from 'next/link'
import { ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ContentTable, { type ContentTableItem } from '@/components/admin/ContentTable'
import { deleteBlogPost } from '@/lib/actions/blog'
import { deleteCaseStudy } from '@/lib/actions/caseStudies'
import { deleteArtifact } from '@/lib/actions/artifacts'

type ContentManagerProps = {
  blogPosts: ContentTableItem[]
  caseStudies: ContentTableItem[]
  artifacts: ContentTableItem[]
}

export default function ContentManager({ blogPosts, caseStudies, artifacts }: ContentManagerProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Content</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-1.5">
              <Plus size={14} />
              New Post
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/admin/content/new/blog">New Blog Post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/content/new/case-study">New Case Study</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/content/new/artifact">New Artifact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="blog" className="mt-8">
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="case-study">Case Studies</TabsTrigger>
          <TabsTrigger value="artifact">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="mt-6">
          <ContentTable
            items={blogPosts}
            type="blog"
            onDelete={deleteBlogPost}
            emptyLabel="No blog posts yet."
          />
        </TabsContent>

        <TabsContent value="case-study" className="mt-6">
          <ContentTable
            items={caseStudies}
            type="case-study"
            onDelete={deleteCaseStudy}
            emptyLabel="No case studies yet."
          />
        </TabsContent>

        <TabsContent value="artifact" className="mt-6">
          <ContentTable
            items={artifacts}
            type="artifact"
            onDelete={deleteArtifact}
            emptyLabel="No artifacts yet."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
