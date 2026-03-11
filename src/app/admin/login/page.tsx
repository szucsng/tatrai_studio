'use client'

import { signIn } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ColorBends from '@/components/ColorBends'
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
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F39C12]/30 to-[#E67E22]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FFE5B4]/40 to-[#F39C12]/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <LockIcon className="w-16 h-16 text-[#F39C12]" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent">
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
              <div className="bg-[#F39C12]/10 border border-[#F39C12]/30 text-[#F39C12] px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {resendMessage}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#BDC3C7] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1D1F]/50 border border-[#E67E22]/30 text-[#FFF8E7] rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-all outline-none placeholder-[#636E72]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#BDC3C7]">
                  Jelszó
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-[#F39C12] hover:text-[#E67E22] font-semibold hover:underline transition-colors"
                >
                  Elfelejtett jelszó?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1D1F]/50 border border-[#E67E22]/30 text-[#FFF8E7] rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-all outline-none placeholder-[#636E72]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F39C12] to-[#E67E22] hover:from-[#FFA726] hover:to-[#F39C12] text-[#2D3436] font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-[#E67E22]/50"
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
              <div className="w-full border-t border-[#E67E22]/20"></div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-[#BDC3C7] hover:text-[#F39C12] font-medium hover:underline transition-colors"
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
