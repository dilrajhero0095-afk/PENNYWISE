import { ArrowUpRight } from 'lucide-react'
import { AtelierMark } from './AtelierMark'

export function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="site-footer__top">
        <div>
          <span className="eyebrow">(03 — The studio)</span>
          <h2>Small team.<br /><em>Big signal.</em></h2>
        </div>
        <div className="site-footer__copy">
          <p>Atelier is an independent studio for brands that would rather be remembered than explained.</p>
          <a href="mailto:hello@atelier.studio" className="text-link">Say hello <ArrowUpRight size={15} strokeWidth={1.5} /></a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <AtelierMark compact />
        <div className="footer-links"><a href="#top">Back to top ↑</a><a href="mailto:hello@atelier.studio">hello@atelier.studio</a></div>
        <span className="footer-copyright">© Atelier 2024—26</span>
      </div>
    </footer>
  )
}
