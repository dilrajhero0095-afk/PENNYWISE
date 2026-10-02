import { BarChart3, CircleDollarSign, LayoutDashboard, Monitor, MoreHorizontal, PiggyBank, ReceiptText, Settings2, Sun, Moon } from 'lucide-react'
import type { ViewName } from '../../finance/types'

type SidebarProps = { view: ViewName; onNavigate: (view: ViewName) => void; dark: boolean; theme: 'light' | 'dark' | 'system'; onTheme: () => void; transactionCount: number }

const items: { id: ViewName; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ReceiptText },
  { id: 'budgets', label: 'Budgets', icon: CircleDollarSign },
  { id: 'goals', label: 'Savings goals', icon: PiggyBank },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

export function Sidebar({ view, onNavigate, dark, theme, onTheme, transactionCount }: SidebarProps) {
  return <aside className="finance-sidebar">
    <div className="finance-brand"><span className="finance-brand__mark">◒</span><span>pennywise</span></div>
    <div className="sidebar-caption">Workspace</div>
    <nav className="sidebar-nav" aria-label="Finance navigation">
      {items.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? 'is-active' : ''} onClick={() => onNavigate(id)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{id === 'transactions' && <small>{transactionCount}</small>}</button>)}
    </nav>
    <div className="sidebar-spacer" />
    <button className={view === 'more' ? 'sidebar-more is-active' : 'sidebar-more'} onClick={() => onNavigate('more')}><Settings2 size={18} strokeWidth={1.8} /><span>Settings</span></button>
    <button className="theme-switch" onClick={onTheme}><span>{theme === 'system' ? <Monitor size={16} /> : dark ? <Moon size={16} /> : <Sun size={16} />}</span>{theme === 'system' ? 'System mode' : dark ? 'Dark mode' : 'Light mode'}<i /></button>
    <div className="sidebar-profile"><span className="avatar">₹</span><span><b>Local workspace</b><small>Private by default</small></span><MoreHorizontal size={16} /></div>
  </aside>
}
