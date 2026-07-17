import { Skeleton } from '@/components/ui/skeleton'
import PageContainer from '@/components/layout/PageContainer'

export default function AboutLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-12 w-32" />
      <div className="max-w-2xl mt-8 space-y-4">
        <Skeleton className="h-64 w-64 rounded-2xl" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </PageContainer>
  )
}
