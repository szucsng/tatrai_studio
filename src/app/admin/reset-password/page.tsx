'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockIcon } from '@/components/Icons'

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
    } catch (error) {
      setError('Hálózati hiba történt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <LockIcon className="w-16 h-16 text-[#06B6D4]" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                Új jelszó beállítása
              </span>
            </h2>
            <p className="text-[#9CA3AF] mt-2">
              Add meg az új jelszavadat
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-green-400 text-sm">{message}</p>
              <p className="text-sm text-[#9CA3AF] mt-2">Átirányítás...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {!token && (
            <div className="text-center space-y-4">
              <Link
                href="/admin/forgot-password"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Jelszó visszaállítás kérése
              </Link>
              <div>
                <Link
                  href="/"
                  className="text-sm text-[#9CA3AF] hover:text-[#06B6D4] font-medium hover:underline transition-colors"
                >
                  ← Vissza a főoldalra
                </Link>
              </div>
            </div>
          )}

          {token && !message && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#9CA3AF] mb-2">
                  Új jelszó
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none placeholder-[#6B7280]"
                  placeholder="Legalább 8 karakter"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#9CA3AF] mb-2">
                  Jelszó megerősítése
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none placeholder-[#6B7280]"
                  placeholder="Add meg újra a jelszót"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mentés...
                  </span>
                ) : (
                  'Jelszó módosítása'
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/admin/login"
                  className="text-sm text-[#06B6D4] hover:text-[#7C3AED] font-semibold hover:underline transition-colors"
                >
                  ← Vissza a bejelentkezéshez
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="grain" />
        <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED] mx-auto"></div>
          <p className="mt-4 text-[#9CA3AF]">Betöltés...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
