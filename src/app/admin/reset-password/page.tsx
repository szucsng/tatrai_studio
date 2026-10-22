'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthShell from '@/components/AuthShell'
import { errorClass, inputClass, labelClass, successClass } from '@/components/authStyles'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Hiányzó vagy érvénytelen token')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (password !== confirmPassword) {
      setError('A két jelszó nem egyezik')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('A jelszónak legalább 8 karakter hosszúnak kell lennie')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
      } else {
        setError(data.error || 'Hiba történt')
      }
    } catch {
      setError('Hálózati hiba történt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Új jelszó beállítása" description="Add meg az új jelszavadat.">
      {message && (
        <div className={`${successClass} mb-5`}>
          <p>{message}</p>
          <p className="mt-1 text-xs text-white/55">Átirányítás...</p>
        </div>
      )}

      {error && <div className={`${errorClass} mb-5`}>{error}</div>}

      {!token && (
        <div className="space-y-4">
          <Link href="/admin/forgot-password" className="btn btn-primary w-full">
            Jelszó-visszaállítás kérése
          </Link>
          <div className="text-center">
            <Link
              href="/admin/login"
              className="text-sm text-white/55 transition-colors hover:text-[#E0A458]"
            >
              Vissza a bejelentkezéshez
            </Link>
          </div>
        </div>
      )}

      {token && !message && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className={labelClass}>
              Új jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="Legalább 8 karakter"
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Jelszó megerősítése
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Add meg újra a jelszót"
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Mentés...
              </span>
            ) : (
              'Jelszó módosítása'
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/admin/login"
              className="text-sm text-white/55 transition-colors hover:text-[#E0A458]"
            >
              Vissza a bejelentkezéshez
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Új jelszó beállítása" description="Betöltés...">
          <div className="flex items-center gap-3 text-sm text-white/55">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#E0A458]" />
            Betöltés...
          </div>
        </AuthShell>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
