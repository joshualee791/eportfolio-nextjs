import Link from 'next/link'
import type { Metadata } from 'next'
import { Archive, BookOpen } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'

export const metadata: Metadata = {
  title: 'Work Samples',
  description: "Browse Joshua Lee Garza's artifacts and case studies.",
}

export default function Work() {
  return (
    <main id="main-content" className="pt-32 pb-20 max-w-2xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight text-center">
          Work
        </h1>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
        <Reveal delay={0.1}>
          <Link
            href="/artifacts"
            className="block h-full border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
          >
            <Archive size={32} className="text-teal-600" />
            <h2 className="text-lg font-bold text-zinc-900 mt-4">Artifacts</h2>
            <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
              Documents, slides, designs, and deliverables.
            </p>
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/case-studies"
            className="block h-full border border-zinc-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-sm transition-all"
          >
            <BookOpen size={32} className="text-teal-600" />
            <h2 className="text-lg font-bold text-zinc-900 mt-4">Case Studies</h2>
            <p className="text-xs font-normal text-zinc-600 leading-snug mt-1">
              In-depth write-ups — problem, approach, and outcome.
            </p>
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
