import { LockKeyhole, LogOut, Sparkles, UserRound, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase, supabaseConfigured, supabaseMissing } from '../../lib/supabase'

type AccountModalProps = { onClose: () => void; currentUser: User | null; onAuthenticated: (user: User) => void; onSignOut: () => void }
type Mode = 'signin' | 'signup'

export function AccountModal({ onClose, currentUser, onAuthenticated, onSignOut }: AccountModalProps) {
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState(currentUser?.email ?? '')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(''); setMessage('')
    if (!supabaseConfigured || !supabase) return setError(`Supabase is not connected yet. Add ${supabaseMissing.join(' and ')} in Netlify (Project configuration → Environment variables), then redeploy.`)
    if (!email.includes('@')) return setError('Enter a valid email address.')
    if (password.length < 8) return setError('Use at least 8 characters for your password.')
    if (mode === 'signup' && password !== confirm) return setError('Those passwords do not match.')
    setBusy(true)
    try {
      const result = mode === 'signin'
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password, options: { data: { display_name: email.trim().split('@')[0] } } })
      if (result.error) return setError(result.error.message)
      if (result.data.user) onAuthenticated(result.data.user)
      else setMessage('Check your email to confirm your Pennywise account, then sign in.')
    } catch {
      setError('We could not reach Supabase Auth. Please try again.')
    } finally { setBusy(false) }
  }

  return <div className="account-overlay" role="dialog" aria-modal="true" aria-labelledby="account-title">
    <div className="account-orbit account-orbit--one" /><div className="account-orbit account-orbit--two" />
    <section className="account-modal">
      <button className="account-close" onClick={onClose} aria-label="Close account dialog"><X size={17} /></button>
      <div className="account-mark"><UserRound size={20} /></div>
      <span className="account-kicker"><Sparkles size={12} /> secured workspace</span>
      <h2 id="account-title">Keep your<br /><em>money close.</em></h2>
      {currentUser ? <><p className="account-lede">You are securely signed in as <strong>{currentUser.email}</strong>. Your session is managed by Supabase Auth.</p><button className="account-submit" onClick={onSignOut}>Sign out <span><LogOut size={14} /></span></button></> : <>
        <p className="account-lede">Create a secure Pennywise account. Credentials are handled by Supabase Auth and never stored in the Pennywise browser bundle.</p>
        <div className="account-tabs" role="tablist"><button className={mode === 'signin' ? 'is-active' : ''} onClick={() => { setMode('signin'); setError(''); setMessage('') }} role="tab">Sign in</button><button className={mode === 'signup' ? 'is-active' : ''} onClick={() => { setMode('signup'); setError(''); setMessage('') }} role="tab">Create account</button></div>
        <form onSubmit={submit}>
          <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" /></label>
          <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /></label>
          {mode === 'signup' && <label>Confirm password<input value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder="Type it again" type="password" autoComplete="new-password" /></label>}
          {error && <p className="account-error" role="alert">{error}</p>}{message && <p className="account-message" role="status">{message}</p>}
          <button className="account-submit" disabled={busy}>{busy ? 'Working…' : mode === 'signin' ? 'Sign in securely' : 'Create secure account'} <span><LockKeyhole size={14} /></span></button>
        </form>
        <small className="account-footnote">Supabase Auth · encrypted session · row-level protected data</small>
      </>}
    </section>
  </div>
}
