// Mirrors the site's own heading language: teal + heavy weight is reserved for
// the real page <h1> (see PageHeader), so content headings stay zinc-900.
// Content h2 borrows the uppercase/tracked/light "eyebrow" treatment used by
// SectionLabel, so it reads as "section" the same way it does at the page level.
// Content h3 uses the same bold, normal-case treatment as card titles.
export const proseClass =
  'prose prose-sm max-w-none ' +
  'prose-h1:text-lg prose-h1:font-bold prose-h1:text-zinc-900 prose-h1:tracking-tight prose-h1:mt-8 prose-h1:mb-3 ' +
  'prose-h2:text-base prose-h2:font-light prose-h2:uppercase prose-h2:tracking-[0.12em] prose-h2:text-zinc-900 prose-h2:mt-8 prose-h2:mb-3 ' +
  'prose-h3:text-sm prose-h3:font-bold prose-h3:text-zinc-900 prose-h3:mt-6 prose-h3:mb-2 ' +
  'prose-p:text-zinc-600 prose-p:text-xs prose-p:leading-snug ' +
  'prose-li:text-zinc-600 prose-li:text-xs prose-li:marker:text-zinc-300 ' +
  'prose-a:text-teal-600 prose-strong:text-zinc-900 ' +
  'prose-blockquote:text-zinc-500 prose-blockquote:border-zinc-200'

// A cleared Tiptap editor still outputs "<p></p>", not an empty string.
export function isEmptyHtml(html: string): boolean {
  return !html || html.replace(/<[^>]*>/g, '').trim().length === 0
}

type RichTextProps = {
  html: string
  className?: string
}

export default function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={className ? `${proseClass} ${className}` : proseClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
