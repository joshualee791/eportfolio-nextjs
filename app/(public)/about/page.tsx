import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Newspaper, GraduationCap, Sparkles } from 'lucide-react'
import { getSettings } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Joshua Lee Garza — Computer Science Student & Full-Stack Developer.',
}

export default async function About() {
  const { aboutText, aboutImageUrl } = await getSettings(['aboutText', 'aboutImageUrl'])
  const paragraphs = aboutText ? aboutText.split('\n\n').filter(Boolean) : []

  return (
    <main id="main-content" className="pt-32 pb-20 max-w-2xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">About</h1>
      </Reveal>

      {aboutImageUrl && (
        <Reveal delay={0.1} className="mt-8">
          <Image
            src={aboutImageUrl}
            alt="Joshua Lee Garza"
            width={320}
            height={400}
            className="rounded-2xl max-w-xs w-full h-auto object-cover"
          />
        </Reveal>
      )}

      <Reveal delay={0.2} className="mt-8 space-y-4">
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

      <div className="flex flex-col sm:flex-row gap-6 mt-10">
        <Reveal delay={0.3} className="flex-1">
          <CrosshatchCard className="w-full h-full" offset={6}>
            <Link
              href="/blog"
              className="block h-full bg-white border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <Newspaper size={32} className="text-teal-600" />
              <h2 className="text-lg font-bold text-zinc-900 mt-4">Blog</h2>
              <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
                Writing on software, design, and engineering.
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
    </main>
  )
}
