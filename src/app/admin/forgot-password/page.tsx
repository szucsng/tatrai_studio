'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthShell from '@/components/AuthShell'
import { errorClass, inputClass, labelClass, successClass } from '@/components/authStyles'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setEmail('')
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
    <AuthShell
      title="Elfelejtett jelszó"
      description="Add meg az email címed, és küldünk egy jelszó-visszaállítási linket."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {message && <div className={successClass}>{message}</div>}
        {error && <div className={errorClass}>{error}</div>}

        <div>
          <label htmlFor="email" className={labelClass}>
            Email cím
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="pelda@email.com"
            autoComplete="email"
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
              Küldés...
            </span>
          ) : (
            'Jelszó-visszaállítási link küldése'
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
    </AuthShell>
  )
}
