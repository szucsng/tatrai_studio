'use client'

import { signIn } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthShell from '@/components/AuthShell'
import { errorClass, inputClass, labelClass, successClass } from '@/components/authStyles'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setNeedsVerification(false)
    setResendMessage('')

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: '/admin',
      })

      if (result?.error) {
        const errorMessage = result.error.message || 'Hibás email vagy jelszó'
        const lower = errorMessage.toLowerCase()

        if (lower.includes('not verified') || lower.includes('verify')) {
          setNeedsVerification(true)
          setError('Az email címedet még nem erősítetted meg. Ellenőrizd a postaládádat.')
        } else {
          setError(errorMessage)
        }
        return
      }

      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      setError(error?.message || 'Hibás email vagy jelszó')
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    setResendLoading(true)
    setResendMessage('')

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResendMessage('Megerősítő email újra elküldve. Ellenőrizd a postaládádat.')
      } else {
        setResendMessage(data.error || 'Hiba történt az email újraküldése során')
      }
    } catch {
      setResendMessage('Hálózati hiba történt')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <AuthShell title="Bejelentkezés" description="Add meg az admin fiókod adatait.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className={errorClass}>
            <p>{error}</p>
            {needsVerification && email && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="mt-2 text-sm text-[#E0A458] underline underline-offset-4 disabled:opacity-50"
              >
                {resendLoading ? 'Küldés...' : 'Megerősítő email újraküldése'}
              </button>
            )}
          </div>
        )}

        {resendMessage && <div className={successClass}>{resendMessage}</div>}

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={labelClass}>
              Jelszó
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-sm text-[#E0A458] transition-colors hover:underline"
            >
              Elfelejtett jelszó?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Bejelentkezés...
            </span>
          ) : (
            'Bejelentkezés'
          )}
        </button>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="text-sm text-white/55 transition-colors hover:text-[#E0A458]"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}
