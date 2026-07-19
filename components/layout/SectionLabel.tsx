export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight">
      {children}
    </h2>
  )
}
