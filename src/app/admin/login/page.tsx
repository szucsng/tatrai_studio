'use client'

import { signIn } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockIcon } from '@/components/Icons'

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

    try {
      await signIn.email({
        email,
        password,
        callbackURL: '/admin'
      })
      
      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      const errorMessage = error?.message || 'Hibás email vagy jelszó'
      
      // Ellenőrizzük, hogy email megerősítés szükséges-e
      if (errorMessage.includes('email') || errorMessage.includes('verify')) {
        setNeedsVerification(true)
        setError('Az email címedet még nem erősítetted meg. Kérjük, ellenőrizd a postaládádat.')
      } else {
        setError(errorMessage)
      }
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
        setResendMessage('Megerősítő email újra elküldve! Ellenőrizd a postaládádat.')
      } else {
        setResendMessage(data.error || 'Hiba történt az email újraküldése során')
      }
    } catch (error) {
      setResendMessage('Hálózati hiba történt')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7C3AED]/10 to-[#06B6D4]/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <LockIcon className="w-16 h-16 text-[#06B6D4]" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                Admin Bejelentkezés
              </span>
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
                {needsVerification && email && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                      className="text-sm text-red-300 underline hover:text-red-200 font-semibold disabled:opacity-50"
                    >
                      {resendLoading ? 'Küldés...' : 'Megerősítő email újraküldése'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {resendMessage && (
              <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {resendMessage}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none placeholder-[#6B7280]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#9CA3AF]">
                  Jelszó
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-[#06B6D4] hover:text-[#7C3AED] font-semibold hover:underline transition-colors"
                >
                  Elfelejtett jelszó?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none placeholder-[#6B7280]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bejelentkezés...
                </span>
              ) : (
                'Bejelentkezés'
              )}
            </button>

            <div className="relative">
              <div className="w-full border-t border-white/10"></div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-[#9CA3AF] hover:text-[#06B6D4] font-medium hover:underline transition-colors"
              >
                ← Vissza a főoldalra
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
