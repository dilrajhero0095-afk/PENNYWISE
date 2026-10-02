import type { Account, Bill, Budget, Goal, Transaction } from './types'

const palette = ['#d4f58e', '#8de6cf', '#f6c779', '#ff9a87', '#a9b8ff', '#f3a6e8']
const moneyRound = (value: number, step = 100) => Math.max(step, Math.ceil(value / step) * step)

export function deriveTrackerData(transactions: Transaction[]) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const income = transactions.filter((item) => item.type === 'income')
  const categoryTotals = expenses.reduce<Record<string, number>>((result, item) => { result[item.category] = (result[item.category] || 0) + item.amount; return result }, {})
  const budgets: Budget[] = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([category, amount], index) => ({ id: `derived-budget-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, category, limit: moneyRound(amount * 1.25), cadence: 'Monthly', color: palette[index % palette.length] }))

  const accountFlow = transactions.reduce<Record<string, number>>((result, item) => {
    result[item.account] = (result[item.account] || 0) + (item.type === 'income' ? item.amount : item.type === 'expense' ? -item.amount : -item.amount)
    if (item.type === 'transfer' && item.toAccount) result[item.toAccount] = (result[item.toAccount] || 0) + item.amount
    return result
  }, {})
  const accounts: Account[] = Object.entries(accountFlow).sort((a, b) => b[1] - a[1]).map(([name, balance], index) => ({ id: `derived-account-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, name, kind: 'Imported activity', balance: Math.round(balance), color: palette[index % palette.length] }))

  const repeated = new Map<string, Transaction[]>()
  transactions.filter((item) => item.type === 'expense').forEach((item) => { const label = item.merchant || item.category; repeated.set(label, [...(repeated.get(label) || []), item]) })
  const bills: Bill[] = [...repeated.entries()].filter(([, items]) => items.length >= 2).slice(0, 6).map(([name, items], index) => ({ id: `derived-bill-${index}`, name, amount: Math.round(items.reduce((sum, item) => sum + item.amount, 0) / items.length), due: 'Pattern detected', category: items[0].category, status: 'Upcoming' }))

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const net = Math.max(0, totalIncome - totalExpenses)
  const goals: Goal[] = [
    { id: 'derived-cash-buffer', name: 'Cash buffer', target: moneyRound(totalExpenses * 3, 1000), saved: net, due: 'Based on imported cash flow', color: palette[0] },
    { id: 'derived-next-month', name: 'Next month runway', target: moneyRound(totalExpenses, 1000), saved: Math.min(net, moneyRound(totalExpenses, 1000)), due: 'Based on imported cash flow', color: palette[1] },
  ]
  return { budgets, accounts, bills, goals, categoryTotals, totalIncome, totalExpenses, net }
}
