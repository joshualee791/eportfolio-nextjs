import { getSetting } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'

type EducationItem = {
  institution: string
  degree: string
  period: string
  description?: string
  current?: boolean
}

export default async function Education() {
  const raw = await getSetting('educationContent')
  let items: EducationItem[] = []
  try {
    items = raw ? JSON.parse(raw) : []
  } catch {
    items = []
  }

  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
          Education
        </h1>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">Education history coming soon.</p>
        </Reveal>
      ) : (
        <div className="mt-10 space-y-10">
          {items.map((item, i) => (
            <Reveal key={`${item.institution}-${i}`} delay={i * 0.1}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight">
                  {item.institution}
                </h2>
                {item.current && (
                  <span className="text-xs text-teal-600 border border-teal-600 rounded-full px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-xs uppercase tracking-wide mt-1">
                {item.degree} · {item.period}
              </p>
              {item.description && (
                <p className="text-xs font-normal text-zinc-600 leading-snug mt-2 max-w-2xl">
                  {item.description}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </main>
  )
}
