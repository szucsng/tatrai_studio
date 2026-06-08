'use client'

import { useState } from 'react'
import Link from 'next/link'
import { KeyIcon } from '@/components/Icons'

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
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7C3AED]/10 to-[#06B6D4]/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <KeyIcon className="w-16 h-16 text-[#06B6D4]" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                Elfelejtett jelszó
              </span>
            </h2>
            <p className="text-[#9CA3AF] mt-2">
              Add meg az email címed és küldünk egy jelszó visszaállítási linket
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl backdrop-blur-sm">
              <p className="text-[#06B6D4] text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#9CA3AF] mb-2">
                Email cím
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none placeholder-[#6B7280]"
                placeholder="pelda@email.com"
                required
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
                  Küldés...
                </span>
              ) : (
                'Jelszó visszaállítási link küldése'
              )}
            </button>

            <div className="text-center">
              <Link
                href="/admin/login"
                className="text-sm text-[#9CA3AF] hover:text-[#06B6D4] font-semibold hover:underline transition-colors"
              >
                ← Vissza a bejelentkezéshez
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
