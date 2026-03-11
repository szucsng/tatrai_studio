'use client'

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-blue-400" />
          Admin Felhasználó Létrehozása
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Felhasználói adatok</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jelszó</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Név</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Titkos kulcs</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                {loading ? 'Létrehozás...' : 'Admin Létrehozása'}
              </button>
            </form>
          </div>

          {/* Console Output */}
          <div className="bg-black p-6 rounded-lg font-mono text-sm">
            <h2 className="text-xl font-semibold mb-4 font-sans">Console kimenet</h2>
            <pre className="whitespace-pre-wrap break-words text-green-400">
              {result || '> Várakozás...'}
            </pre>
          </div>
        </div>

        <div className="mt-8 bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
          <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Biztonsági figyelmeztetés</h3>
          <p className="text-sm">
            Ez az oldal csak fejlesztési célokra szolgál. Éles környezetben távolítsd el, vagy védd le megfelelően!
          </p>
        </div>
      </div>
    </div>
  )
}
