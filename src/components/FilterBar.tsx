import { categories, type WorkCategory } from '../data/works'

type FilterBarProps = {
  activeCategory: WorkCategory
  onChange: (category: WorkCategory) => void
}

export function FilterBar({ activeCategory, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter selected work">
      <span className="filter-bar__label">Filter by</span>
      <div className="filter-bar__options">
        {categories.map((category) => (
          <button
            className={`filter-button ${activeCategory === category.value ? 'is-active' : ''}`}
            key={category.value}
            type="button"
            aria-pressed={activeCategory === category.value}
            onClick={() => onChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
