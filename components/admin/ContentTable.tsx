'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

export type ContentTableItem = {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  updatedAt: Date | null
}

type SortKey = 'title' | 'slug' | 'status' | 'updatedAt'

type ContentTableProps = {
  items: ContentTableItem[]
  type: 'blog' | 'case-study' | 'artifact'
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  emptyLabel: string
}

export default function ContentTable({ items, type, onDelete, emptyLabel }: ContentTableProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')
  const [sortAsc, setSortAsc] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = q
      ? items.filter((item) => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q))
      : items

    const sorted = [...rows].sort((a, b) => {
      let cmp = 0
      if (sortKey === 'updatedAt') {
        cmp = (a.updatedAt?.getTime() ?? 0) - (b.updatedAt?.getTime() ?? 0)
      } else {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]))
      }
      return sortAsc ? cmp : -cmp
    })

    return sorted
  }, [items, query, sortKey, sortAsc])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const result = await onDelete(id)
    setDeletingId(null)
    if (result.success) {
      router.refresh()
    }
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'status', label: 'Status' },
    { key: 'updatedAt', label: 'Updated' },
  ]

  return (
    <div>
      <Input
        placeholder="Search by title or slug..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xs mb-4"
      />

      {filtered.length === 0 ? (
        <p className="text-zinc-300 text-xs py-8 text-center">
          {items.length === 0 ? emptyLabel : 'No results match your search.'}
        </p>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-100">
              {columns.map((col) => (
                <th key={col.key} className="text-left font-medium text-zinc-400 py-2">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1 hover:text-zinc-900 transition-colors uppercase tracking-wide"
                  >
                    {col.label}
                    <ArrowUpDown size={11} />
                  </button>
                </th>
              ))}
              <th className="text-right font-medium text-zinc-400 py-2 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-zinc-50 hover:bg-zinc-50/50">
                <td className="py-2.5 text-zinc-900 font-medium">{item.title}</td>
                <td className="py-2.5 text-zinc-500">{item.slug}</td>
                <td className="py-2.5">
                  <span
                    className={cn(
                      'inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide',
                      item.status === 'published'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                    )}
                  >
                    {item.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-2.5 text-zinc-500">
                  {item.updatedAt
                    ? item.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : '—'}
                </td>
                <td className="py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link href={`/admin/content/edit/${type}/${item.id}`} aria-label="Edit">
                        <Pencil size={13} />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label="Delete">
                          <Trash2 size={13} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete &ldquo;{item.title}&rdquo;?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this{' '}
                            {type.replace('-', ' ')} and remove it from the public site.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
