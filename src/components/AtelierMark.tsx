type AtelierMarkProps = {
  compact?: boolean
}

export function AtelierMark({ compact = false }: AtelierMarkProps) {
  return (
    <a href="#top" className={`atelier-mark ${compact ? 'atelier-mark--compact' : ''}`} aria-label="Atelier home">
      <span className="atelier-mark__dot" aria-hidden="true" />
      <span className="atelier-mark__word">Atelier</span>
      {!compact && <span className="atelier-mark__descriptor">Digital works</span>}
    </a>
  )
}
