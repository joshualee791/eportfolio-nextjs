import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Newspaper, GraduationCap, Sparkles } from 'lucide-react'
import { getSettings } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Joshua Lee Garza — Computer Science Student & Full-Stack Developer.',
}

export default async function About() {
  const { aboutText, aboutImageUrl } = await getSettings(['aboutText', 'aboutImageUrl'])
  const paragraphs = aboutText ? aboutText.split('\n\n').filter(Boolean) : []

  return (
    <PageContainer>
      <PageHeader>About</PageHeader>

      <div className="max-w-4xl mt-8 flex flex-col md:flex-row gap-8 md:gap-10">
        {aboutImageUrl && (
          <Reveal delay={0.1} className="md:w-1/3 shrink-0">
            <CrosshatchCard className="w-full">
              <div
                className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 h-full"
                style={{ aspectRatio: '3/4' }}
              >
                <Image src={aboutImageUrl} alt="Joshua Lee Garza" fill className="object-cover" />
              </div>
            </CrosshatchCard>
          </Reveal>
        )}

        <Reveal delay={0.2} className="md:w-2/3 space-y-4">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="text-xs font-normal text-zinc-600 leading-snug">
                {p}
              </p>
            ))
          ) : (
            <p className="text-zinc-300 text-xs">Content coming soon.</p>
          )}
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <Reveal delay={0.3} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/blog"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <Newspaper size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Blog</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Writing on operations, analytics, and process automation.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.4} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/education"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <GraduationCap size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Education</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Academic background and coursework.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>

        <Reveal delay={0.5} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/skills"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <Sparkles size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Skills</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Technical skills and areas of expertise.
              </p>
            </Link>
          </CrosshatchCard>
        </Reveal>
      </div>
    </PageContainer>
  )
}
