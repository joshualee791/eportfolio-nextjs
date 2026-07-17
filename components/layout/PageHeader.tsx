import Reveal from '@/components/portfolio/Reveal'

export default function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
        {children}
      </h1>
    </Reveal>
  )
}
