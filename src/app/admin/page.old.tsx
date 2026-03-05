'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import Link from 'next/link'
import Image from 'next/image'

type Event = {
  id: string
  name: string
  description: string | null
  date: string
  images: { id: string; filename: string; path: string }[]
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/admin/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Hiba az események betöltése során:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!editingEvent && (!selectedFiles || selectedFiles.length === 0)) {
      setError('Kérlek válassz legalább egy képet!')
      setLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('date', formData.date)

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formDataToSend.append('images', selectedFiles[i])
        }
      }

      const url = editingEvent 
        ? `/api/admin/events/${editingEvent.id}`
        : '/api/admin/events'
      
      const method = editingEvent ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (response.ok) {
        setSuccess(editingEvent ? 'Esemény sikeresen frissítve!' : 'Esemény sikeresen létrehozva!')
        setFormData({
          name: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
        })
        setSelectedFiles(null)
        setEditingEvent(null)
        const fileInput = document.getElementById('images') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        await loadEvents()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt az esemény létrehozása során')
      }
    } catch (error) {
      setError('Hiba történt az esemény létrehozása során')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      name: event.name,
      description: event.description || '',
      date: new Date(event.date).toISOString().split('T')[0],
    })
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setFormData({
      name: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    })
    setSelectedFiles(null)
    const fileInput = document.getElementById('images') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt az eseményt? Ez a művelet nem visszavonható!')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Esemény sikeresen törölve!')
        await loadEvents()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt az esemény törlése során')
      }
    } catch (error) {
      setError('Hiba történt az esemény törlése során')
    }
  }

  const handleDeleteImage = async (eventId: string, imageId: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a képet?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/events/${eventId}/images/${imageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Kép sikeresen törölve!')
        await loadEvents()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt a kép törlése során')
      }
    } catch (error) {
      setError('Hiba történt a kép törlése során')
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                📸 Fotógaléria - Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/galeria" 
                className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-50"
              >
                Galéria
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Kijelentkezés
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
          <h1 className="text-3xl font-extrabold mb-8">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {editingEvent ? 'Esemény szerkesztése' : 'Új esemény létrehozása'}
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Esemény neve *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Leírás (opcionális)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Dátum
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                {editingEvent ? 'Új képek hozzáadása (opcionális)' : 'Képek feltöltése *'}
              </label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-50 file:to-purple-50 file:text-indigo-700 hover:file:bg-gradient-to-r hover:file:from-indigo-100 hover:file:to-purple-100"
                required={!editingEvent}
              />
              {selectedFiles && (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedFiles.length} kép kiválasztva
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (editingEvent ? 'Frissítés...' : 'Létrehozás...') : (editingEvent ? 'Esemény frissítése' : 'Esemény létrehozása')}
              </button>
              {editingEvent && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  Mégse
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Meglévő események listája */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <h2 className="text-2xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meglévő események ({events.length})
            </span>
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📷</div>
              <p className="text-gray-500">
                Még nincsenek események. Hozz létre egyet a fenti űrlap segítségével!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-indigo-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
                      {event.description && (
                        <p className="text-gray-600 mb-2">{event.description}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Dátum: {new Date(event.date).toLocaleDateString('hu-HU')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Képek: {event.images.length} db
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                      >
                        Szerkesztés
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                      >
                        Törlés
                      </button>
                    </div>
                  </div>

                  {/* Képek előnézete */}
                  {event.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Képek:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {event.images.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-shadow">
                              <Image
                                src={image.path}
                                alt={image.filename}
                                fill
                                quality={100}
                                className="object-cover"
                                sizes="150px"
                              />
                            </div>
                            <button
                              onClick={() => handleDeleteImage(event.id, image.id)}
                              className="absolute top-1.5 right-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all shadow-md"
                              title="Kép törlése"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
