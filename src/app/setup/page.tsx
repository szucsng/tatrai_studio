'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SettingsIcon } from '@/components/Icons'

export default function SetupPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [name, setName] = useState('Admin')
  const [secret, setSecret] = useState('create-admin-secret-2024')
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/setup/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, secret }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ Siker!\n${JSON.stringify(data, null, 2)}`)
      } else {
        setResult(`❌ Hiba!\n${JSON.stringify(data, null, 2)}`)
      }
    } catch (error: any) {
      setResult(`❌ Hiba történt:\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <nav className="flex items-center gap-6 mb-8 text-sm">
          <Link href="/" className="text-[#9CA3AF] hover:text-[#06B6D4] transition-colors">
            ← Vissza a főoldalra
          </Link>
          <Link href="/admin/login" className="text-[#9CA3AF] hover:text-[#06B6D4] transition-colors">
            Admin bejelentkezés →
          </Link>
        </nav>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-[#f5f5f5]">
          <SettingsIcon className="w-8 h-8 text-[#06B6D4]" />
          Admin Felhasználó Létrehozása
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-[#f5f5f5]">Felhasználói adatok</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Jelszó</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Név</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Titkos kulcs</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-bold py-2 px-4 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? 'Létrehozás...' : 'Admin Létrehozása'}
              </button>
            </form>
          </div>

          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl font-mono text-sm shadow-xl">
            <h2 className="text-xl font-semibold mb-4 font-sans text-[#f5f5f5]">Console kimenet</h2>
            <pre className="whitespace-pre-wrap break-words text-green-400">
              {result || '> Várakozás...'}
            </pre>
          </div>
        </div>

        <div className="mt-8 bg-yellow-900/30 border border-yellow-600/50 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Biztonsági figyelmeztetés</h3>
          <p className="text-sm text-[#9CA3AF]">
            Ez az oldal csak fejlesztési célokra szolgál. Éles környezetben távolítsd el, vagy védd le megfelelően!
          </p>
        </div>
      </div>
    </div>
  )
}
