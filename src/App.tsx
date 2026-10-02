import { useEffect, useMemo, useState } from 'react'
import { BottomNav } from './components/finance/BottomNav'
import { BudgetsView } from './components/finance/BudgetsView'
import { DashboardView } from './components/finance/DashboardView'
import { GoalsView } from './components/finance/GoalsView'
import { AnalyticsView } from './components/finance/AnalyticsView'
import { MoreView } from './components/finance/MoreView'
import { MotionTemplate } from './components/finance/MotionTemplate'
import { ImmersiveNav } from './components/finance/ImmersiveNav'
import type { MotionVisualData } from './components/finance/MotionVisuals'
import { Sidebar } from './components/finance/Sidebar'
import { Topbar } from './components/finance/Topbar'
import { TransactionModal } from './components/finance/TransactionModal'
import { AccountModal } from './components/finance/AccountModal'
import { TransactionsView } from './components/finance/TransactionsView'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { exportFinanceState, loadFinanceState, saveFinanceState } from './finance/storage'
import { importTransactions } from './finance/importTransactions'
import { deriveTrackerData } from './finance/derived'
import { deleteAuthenticatedTransaction, saveAuthenticatedTransaction, syncAuthenticatedTransactions } from './finance/cloudSync'
import { seedState, type Budget, type FinanceState, type Goal, type Transaction, type ViewName } from './finance/types'

