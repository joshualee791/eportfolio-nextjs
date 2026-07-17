import { Skeleton } from '@/components/ui/skeleton'
import PageContainer from '@/components/layout/PageContainer'

export default function WorkLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-12 w-32" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </PageContainer>
  )
}
