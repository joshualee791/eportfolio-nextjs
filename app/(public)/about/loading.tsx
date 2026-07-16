import { Skeleton } from '@/components/ui/skeleton'

export default function AboutLoading() {
  return (
    <main className="pt-32 pb-20 max-w-2xl mx-auto px-8">
      <Skeleton className="h-12 w-32" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-64 w-64 rounded-2xl" />
        <Skeleton className="h-32 w-full" />
      </div>
    </main>
  )
}
