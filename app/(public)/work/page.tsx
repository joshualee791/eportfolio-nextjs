import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Archive, BookOpen, FileText } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import RichText, { isEmptyHtml } from '@/components/portfolio/RichText'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import { getSettings } from '@/lib/db/settings'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'
import SectionLabel from '@/components/layout/SectionLabel'

export const metadata: Metadata = {
  title: 'Work Samples',
  description: "Browse Joshua Lee Garza's artifacts and case studies.",
}

export default async function Work() {
  const { resumeUrl, workText, workImageUrl } = await getSettings(['resumeUrl', 'workText', 'workImageUrl'])
  const hasResume = Boolean(resumeUrl)

  return (
    <PageContainer>
      <PageHeader>Work</PageHeader>

      <div className="max-w-4xl mt-8 flex flex-col md:flex-row gap-8 md:gap-10">
        {workImageUrl && (
          <Reveal delay={0.1} className="md:w-1/3 shrink-0">
            <CrosshatchCard className="w-full">
              <div
                className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 h-full"
                style={{ aspectRatio: '3/4' }}
              >
                <Image src={workImageUrl} alt="Joshua Lee Garza's work" fill className="object-cover" />
              </div>
            </CrosshatchCard>
          </Reveal>
        )}

        <Reveal delay={0.2} className="md:w-2/3">
          {isEmptyHtml(workText) ? (
            <p className="text-zinc-300 text-xs">Content coming soon.</p>
          ) : (
            <RichText html={workText} />
          )}
        </Reveal>
      </div>

      <div className="border-t border-zinc-100 my-10" />

      <Reveal delay={0.3}>
        <SectionLabel>Browse</SectionLabel>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <Reveal delay={0.3} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/artifacts"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <Archive size={32} className="text-teal-600" />
              <h3 className="text-lg font-bold text-zinc-900 mt-4">Artifacts</h3>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Documents, slides, designs, and deliverables.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.4} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/case-studies"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <BookOpen size={32} className="text-teal-600" />
              <h3 className="text-lg font-bold text-zinc-900 mt-4">Case Studies</h3>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                In-depth write-ups — problem, approach, and outcome.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.5} className="flex-1">
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
              <h3 className="text-lg font-bold text-zinc-900 mt-4">Resume</h3>
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
