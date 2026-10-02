import { ArrowDownRight, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { MotionVisuals, type MotionVisualData } from './MotionVisuals'

type MotionTemplateProps = {
  kicker: string
  title: string
  accent: string
  description: string
  children: ReactNode
  showBanner?: boolean
  variant: 'dashboard' | 'transactions' | 'budgets' | 'goals' | 'analytics' | 'more'
  visualData: MotionVisualData
}

export function MotionTemplate({ kicker, title, accent, description, children, showBanner = true, variant, visualData }: MotionTemplateProps) {
  return <main className={`motion-template motion-template--${accent}`}>
    {showBanner && <header className="template-banner">
      <div className="template-banner__glow" />
      <div className="template-banner__bubbles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="template-banner__copy"><span><Sparkles size={12} /> {kicker}</span><h1 className="shiny-text">{title} <em>{accent}</em></h1><p>{description}</p></div><MotionVisuals variant={variant} data={visualData} />
      <div className="template-banner__stamp">PENNYWISE<br /><b>MOVE WITH INTENT</b></div>
      <button className="template-banner__scroll" onClick={() => document.querySelector('.template-content')?.scrollIntoView({ behavior: 'smooth' })}>Explore <ArrowDownRight size={14} /></button>
    </header>}
    <div className="template-content">{children}</div>
  </main>
}
