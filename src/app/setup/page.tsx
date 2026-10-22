'use client'

import { useState } from 'react'
import AuthShell from '@/components/AuthShell'
import { inputClass, labelClass } from '@/components/authStyles'

export default function SetupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('Admin')
  const [secret, setSecret] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/setup/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, secret }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`Siker:\n${JSON.stringify(data, null, 2)}`)
      } else {
        setResult(`Hiba:\n${JSON.stringify(data, null, 2)}`)
      }
    } catch (error: any) {
      setResult(`Hiba:\n${error?.message || 'Hálózati hiba történt'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Első admin létrehozása"
      description="Add meg az admin adatait, majd a szerver .env fájljában lévő ADMIN_SETUP_SECRET értéket."
      maxWidth="max-w-4xl"
      align="start"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5 border border-white/10 bg-white/[0.02] p-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className={labelClass}>
              Név
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="secret" className={labelClass}>
              Titkos kulcs
            </label>
            <input
              id="secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Létrehozás...' : 'Admin létrehozása'}
          </button>
        </form>

        <div className="border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-sm font-medium text-white/80">Console</h2>
          <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-white/60">
            {result || '> Várakozás...'}
          </pre>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-white/40">
        Ez az oldal csak az első admin létrehozására való. Utána távolítsd el, vagy védd le.
      </p>
    </AuthShell>
  )
}
