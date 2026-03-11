'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ColorBends from '@/components/ColorBends'

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
        <div className="bg-[#2D3436]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E67E22]/30 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F39C12]/30 to-[#E67E22]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FFE5B4]/40 to-[#F39C12]/30 rounded-full blur-3xl -z-10"></div>
          
          {status === 'loading' && (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent mb-4">
                Email megerősítése...
              </h2>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E67E22] mx-auto"></div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#F39C12] mb-4">
                Sikeres megerősítés!
              </h2>
              <p className="text-[#BDC3C7] mb-6">{message}</p>
              <p className="text-sm text-[#636E72]">
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
              <p className="text-[#BDC3C7] mb-6">{message}</p>
              <Link
                href="/admin/login"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#F39C12] to-[#E67E22] hover:from-[#FFA726] hover:to-[#F39C12] text-[#2D3436] font-bold rounded-xl hover:shadow-xl transition-all border border-[#E67E22]/50"
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
          <div className="bg-[#2D3436]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E67E22]/30 p-8 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent mb-4">
              Email megerősítése...
            </h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E67E22] mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
