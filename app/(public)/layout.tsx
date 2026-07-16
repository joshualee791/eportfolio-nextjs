import Header from '@/components/layout/Header'
import TopoBackground from '@/components/home/TopoBackground'
import { getSettings } from '@/lib/db/settings'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const { resumeUrl, linkedinUrl } = await getSettings(['resumeUrl', 'linkedinUrl'])

  return (
    <>
      <TopoBackground />
      <div className="relative z-10">
        <Header resumeUrl={resumeUrl} linkedinUrl={linkedinUrl} />
        {children}
      </div>
    </>
  )
}
