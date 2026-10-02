export type TransactionType = 'income' | 'expense' | 'transfer'
export type ViewName = 'dashboard' | 'transactions' | 'budgets' | 'goals' | 'analytics' | 'more'

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  date: string
  category: string
  account: string
  method: string
  merchant: string
  note: string
  toAccount?: string
  recurring?: boolean
}

export type Account = { id: string; name: string; kind: string; balance: number; color: string }
export type Budget = { id: string; category: string; limit: number; color: string; cadence: 'Monthly' | 'Weekly' }
export type Goal = { id: string; name: string; target: number; saved: number; due: string; color: string }
export type Bill = { id: string; name: string; amount: number; due: string; category: string; status: 'Upcoming' | 'Due soon' | 'Paid' | 'Overdue' }

export type FinanceState = {
  transactions: Transaction[]
  accounts: Account[]
  budgets: Budget[]
  goals: Goal[]
  bills: Bill[]
  currency: string
  theme: 'light' | 'dark' | 'system'
}

const day = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() - offset)
  return date.toISOString().slice(0, 10)
}

export const seedState: FinanceState = {
  currency: '₹',
  theme: 'light',
  transactions: [
    { id: 't1', type: 'income', amount: 35000, date: day(3), category: 'Salary', account: 'Bank account', method: 'Bank transfer', merchant: 'Northstar Studio', note: 'September salary' },
    { id: 't2', type: 'expense', amount: 9000, date: day(4), category: 'Rent', account: 'Bank account', method: 'Bank transfer', merchant: 'Urban Nest', note: 'Monthly rent', recurring: true },
    { id: 't3', type: 'expense', amount: 2200, date: day(6), category: 'Groceries', account: 'UPI wallet', method: 'UPI', merchant: 'Fresh Basket', note: 'Weekly groceries' },
    { id: 't4', type: 'expense', amount: 840, date: day(2), category: 'Transport', account: 'UPI wallet', method: 'UPI', merchant: 'Metro & Cabs', note: 'Commute' },
    { id: 't5', type: 'expense', amount: 350, date: day(1), category: 'Food', account: 'Cash', method: 'Cash', merchant: 'Kaffa', note: 'Lunch with friends' },
    { id: 't6', type: 'expense', amount: 649, date: day(7), category: 'Subscriptions', account: 'Credit card', method: 'Credit card', merchant: 'Netflix', note: 'Standard plan', recurring: true },
    { id: 't7', type: 'income', amount: 12000, date: day(24), category: 'Freelance', account: 'Bank account', method: 'Bank transfer', merchant: 'Field Notes Co.', note: 'Brand sprint' },
    { id: 't8', type: 'transfer', amount: 5000, date: day(10), category: 'Transfer', account: 'Bank account', toAccount: 'Savings account', method: 'Bank transfer', merchant: 'Internal transfer', note: 'Monthly savings move' },
  ],
  accounts: [
    { id: 'a1', name: 'Bank account', kind: 'Primary account', balance: 16400, color: '#3653d8' },
    { id: 'a2', name: 'UPI wallet', kind: 'Digital wallet', balance: 5250, color: '#f5a524' },
    { id: 'a3', name: 'Savings account', kind: 'Goal account', balance: 16800, color: '#4f9b70' },
    { id: 'a4', name: 'Credit card', kind: 'Card', balance: -3000, color: '#d95f59' },
  ],
  budgets: [
    { id: 'b1', category: 'Food', limit: 5000, color: '#f39b72', cadence: 'Monthly' },
    { id: 'b2', category: 'Transport', limit: 2000, color: '#76a8e8', cadence: 'Monthly' },
    { id: 'b3', category: 'Subscriptions', limit: 1500, color: '#c6a2e8', cadence: 'Monthly' },
    { id: 'b4', category: 'Shopping', limit: 5000, color: '#f0c85b', cadence: 'Monthly' },
  ],
  goals: [
    { id: 'g1', name: 'Emergency fund', target: 50000, saved: 32000, due: 'Mar 2027', color: '#3653d8' },
    { id: 'g2', name: 'New laptop', target: 85000, saved: 54400, due: 'Jun 2027', color: '#e39b4c' },
    { id: 'g3', name: 'Goa vacation', target: 30000, saved: 16800, due: 'Dec 2026', color: '#5e9c80' },
  ],
  bills: [
    { id: 'p1', name: 'Internet bill', amount: 999, due: 'Tomorrow', category: 'Utilities', status: 'Due soon' },
    { id: 'p2', name: 'Netflix', amount: 649, due: '18 Sep', category: 'Subscriptions', status: 'Upcoming' },
    { id: 'p3', name: 'Electricity', amount: 1400, due: '22 Sep', category: 'Utilities', status: 'Upcoming' },
  ],
}
