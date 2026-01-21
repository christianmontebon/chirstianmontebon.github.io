import ArchiveLayout from '../ui/ArchiveLayout'
import { notes } from '../data/notes'

type NoteMeta = {
  title: string
  date: string
  slug: string
}

export default function NotesPage() {
  const items: NoteMeta[] = notes
    .map(n => ({
      title: n.title,
      date: n.date,
      slug: n.slug,
      tags: n.tags,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <ArchiveLayout
      title="Notes"
      description="shower thoughts and some random shits"
      items={items}
      basePath="/notes"
      showFilters={true}
    />
  )
}
