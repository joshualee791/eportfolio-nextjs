import Image from 'next/image'

type MonogramProps = {
  size?: number
  className?: string
}

export default function Monogram({ size = 32, className }: MonogramProps) {
  return (
    <Image
      src="/logo-owl.png"
      alt="Joshua Lee Garza"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}
