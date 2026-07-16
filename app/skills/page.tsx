import { getSetting } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'

type SkillCategory = {
  category: string
  items: string[]
}

export default async function Skills() {
  const raw = await getSetting('skillsContent')
  let categories: SkillCategory[] = []
  try {
    categories = raw ? JSON.parse(raw) : []
  } catch {
    categories = []
  }

  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Skills</h1>
      </Reveal>

      {categories.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">Skills coming soon.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-10 mt-10">
          {categories.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.1}>
              <h2 className="text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight">
                {cat.category}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-zinc-600 border border-zinc-200 rounded-full px-3 py-1 hover:border-teal-400 hover:text-teal-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  )
}
