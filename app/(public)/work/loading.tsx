import { Skeleton } from '@/components/ui/skeleton'

export default function WorkLoading() {
  return (
    <main className="pt-32 pb-20 max-w-2xl mx-auto px-8">
      <Skeleton className="h-12 w-32 mx-auto" />
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </main>
  )
}
