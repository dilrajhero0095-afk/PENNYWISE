import { ArrowDownRight, Menu } from 'lucide-react'
import { AtelierMark } from './AtelierMark'

export function Header() {
  return (
    <header className="site-header">
      <AtelierMark />
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#work">Selected work <ArrowDownRight size={14} strokeWidth={1.8} /></a>
        <a href="#about">About <ArrowDownRight size={14} strokeWidth={1.8} /></a>
      </nav>
      <a className="header-contact" href="mailto:hello@atelier.studio">
        Start a conversation <span className="header-contact__arrow">↗</span>
      </a>
      <button className="mobile-menu" aria-label="Open navigation"><Menu size={21} strokeWidth={1.6} /></button>
    </header>
  )
}
