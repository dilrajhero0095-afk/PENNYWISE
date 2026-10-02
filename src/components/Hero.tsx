import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__meta">
        <span>(01 — Intro)</span>
        <span>Independent digital atelier<br />for thoughtful brands</span>
        <span className="hero__availability"><i /> Available for selected projects</span>
      </div>

      <div className="hero__statement">
        <h1 id="hero-title">
          <span className="hero__line">Make the</span>
          <span className="hero__line hero__line--indent"><em>quiet</em> parts</span>
          <span className="hero__line hero__line--right">magnetic<span className="hero__period">.</span></span>
        </h1>
        <div className="hero__note">
          <p>We build identities, websites and moving ideas with a sharp point of view.</p>
          <a href="#work" className="circle-link" aria-label="Scroll to selected work"><ArrowDownRight size={19} strokeWidth={1.4} /></a>
        </div>
      </div>

      <div className="hero__footer">
        <span>Scroll to explore</span>
        <span className="hero__footer-line" aria-hidden="true" />
        <span className="hero__coordinates">40°42'46" N&nbsp;&nbsp; / &nbsp;&nbsp;74°00'21" W</span>
        <span className="hero__year">EST. 2021 <ArrowUpRight size={13} strokeWidth={1.5} /></span>
      </div>
    </section>
  )
}
