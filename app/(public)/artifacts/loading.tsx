import { Skeleton } from '@/components/ui/skeleton'

export default function ArtifactsLoading() {
  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Skeleton className="h-12 w-48" />
      <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
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
