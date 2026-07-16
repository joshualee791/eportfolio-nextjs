import Image from 'next/image'
import Link from 'next/link'
import { Archive, Presentation, PenTool, Link2 } from 'lucide-react'
import type { Artifact } from '@/lib/db/schema'

const typeIcon: Record<string, typeof Archive> = {
  pdf: Archive,
  slides: Presentation,
  design: PenTool,
  link: Link2,
}

type ArtifactCardProps = {
  artifact: Artifact
}

export default function ArtifactCard({ artifact }: ArtifactCardProps) {
  const Icon = typeIcon[artifact.type] ?? Archive

  return (
    <Link
      href={`/artifacts/${artifact.slug}`}
      className="block group hover:shadow-sm hover:scale-[1.01] transition-all rounded-xl"
    >
      {artifact.coverImage ? (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100">
          <Image
            src={artifact.coverImage}
            alt={artifact.coverImageAlt ?? artifact.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
          <Icon size={32} className="text-zinc-300" />
        </div>
      )}

      <h3 className="text-sm font-bold text-zinc-900 mt-3 group-hover:text-teal-600 transition-colors">
        {artifact.title}
      </h3>
      <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{artifact.description}</p>

      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <span className="text-[10px] uppercase tracking-wide border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-400">
          {artifact.type}
        </span>
        {artifact.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] bg-teal-50 text-teal-600 rounded px-1.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
