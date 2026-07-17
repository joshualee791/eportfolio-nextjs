import Link from 'next/link'
import type { Metadata } from 'next'
import { Archive, BookOpen, FileText } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import { getSetting } from '@/lib/db/settings'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Work Samples',
  description: "Browse Joshua Lee Garza's artifacts and case studies.",
}

export default async function Work() {
  const resumeUrl = await getSetting('resumeUrl')
  const hasResume = Boolean(resumeUrl)

  return (
    <PageContainer>
      <PageHeader>Work</PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <Reveal delay={0.1} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/artifacts"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <Archive size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Artifacts</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Documents, slides, designs, and deliverables.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.2} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/case-studies"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <BookOpen size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Case Studies</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                In-depth write-ups — problem, approach, and outcome.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.3} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <a
              href={hasResume ? resumeUrl : '#'}
              target="_blank"
              rel="noopener"
              className={
                'block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all' +
                (hasResume ? '' : ' opacity-50 pointer-events-none')
              }
            >
              <FileText size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Resume</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Download my full resume as a PDF.
              </p>
            </a>
          </CrosshatchCard>
        </Reveal>
      </div>
    </PageContainer>
  )
}
