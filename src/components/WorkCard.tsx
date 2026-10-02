import { ArrowUpRight } from 'lucide-react'
import type { Work } from '../data/works'

type WorkCardProps = {
  work: Work
  onSelect: (work: Work) => void
  isSelected: boolean
}

export function WorkCard({ work, onSelect, isSelected }: WorkCardProps) {
  return (
    <button
      className={`work-card ${work.featured ? 'work-card--featured' : ''} ${isSelected ? 'is-selected' : ''}`}
      type="button"
      onClick={() => onSelect(work)}
      aria-pressed={isSelected}
      aria-label={`View details for ${work.title}`}
    >
      <div className={`work-card__art ${work.art}`} aria-hidden="true">
        <span className="art__index">{work.index} / {work.category}</span>
        <span className="art__shape art__shape--one" />
        <span className="art__shape art__shape--two" />
        <span className="art__shape art__shape--three" />
        {work.art === 'art-kinetic' && <span className="art__kinetic-word">TYPE<br />MOVES</span>}
        {work.art === 'art-field' && <span className="art__field-word">FIELD<br />NOTES</span>}
        {work.art === 'art-serein' && <span className="art__serein-word">serein<span>.</span></span>}
        {work.art === 'art-noya' && <span className="art__noya-word">NOYA<br /><small>OBJECTS</small></span>}
        {work.art === 'art-alba' && <span className="art__alba-word">ALBA<br /><small>HOUSE</small></span>}
        <span className="work-card__arrow"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
      </div>
      <div className="work-card__info">
        <span className="work-card__title">{work.title}</span>
        <span className="work-card__client">{work.client}</span>
        <span className="work-card__year">{work.year}</span>
      </div>
      <div className="work-card__reveal"><span>{work.format}</span><span>Open case ↗</span></div>
    </button>
  )
}
