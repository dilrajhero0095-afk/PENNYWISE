import type { Work, WorkCategory } from '../data/works'
import { WorkCard } from './WorkCard'

type WorksGridProps = {
  activeCategory: WorkCategory
  works: Work[]
  selectedWork: Work | null
  onSelect: (work: Work) => void
}

export function WorksGrid({ activeCategory, works, selectedWork, onSelect }: WorksGridProps) {
  const filteredWorks = activeCategory === 'all'
    ? works
    : works.filter((work) => work.category === activeCategory)

  return (
    <div className="works-grid" aria-live="polite">
      {filteredWorks.map((work) => (
        <WorkCard key={work.id} work={work} onSelect={onSelect} isSelected={selectedWork?.id === work.id} />
      ))}
      {filteredWorks.length === 0 && <p className="works-empty">No work in this category yet. Try another lens.</p>}
    </div>
  )
}
