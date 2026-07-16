import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Skeleton className="h-12 w-40" />
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  )
}
