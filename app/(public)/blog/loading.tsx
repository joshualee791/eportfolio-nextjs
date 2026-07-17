import { Skeleton } from '@/components/ui/skeleton'
import PageContainer from '@/components/layout/PageContainer'

export default function BlogLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-12 w-40" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
