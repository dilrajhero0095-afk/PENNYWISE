export type LocalAccount = { username: string; passwordHash: string; createdAt: string }

const ACCOUNT_KEY = 'pennywise-local-account-v1'

export function loadLocalAccount(): LocalAccount | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(ACCOUNT_KEY)
    return raw ? JSON.parse(raw) as LocalAccount : null
  } catch {
    return null
  }
}

async function hashPassword(password: string) {
  if (window.crypto?.subtle) {
    const bytes = new TextEncoder().encode(password)
    const digest = await window.crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  return btoa(unescape(encodeURIComponent(password)))
}

export async function createLocalAccount(username: string, password: string) {
  const account: LocalAccount = { username: username.trim(), passwordHash: await hashPassword(password), createdAt: new Date().toISOString() }
  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account))
  return account
}

export async function verifyLocalAccount(username: string, password: string) {
  const account = loadLocalAccount()
  if (!account || account.username.toLowerCase() !== username.trim().toLowerCase()) return false
  return account.passwordHash === await hashPassword(password)
}

export function clearLocalAccount() {
  window.localStorage.removeItem(ACCOUNT_KEY)
}
