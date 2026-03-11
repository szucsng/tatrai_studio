'use client'

import { useState } from 'react'
import Link from 'next/link'
import ColorBends from '@/components/ColorBends'
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
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ColorBends
          className=""
          style={{}}
          rotation={0}
          speed={0.20}
          colors={["#ff0000","#00ff00","#0000ff"]}
          transparent={false}
          autoRotate={0.00}
          scale={1.00}
          frequency={1.80}
          warpStrength={1.00}
          mouseInfluence={1.00}
          parallax={0.50}
          noise={0.10}
        />
      </div>
      
      <div className="max-w-md w-full">
        <div className="bg-[#2D3436]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E67E22]/30 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F39C12]/30 to-[#E67E22]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FFE5B4]/40 to-[#F39C12]/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <KeyIcon className="w-16 h-16 text-[#F39C12]" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent">
                Elfelejtett jelszó
              </span>
            </h2>
            <p className="text-[#BDC3C7] mt-2">
              Add meg az email címed és küldünk egy jelszó visszaállítási linket
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-[#F39C12]/10 border border-[#F39C12]/30 rounded-xl backdrop-blur-sm">
              <p className="text-[#F39C12] text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#BDC3C7] mb-2">
                Email cím
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1D1F]/50 border border-[#E67E22]/30 text-[#FFF8E7] rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-all outline-none placeholder-[#636E72]"
                placeholder="pelda@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#F39C12] to-[#E67E22] hover:from-[#FFA726] hover:to-[#F39C12] text-[#2D3436] font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-[#E67E22]/50"
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
                className="text-sm text-[#BDC3C7] hover:text-[#F39C12] font-semibold hover:underline transition-colors"
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