function App() {
  const [state, setState] = useState<FinanceState>(loadFinanceState)
  const [view, setView] = useState<ViewName>('dashboard')
  const [modal, setModal] = useState<{ open: boolean; transaction?: Transaction | null }>({ open: false })
  const [accountModal, setAccountModal] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [search, setSearch] = useState('')
  const [importNotice, setImportNotice] = useState('')
  const [systemDark, setSystemDark] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  const dark = state.theme === 'dark' || (state.theme === 'system' && systemDark)
  useEffect(() => { const media = window.matchMedia?.('(prefers-color-scheme: dark)'); if (!media) return; const sync = () => setSystemDark(media.matches); sync(); media.addEventListener?.('change', sync); return () => media.removeEventListener?.('change', sync) }, [])
  useEffect(() => { if (!supabase) return; let active = true; supabase.auth.getUser().then(({ data }) => { if (active) setAuthUser(data.user) }); const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setAuthUser(session?.user ?? null)); return () => { active = false; subscription.unsubscribe() } }, [])
  useEffect(() => { if (!authUser) return; let active = true; syncAuthenticatedTransactions(authUser, state.transactions).then(({ remote }) => { if (active && remote.length) setState((current) => ({ ...current, transactions: remote })) }); return () => { active = false } }, [authUser?.id])
  useEffect(() => { saveFinanceState(state) }, [state])
  const updateState = (patch: Partial<FinanceState>) => setState((current) => ({ ...current, ...patch }))
  const handleSave = (transaction: Transaction) => { setState((current) => ({ ...current, transactions: current.transactions.some((item) => item.id === transaction.id) ? current.transactions.map((item) => item.id === transaction.id ? transaction : item) : [transaction, ...current.transactions] })); void saveAuthenticatedTransaction(authUser, transaction); setModal({ open: false }) }
  const handleDelete = (id: string) => { if (window.confirm('Delete this transaction? This cannot be undone.')) { setState((current) => ({ ...current, transactions: current.transactions.filter((item) => item.id !== id) })); void deleteAuthenticatedTransaction(authUser, id) } }
  const handleAddBudget = () => { const category = window.prompt('Budget category', 'Dining out'); const limit = Number(window.prompt('Monthly limit in ₹', '3000')); if (category && limit > 0) { const budget: Budget = { id: `b-${Date.now()}`, category, limit, cadence: 'Monthly', color: '#8b9cf1' }; updateState({ budgets: [...state.budgets, budget] }) } }
  const handleAddGoal = () => { const name = window.prompt('Goal name', 'New goal'); const target = Number(window.prompt('Target amount in ₹', '25000')); if (name && target > 0) { const goal: Goal = { id: `g-${Date.now()}`, name, target, saved: 0, due: 'Dec 2027', color: '#8b9cf1' }; updateState({ goals: [...state.goals, goal] }) } }
  const handleContribute = (goal: Goal) => { const amount = Number(window.prompt(`Add money to ${goal.name}`, '1000')); if (amount > 0) updateState({ goals: state.goals.map((item) => item.id === goal.id ? { ...item, saved: Math.min(item.target, item.saved + amount) } : item) }) }
  const handleImport = async (file: File) => { try { const imported = JSON.parse(await file.text()) as FinanceState; if (imported.transactions && imported.budgets && imported.goals) setState({ ...state, ...imported }) } catch { window.alert('That backup file could not be read.') } }
  const handleImportTransactions = async (file: File) => { try { const imported = await importTransactions(file); if (!imported.length) throw new Error('No usable transactions'); setState((current) => { const derived = deriveTrackerData(imported); return { ...current, transactions: imported, budgets: [], accounts: derived.accounts, goals: derived.goals, bills: derived.bills } }); setImportNotice(`${imported.length} transactions imported from ${file.name}. Accounts, goals, bills, dashboard totals, and insights are synced. No monthly budget was created.`); setView('transactions') } catch { setImportNotice('We could not read that file. Check that it has a header row and transaction columns such as date, description, amount, debit, or credit.') } }
  const handleReset = () => { if (window.confirm('Reset all local finance data?')) setState(seedState) }
  const handleTheme = () => updateState({ theme: state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light' })
  const openQuickAdd = () => setModal({ open: true, transaction: null })
  const titleClass = useMemo(() => `finance-app theme-${state.theme} ${dark ? 'theme-dark' : ''}`, [dark, state.theme])
  const pageCopy: Record<ViewName, { kicker: string; title: string; accent: string; description: string }> = {
    dashboard: { kicker: 'Personal finance, in motion', title: 'Make your', accent: 'money move.', description: 'A clearer view of your money, with a little more momentum behind every decision.' },
    transactions: { kicker: 'Every rupee has a story', title: 'Track the', accent: 'little things.', description: 'Turn everyday activity into a calmer, clearer picture of your spending.' },
    budgets: { kicker: 'Give your money a direction', title: 'Spend with', accent: 'intention.', description: 'Flexible limits, gentle nudges, and a view of what is still yours to use.' },
    goals: { kicker: 'Small moves, bigger plans', title: 'Save for', accent: 'what matters.', description: 'Keep the future visible and let each contribution become part of the story.' },
    analytics: { kicker: 'Patterns worth noticing', title: 'See your', accent: 'momentum.', description: 'Descriptive insights that make your habits easier to understand and change.' },
    more: { kicker: 'Your workspace, your rules', title: 'Keep it', accent: 'yours.', description: 'Personalise the experience and keep your financial data close at hand.' },
  }
  const copy = pageCopy[view]
  const expenseRows = state.transactions.filter((item) => item.type === 'expense')
  const incomeTotal = state.transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expenseTotal = expenseRows.reduce((sum, item) => sum + item.amount, 0)
  const categoryTotals = expenseRows.reduce<Record<string, number>>((result, item) => { result[item.category] = (result[item.category] || 0) + item.amount; return result }, {})
  const largestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
  const budgetTotal = state.budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const budgetSpent = state.budgets.reduce((sum, budget) => sum + (categoryTotals[budget.category] || 0), 0)
  const goalTarget = state.goals.reduce((sum, goal) => sum + goal.target, 0)
  const goalSaved = state.goals.reduce((sum, goal) => sum + goal.saved, 0)
  const visualData: MotionVisualData = { activityCount: state.transactions.length, budgetUsed: budgetTotal ? Math.min(100, Math.round(budgetSpent / budgetTotal * 100)) : 0, budgetRemaining: Math.max(0, budgetTotal - budgetSpent), goalProgress: goalTarget ? Math.min(100, Math.round(goalSaved / goalTarget * 100)) : 0, goalName: state.goals[0]?.name ?? 'Cash buffer', goalSaved, savingsRate: incomeTotal ? Math.round((1 - expenseTotal / incomeTotal) * 100) : 0, insightCategory: largestCategory?.[0] ?? 'Spending', insightValue: expenseTotal && largestCategory ? Math.round(largestCategory[1] / expenseTotal * 100) : 0 }
  const content = <>{view === 'dashboard' && <DashboardView state={state} onNavigate={setView} onQuickAdd={openQuickAdd} onEdit={(transaction) => setModal({ open: true, transaction })} onDelete={handleDelete} />}{view === 'transactions' && <TransactionsView state={state} search={search} onEdit={(transaction) => setModal({ open: true, transaction })} onDelete={handleDelete} onExport={() => exportFinanceState(state)} />}{view === 'budgets' && <BudgetsView state={state} onAdd={handleAddBudget} />}{view === 'goals' && <GoalsView state={state} onAdd={handleAddGoal} onContribute={handleContribute} />}{view === 'analytics' && <AnalyticsView state={state} />}{view === 'more' && <MoreView state={state} dark={dark} theme={state.theme} onTheme={handleTheme} onExport={() => exportFinanceState(state)} onImport={handleImport} onImportTransactions={handleImportTransactions} importNotice={importNotice} onReset={handleReset} />}</>
  return <div className={`${titleClass} immersive-mode`}><Sidebar view={view} onNavigate={setView} dark={dark} theme={state.theme} onTheme={handleTheme} transactionCount={state.transactions.length} /><ImmersiveNav view={view} onNavigate={setView} onQuickAdd={openQuickAdd} onAccount={() => setAccountModal(true)} user={authUser?.email?.split('@')[0] ?? null} theme={state.theme} dark={dark} onTheme={handleTheme} /><div className="finance-main"><Topbar view={view} onSearch={(value) => setSearch(value)} onQuickAdd={openQuickAdd} /><div className="finance-content"><MotionTemplate key={view} {...copy} variant={view} visualData={visualData} showBanner={view !== 'dashboard'}>{content}</MotionTemplate></div></div><BottomNav view={view} onNavigate={setView} />{modal.open && <TransactionModal initial={modal.transaction} onClose={() => setModal({ open: false })} onSave={handleSave} />}{accountModal && <AccountModal currentUser={authUser} onClose={() => setAccountModal(false)} onAuthenticated={(user) => { setAuthUser(user); setAccountModal(false) }} onSignOut={async () => { await supabase?.auth.signOut(); setAuthUser(null); setAccountModal(false) }} />}<button className="floating-add" onClick={openQuickAdd} aria-label="Add transaction">+</button></div>
}
export default App
