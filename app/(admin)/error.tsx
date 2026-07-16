'use client'

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-white">
      <p className="text-xs text-zinc-400 uppercase tracking-widest">Something went wrong</p>
      <button
        type="button"
        onClick={() => reset()}
        className="h-9 px-4 rounded-md bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors"
      >
        Try again
      </button>
    </main>
  )
}
