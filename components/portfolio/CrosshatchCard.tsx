import { cn } from '@/lib/utils'

type CrosshatchCardProps = {
  children: React.ReactNode
  className?: string
  rounded?: string
  offset?: number
}

export default function CrosshatchCard({
  children,
  className,
  rounded = 'rounded-2xl',
  offset = 12,
}: CrosshatchCardProps) {
  return (
    <div className={cn('relative', className)} style={{ paddingBottom: offset, paddingRight: offset }}>
      <div
        className={cn('absolute inset-0', rounded)}
        style={{
          transform: `translate(${offset}px, ${offset}px)`,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(13, 148, 136, 0.35) 0px,
              rgba(13, 148, 136, 0.35) 1px,
              transparent 1px,
              transparent 7px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(13, 148, 136, 0.22) 0px,
              rgba(13, 148, 136, 0.22) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
          backgroundColor: 'rgba(13, 148, 136, 0.04)',
        }}
        aria-hidden="true"
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
