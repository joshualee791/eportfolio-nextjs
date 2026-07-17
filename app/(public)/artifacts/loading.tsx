import { Skeleton } from '@/components/ui/skeleton'
import PageContainer from '@/components/layout/PageContainer'

export default function ArtifactsLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-12 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
