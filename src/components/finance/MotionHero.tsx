import { ArrowDownRight, ArrowUpRight, CircleDollarSign, Sparkles } from 'lucide-react'

type MotionHeroProps = { onQuickAdd: () => void; balance: number; goalProgress: number; saved: number; cashFlowRate: number }

export function MotionHero({ onQuickAdd, balance, goalProgress, saved, cashFlowRate }: MotionHeroProps) {
  return <section className="motion-stage" aria-label="Pennywise motion introduction">
    <div className="motion-stage__glow motion-stage__glow--one" />
    <div className="motion-stage__glow motion-stage__glow--two" />
    <div className="motion-stage__bubbles" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="motion-stage__copy">
      <span className="motion-stage__eyebrow"><Sparkles size={13} /> Personal finance, in motion</span>
      <h2 aria-label="Make your money move."><span className="text-reveal text-reveal--one">Make your</span><br /><em className="text-reveal text-reveal--two">money</em><span className="text-reveal text-reveal--three"> move.</span></h2>
      <p>A clearer view of your money, with a little more momentum behind every decision.</p>
      <button className="motion-stage__cta" onClick={onQuickAdd}>Add something new <span><ArrowDownRight size={16} /></span></button>
    </div>
    <div className="motion-stage__orbit motion-stage__orbit--one" aria-hidden="true" />
    <div className="motion-stage__orbit motion-stage__orbit--two" aria-hidden="true" />
    <div className="motion-token motion-token--balance"><span>Current balance</span><strong>₹{Math.round(balance).toLocaleString('en-IN')}</strong><small><ArrowUpRight size={11} /> imported</small></div>
    <div className="motion-token motion-token--goal"><CircleDollarSign size={17} /><span>Goal progress</span><strong>{goalProgress}%</strong></div>
    <div className="motion-token motion-token--save"><span>Saved from flow</span><strong>₹{Math.round(saved).toLocaleString('en-IN')}</strong></div>
    <div className="motion-graph" aria-label="Cash flow trend graphic">
      <div className="motion-graph__top"><span>Cash flow</span><b>{cashFlowRate >= 0 ? '+' : ''}{cashFlowRate}%</b></div>
      <svg viewBox="0 0 300 108" role="img" aria-hidden="true"><path className="motion-graph__grid" d="M0 20H300M0 54H300M0 88H300" /><path className="motion-graph__area" d="M0 88 C24 78 27 71 48 76 S78 51 96 61 S122 30 143 43 S166 68 184 54 S212 59 228 39 S264 46 300 16 L300 108 L0 108Z" /><path className="motion-graph__line" d="M0 88 C24 78 27 71 48 76 S78 51 96 61 S122 30 143 43 S166 68 184 54 S212 59 228 39 S264 46 300 16" /><circle cx="228" cy="39" r="4" /><circle cx="300" cy="16" r="4" /></svg>
      <div className="motion-graph__labels"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div>
    </div>
    <div className="motion-stage__stamp">CALM MONEY<br /><b>BETTER HABITS</b></div>
    <div className="motion-stage__scroll"><span>Scroll to explore</span><i /></div>
  </section>
}
