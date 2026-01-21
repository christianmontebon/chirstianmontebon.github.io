import ArchiveLayout from '../ui/ArchiveLayout'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const items = projects.map(p => ({
    title: p.title,
    slug: p.url, // external link
    description: p.description,
    topics: p.topics,
    tools: p.tools,
  }))

  return (
    <ArchiveLayout
      title="Projects"
      description="Selected work. Simple links, no fluff."
      items={items}
      showFilters={true}
    />
  )
}

