import { Skeleton } from '@/components/ui/skeleton'

export default function CaseStudiesLoading() {
  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Skeleton className="h-12 w-56" />
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </main>
  )
}
