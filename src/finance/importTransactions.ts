import * as XLSX from 'xlsx'
import type { Transaction, TransactionType } from './types'

const clean = (value: unknown) => String(value ?? '').trim()
const key = (value: unknown) => clean(value).toLowerCase().replace(/[^a-z0-9]/g, '')
const numberValue = (value: unknown) => {
  const text = clean(value).replace(/[₹$€£,\s]/g, '')
  if (!text) return 0
  const parsed = Number(text.replace(/[()]/g, ''))
  return Number.isFinite(parsed) ? Math.abs(parsed) : 0
}
const dateValue = (value: unknown) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10)
  if (typeof value === 'number') {
    const date = XLSX.SSF.parse_date_code(value)
    if (date) return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`
  }
  const parsed = new Date(clean(value))
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString().slice(0, 10) : parsed.toISOString().slice(0, 10)
}
const pick = (row: Record<string, unknown>, aliases: string[]) => {
  const found = Object.keys(row).find((name) => aliases.includes(key(name)))
  return found ? row[found] : ''
}

export async function importTransactions(file: File): Promise<Transaction[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  if (!sheet) throw new Error('No worksheet found')
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })
  if (!rows.length) throw new Error('No transaction rows found')

  return rows.map((row, index) => {
    const description = clean(pick(row, ['description', 'merchant', 'payee', 'name', 'narration', 'particulars', 'details', 'source'])) || `Imported transaction ${index + 1}`
    const debit = numberValue(pick(row, ['debit', 'withdrawal', 'withdrawals', 'moneyout', 'expense']))
    const credit = numberValue(pick(row, ['credit', 'deposit', 'deposits', 'moneyin', 'income']))
    const rawAmount = pick(row, ['amount', 'value', 'transactionamount', 'total'])
    const amount = numberValue(rawAmount) || debit || credit
    const rawType = key(pick(row, ['type', 'transactiontype', 'drcr', 'nature']))
    const type: TransactionType = credit > 0 || ['income', 'credit', 'deposit', 'cr'].includes(rawType) ? 'income' : debit > 0 || ['expense', 'debit', 'withdrawal', 'dr'].includes(rawType) ? 'expense' : 'expense'
    const category = clean(pick(row, ['category', 'subcategory', 'expensecategory'])) || 'Imported'
    const account = clean(pick(row, ['account', 'accountname', 'bank', 'wallet', 'card'])) || 'Imported account'
    const method = clean(pick(row, ['method', 'paymentmethod', 'mode', 'channel'])) || 'Imported'
    return { id: `import-${Date.now()}-${index}`, type, amount, date: dateValue(pick(row, ['date', 'transactiondate', 'valuedate', 'posteddate'])), category, account, method, merchant: description, note: clean(pick(row, ['note', 'notes', 'reference', 'memo'])), recurring: false }
  }).filter((transaction) => transaction.amount > 0)
}
