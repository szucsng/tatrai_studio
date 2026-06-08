'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'


function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Hiányzó token')
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`)
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        
        // 3 másodperc után átirányítjuk a login oldalra
        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Hiba történt az email megerősítése során')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Hálózati hiba történt')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7C3AED]/10 to-[#06B6D4]/20 rounded-full blur-3xl -z-10"></div>
          
          {status === 'loading' && (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent mb-4">
                Email megerősítése...
              </h2>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED] mx-auto"></div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#06B6D4] mb-4">
                Sikeres megerősítés!
              </h2>
              <p className="text-[#9CA3AF] mb-6">{message}</p>
              <Link
                href="/admin/login"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-bold rounded-xl hover:shadow-xl transition-all mb-4"
              >
                Tovább a bejelentkezéshez
              </Link>
              <p className="text-sm text-[#6B7280]">
                Átirányítás a bejelentkezési oldalra...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Hiba történt
              </h2>
              <p className="text-[#9CA3AF] mb-6">{message}</p>
              <Link
                href="/admin/login"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Vissza a bejelentkezéshez
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="grain" />
        <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
        <div className="max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent mb-4">
              Email megerősítése...
            </h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED] mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
