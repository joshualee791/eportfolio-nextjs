'use client'

import Image from 'next/image'
import { UploadButton } from '@uploadthing/react'
import { ImageIcon } from 'lucide-react'
import type { OurFileRouter } from '@/lib/uploadthing'
import { Label } from '@/components/ui/label'

type HeroImageFieldProps = {
  label: string
  value: string
  onChange: (url: string) => void
}

export default function HeroImageField({ label, value, onChange }: HeroImageFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-zinc-600">{label}</Label>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={20} className="text-zinc-300" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <UploadButton<OurFileRouter, 'imageUploader'>
            endpoint="imageUploader"
            content={{ allowedContent: () => null }}
            appearance={{
              button:
                'bg-teal-600 text-white hover:bg-teal-700 text-xs font-medium px-3 h-8 rounded-2xl ut-uploading:opacity-50 focus-within:ring-0',
              container: 'items-start',
              allowedContent: 'hidden',
            }}
            onClientUploadComplete={(res) => {
              const url = res?.[0]?.url
              if (url) onChange(url)
            }}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
