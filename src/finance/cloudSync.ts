import type { User } from '@supabase/supabase-js'
import type { Transaction } from './types'
import { supabase } from '../lib/supabase'

type CloudTransaction = {
  id: string
  user_id: string
  type: Transaction['type']
  amount: number
  date: string
  description: string
  merchant: string
  category: string
  account: string
  payment_method: string
  notes: string
}

const toRow = (userId: string, transaction: Transaction): CloudTransaction => ({
  id: transaction.id,
  user_id: userId,
  type: transaction.type,
  amount: transaction.amount,
  date: transaction.date,
  description: transaction.note,
  merchant: transaction.merchant,
  category: transaction.category,
  account: transaction.account,
  payment_method: transaction.method,
  notes: transaction.note,
})

const fromRow = (row: CloudTransaction): Transaction => ({
  id: row.id,
  type: row.type,
  amount: Number(row.amount),
  date: row.date,
  category: row.category,
  account: row.account,
  method: row.payment_method,
  merchant: row.merchant,
  note: row.description || row.notes || '',
})

export async function syncAuthenticatedTransactions(user: User, localTransactions: Transaction[]) {
  if (!supabase) return { remote: [] as Transaction[], error: null }
  const { data, error } = await supabase.from('transactions').select('id,user_id,type,amount,date,description,merchant,category,account,payment_method,notes').eq('user_id', user.id).order('date', { ascending: false }).limit(1000)
  if (error) return { remote: [] as Transaction[], error }
  const remote = (data ?? []) as CloudTransaction[]
  if (!remote.length && localTransactions.length) {
    const result = await supabase.from('transactions').upsert(localTransactions.map((item) => toRow(user.id, item)), { onConflict: 'user_id,id' })
    return { remote: localTransactions, error: result.error }
  }
  return { remote: remote.map(fromRow), error: null }
}

export async function saveAuthenticatedTransaction(user: User | null, transaction: Transaction) {
  if (!supabase || !user) return
  await supabase.from('transactions').upsert(toRow(user.id, transaction), { onConflict: 'user_id,id' })
}

export async function deleteAuthenticatedTransaction(user: User | null, id: string) {
  if (!supabase || !user) return
  await supabase.from('transactions').delete().eq('id', id).eq('user_id', user.id)
}
