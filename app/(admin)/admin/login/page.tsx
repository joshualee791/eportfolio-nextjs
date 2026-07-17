import { loginAction } from '@/lib/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Monogram from '@/components/layout/Monogram'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center relative z-10 px-6">
      <div className="w-full max-w-sm">
        <Monogram size={36} className="mb-8" />

        <h1 className="text-xl font-bold text-zinc-900 mb-6">Admin Login</h1>

        <form action={loginAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs text-zinc-600">
              Email
            </Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-xs text-zinc-600">
              Password
            </Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <button
            type="submit"
            className="mt-2 h-9 rounded-md bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-xs">
            Invalid email or password. Please try again.
          </p>
        )}
      </div>
    </main>
  )
}
