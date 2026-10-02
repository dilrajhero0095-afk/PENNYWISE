import type { FinanceState } from './types'
import { seedState } from './types'

const STORAGE_KEY = 'atelier-finance-state-v1'

export function loadFinanceState(): FinanceState {
  if (typeof window === 'undefined') return seedState
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return seedState
    const parsed = JSON.parse(stored) as Partial<FinanceState>
    const budgets = parsed.budgets?.every((budget) => budget.id.startsWith('derived-budget-')) ? [] : parsed.budgets
    return { ...seedState, ...parsed, ...(budgets ? { budgets } : {}) }
  } catch {
    return seedState
  }
}

export function saveFinanceState(state: FinanceState) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* storage may be blocked */ }
}

export function exportFinanceState(state: FinanceState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `atelier-finance-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}
