import { BarChart3, CircleDollarSign, LayoutDashboard, MoreHorizontal, ReceiptText } from 'lucide-react'
import type { ViewName } from '../../finance/types'

type BottomNavProps = { view: ViewName; onNavigate: (view: ViewName) => void }
const items: { id: ViewName; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'transactions', label: 'Activity', icon: ReceiptText },
  { id: 'budgets', label: 'Budgets', icon: CircleDollarSign },
  { id: 'analytics', label: 'Insights', icon: BarChart3 },
  { id: 'more', label: 'More', icon: MoreHorizontal },
]
export function BottomNav({ view, onNavigate }: BottomNavProps) { return <nav className="bottom-nav">{items.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? 'is-active' : ''} onClick={() => onNavigate(id)}><Icon size={19} strokeWidth={1.8} /><span>{label}</span></button>)}</nav> }
