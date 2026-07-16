import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy } from '@/lib/db/schema'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'

type CaseStudyCardProps = {
  study: CaseStudy
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="block group">
      <CrosshatchCard rounded="rounded-xl" offset={6}>
        {study.coverImage ? (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100">
            <Image
              src={study.coverImage}
              alt={study.coverImageAlt ?? study.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-zinc-100 border border-zinc-200" />
        )}
      </CrosshatchCard>

      <h3 className="text-base font-bold text-zinc-900 mt-3 group-hover:text-teal-600 transition-colors">
        {study.title}
      </h3>
      <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{study.summary}</p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {study.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] bg-teal-50 text-teal-600 rounded px-1.5 py-0.5"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="text-teal-600 text-xs font-medium mt-3">Read case study →</p>
    </Link>
  )
}
