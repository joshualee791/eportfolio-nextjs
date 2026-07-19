import { cn } from '@/lib/utils'

type PageContainerProps = {
  variant?: 'index' | 'detail'
  className?: string
  children: React.ReactNode
}

export default function PageContainer({
  variant = 'index',
  className,
  children,
}: PageContainerProps) {
  return (
    <main
      id="main-content"
      className={cn(
        'mx-auto px-6 sm:px-8 pt-32 pb-20',
        variant === 'index' ? 'max-w-5xl' : 'max-w-3xl',
        className
      )}
    >
      {children}
    </main>
  )
}
