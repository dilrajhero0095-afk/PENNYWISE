import { ArrowUpRight, CircleDollarSign, Monitor, Moon, Sun, UserRound } from 'lucide-react'
import type { ViewName } from '../../finance/types'

type ImmersiveNavProps = { view: ViewName; onNavigate: (view: ViewName) => void; onQuickAdd: () => void; onAccount: () => void; user: string | null; theme: 'light' | 'dark' | 'system'; dark: boolean; onTheme: () => void }
const links: Array<[ViewName, string]> = [['dashboard', 'Home'], ['transactions', 'Activity'], ['budgets', 'Budgets'], ['goals', 'Goals'], ['analytics', 'Insights'], ['more', 'Data']]

export function ImmersiveNav({ view, onNavigate, onQuickAdd, onAccount, user, theme, dark, onTheme }: ImmersiveNavProps) {
  return <header className="immersive-nav"><button className="immersive-brand" onClick={() => onNavigate('dashboard')}><span><CircleDollarSign size={18} /></span><b>pennywise</b></button><nav>{links.map(([name, label]) => <button key={name} className={view === name ? 'is-active' : ''} onClick={() => onNavigate(name)}>{label}</button>)}</nav><div className="immersive-nav__actions"><span className="immersive-local-badge" title="Supabase Auth protects your account">SUPABASE AUTH</span><button className="immersive-account" onClick={onAccount}><UserRound size={14} /> {user ?? 'Sign in'}</button><button className="immersive-theme" onClick={onTheme} aria-label={`Theme: ${theme}. Click to change`}>{theme === 'system' ? <Monitor size={15} /> : dark ? <Moon size={15} /> : <Sun size={15} />}</button><button className="immersive-contact" onClick={onQuickAdd}>Add entry <span><ArrowUpRight size={14} /></span></button></div></header>
}
