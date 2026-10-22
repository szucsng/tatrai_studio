'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthShell from '@/components/AuthShell'

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

        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Hiba történt az email megerősítése során')
      }
    } catch {
      setStatus('error')
      setMessage('Hálózati hiba történt')
    }
  }

  const title =
    status === 'success'
      ? 'Sikeres megerősítés'
      : status === 'error'
        ? 'Hiba történt'
        : 'Email megerősítése'

  return (
    <AuthShell
      title={title}
      description={status === 'loading' ? 'Ellenőrizzük a tokent.' : message}
    >
      {status === 'loading' && (
        <div className="flex items-center gap-3 text-sm text-white/55">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#E0A458]" />
          Feldolgozás...
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <p className="text-sm text-white/55">Átirányítás a bejelentkezési oldalra...</p>
          <Link href="/admin/login" className="btn btn-primary w-full">
            Tovább a bejelentkezéshez
          </Link>
        </div>
      )}

      {status === 'error' && (
        <Link href="/admin/login" className="btn btn-ghost w-full">
          Vissza a bejelentkezéshez
        </Link>
      )}
    </AuthShell>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Email megerősítése" description="Betöltés...">
          <div className="flex items-center gap-3 text-sm text-white/55">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#E0A458]" />
            Betöltés...
          </div>
        </AuthShell>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
