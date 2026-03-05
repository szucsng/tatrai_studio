'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import Link from 'next/link'
import Image from 'next/image'
import ColorBends from '@/components/ColorBends'

type Event = {
  id: string
  name: string
  description: string | null
  date: string
  images: { id: string; filename: string; path: string }[]
  organizers?: { user: { id: string; name: string; email: string } }[]
}

type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  role?: string
  createdAt?: string
}

type Stats = {
  totalEvents: number
  totalImages: number
  recentEvents: number
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({ totalEvents: 0, totalImages: 0, recentEvents: 0 })
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'profile' | 'organizers'>('dashboard')
  const [users, setUsers] = useState<User[]>([])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    organizerIds: [] as string[],
  })

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  // Helper function to detect video files
  const isVideoFile = (filename: string): boolean => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v']
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  useEffect(() => {
    loadUserData()
    loadEvents()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [events])

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/auth/session')
      if (response.ok) {
        const data = await response.json()
        if (data?.user) {
          setUser(data.user)
          setProfileData({
            ...profileData,
            name: data.user.name || '',
            email: data.user.email || '',
          })
        }
      }
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error)
    }
  }

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

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Hiba a felhasználók betöltése során:', error)
    }
  }

  const toggleOrganizerRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'organizer' ? 'user' : 'organizer'
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      })
      
      if (response.ok) {
        setSuccess(newRole === 'organizer' ? 'Szervező jogosultság hozzáadva' : 'Szervező jogosultság eltávolítva')
        loadUsers()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Hiba a jogosultság módosítása során')
      }
    } catch (error) {
      console.error('Hiba:', error)
      setError('Hiba történt')
    }
  }

  const calculateStats = () => {
    const totalImages = events.reduce((sum, event) => sum + event.images.length, 0)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const recentEvents = events.filter(event => new Date(event.date) >= oneMonthAgo).length

    setStats({
      totalEvents: events.length,
      totalImages,
      recentEvents,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!editingEvent && (!selectedFiles || selectedFiles.length === 0)) {
      setError('Kérlek válassz legalább egy fájlt (képet vagy videót)!')
      setLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('date', formData.date)
      formDataToSend.append('organizerIds', JSON.stringify(formData.organizerIds))

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
          organizerIds: [],
        })
        setSelectedFiles(null)
        setEditingEvent(null)
        const fileInput = document.getElementById('images') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        await loadEvents()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt')
      }
    } catch (error) {
      setError('Hiba történt az esemény kezelése során')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Ha jelszó módosítás is van
      if (profileData.newPassword) {
        if (profileData.newPassword !== profileData.confirmPassword) {
          setError('Az új jelszavak nem egyeznek')
          setLoading(false)
          return
        }

        if (profileData.newPassword.length < 8) {
          setError('A jelszónak legalább 8 karakter hosszúnak kell lennie')
          setLoading(false)
          return
        }

        // Jelszó módosítás API hívás (ezt implementálni kell)
        // Itt most csak a név frissítés megy
      }

      // Név frissítés (ezt is implementálni kell az API-ban)
      setSuccess('Profil sikeresen frissítve!')
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Hiba történt a profil frissítése során')
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
      organizerIds: event.organizers?.map(o => o.user.id) || [],
    })
    setError('')
    setSuccess('')
    setActiveTab('events')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadUsers()
  }

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setFormData({
      name: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      organizerIds: [],
    })
    setSelectedFiles(null)
    const fileInput = document.getElementById('images') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt az eseményt?')) {
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
        setError(data.error || 'Hiba történt')
      }
    } catch (error) {
      setError('Hiba történt az esemény törlése során')
    }
  }

  const handleDeleteImage = async (eventId: string, imageId: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a fájlt (képet vagy videót)?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/events/${eventId}/images/${imageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Fájl sikeresen törölve!')
        await loadEvents()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt')
      }
    } catch (error) {
      setError('Hiba történt a fájl törlése során')
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen relative">
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
      
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md shadow-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/galeria" 
                className="text-gray-300 hover:text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-50"
              >
                🖼️ Galéria
              </Link>
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-sm font-medium text-white">{user?.name || 'Admin'}</span>
              </div>
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

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('events')
                loadUsers()
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              📅 Események
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              👤 Profil
            </button>
            <button
              onClick={() => {
                setActiveTab('organizers')
                loadUsers()
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'organizers'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              👥 Szervezők
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm font-medium">Összes esemény</p>
                    <p className="text-4xl font-bold mt-2">{stats.totalEvents}</p>
                  </div>
                  <div className="text-5xl opacity-20">📅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Összes fájl</p>
                    <p className="text-4xl font-bold mt-2">{stats.totalImages}</p>
                  </div>
                  <div className="text-5xl opacity-20">🖼️</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm font-medium">Új események (30 nap)</p>
                    <p className="text-4xl font-bold mt-2">{stats.recentEvents}</p>
                  </div>
                  <div className="text-5xl opacity-20">✨</div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Legutóbbi események
              </h2>
              {events.slice(0, 5).length === 0 ? (
                <p className="text-gray-400 text-center py-8">Még nincsenek események</p>
              ) : (
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-xl hover:shadow-md transition-all bg-gray-900/50">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(event.date).toLocaleDateString('hu-HU')} • {event.images.length} fájl
                        </p>
                      </div>
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        Szerkesztés
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Gyors műveletek
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('events')}
                  className="p-6 border-2 border-indigo-800 rounded-xl hover:border-indigo-400 hover:bg-gray-900 transition-all text-left"
                >
                  <div className="text-3xl mb-2">➕</div>
                  <h3 className="font-semibold text-white mb-1">Új esemény létrehozása</h3>
                  <p className="text-sm text-gray-400">Hozz létre új eseményt képekkel és videókkal</p>
                </button>
                <Link
                  href="/galeria"
                  className="p-6 border-2 border-purple-800 rounded-xl hover:border-purple-400 hover:bg-gray-900 transition-all text-left"
                >
                  <div className="text-3xl mb-2">👁️</div>
                  <h3 className="font-semibold text-white mb-1">Galéria megtekintése</h3>
                  <p className="text-sm text-gray-400">Nézd meg a nyilvános galériát</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Create/Edit Form */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {editingEvent ? 'Esemény szerkesztése' : 'Új esemény létrehozása'}
              </h2>

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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Esemény neve *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Leírás (opcionális)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                    Dátum
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Szervezők
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-600 rounded-xl p-4">
                    {users.length === 0 ? (
                      <p className="text-sm text-gray-500">Nincsenek elérhető felhasználók</p>
                    ) : (
                      users
                        .filter(u => u.role === 'organizer')
                        .map((u) => (
                          <label key={u.id} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.organizerIds.includes(u.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, organizerIds: [...formData.organizerIds, u.id] })
                                } else {
                                  setFormData({ ...formData, organizerIds: formData.organizerIds.filter(id => id !== u.id) })
                                }
                              }}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-900">{u.name}</span>
                                <span className="text-xs text-gray-400 ml-2">{u.email}</span>
                              </div>
                            </div>
                          </label>
                        ))
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Csak szervező jogosultsággal rendelkező felhasználók jelennek meg
                  </p>
                </div>

                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-2">
                    {editingEvent ? 'Új képek/videók hozzáadása (opcionális)' : 'Képek és videók feltöltése *'}
                  </label>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-50 file:to-purple-50 file:text-indigo-700 hover:file:bg-gradient-to-r hover:file:from-indigo-100 hover:file:to-purple-100"
                    required={!editingEvent}
                  />
                  {selectedFiles && (
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedFiles.length} fájl kiválasztva
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

            {/* Events List */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meglévő események ({events.length})
              </h2>

              {events.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📷</div>
                  <p className="text-gray-400">
                    Még nincsenek események. Hozz létre egyet!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all hover:border-indigo-500 bg-gray-900/50">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                          {event.description && (
                            <p className="text-gray-400 mb-2">{event.description}</p>
                          )}
                          <p className="text-sm text-gray-400">
                            📅 {new Date(event.date).toLocaleDateString('hu-HU')} • 🖼️ {event.images.length} kép
                          </p>
                          {event.organizers && event.organizers.length > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-sm text-gray-600">👥 Szervezők:</span>
                              <div className="flex flex-wrap gap-2">
                                {event.organizers.map((organizer) => (
                                  <span 
                                    key={organizer.user.id} 
                                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium"
                                  >
                                    {organizer.user.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
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

                      {event.images.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-300 mb-3">Fájlok:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {event.images.map((image) => (
                              <div key={image.id} className="relative group">
                                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-shadow">
                                  {isVideoFile(image.filename) ? (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                  ) : (
                                    <Image
                                      src={image.path}
                                      alt={image.filename}
                                      fill
                                      quality={100}
                                      className="object-cover"
                                      sizes="150px"
                                    />
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDeleteImage(event.id, image.id)}
                                  className="absolute top-1.5 right-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all shadow-md"
                                  title="Fájl törlése"
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
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Profile Info */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Profil beállítások
              </h2>

              <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-700">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
                  <p className="text-gray-400">{user?.email}</p>
                  <div className="mt-2">
                    {user?.emailVerified ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ Email megerősítve
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Email nincs megerősítve
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
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
                  <label htmlFor="profileName" className="block text-sm font-medium text-gray-300 mb-2">
                    Név
                  </label>
                  <input
                    id="profileName"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-300 mb-2">
                    Email (nem módosítható)
                  </label>
                  <input
                    id="profileEmail"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800 text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Jelszó módosítása</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Jelenlegi jelszó
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Új jelszó
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                        minLength={8}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Új jelszó megerősítése
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? 'Mentés...' : 'Módosítások mentése'}
                </button>
              </form>
            </div>

            {/* Account Info */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fiók információk
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Fiók létrehozva:</span>
                  <span className="font-medium text-white">
                    {user ? new Date().toLocaleDateString('hu-HU') : '-'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Szerepkör:</span>
                  <span className="font-medium text-gray-900">Adminisztrátor</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-400">Email státusz:</span>
                  <span className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user?.emailVerified ? 'Megerősítve' : 'Nincs megerősítve'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Organizers Tab */}
        {activeTab === 'organizers' && (
          <div className="space-y-8">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Szervezők kezelése
              </h2>
              
              <p className="text-gray-400 mb-6">
                Jelöld meg, hogy mely regisztrált felhasználók legyenek szervezők. A szervezők jogosultak események létrehozására és kezelésére.
              </p>

              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Nincsenek regisztrált felhasználók</p>
                ) : (
                  users.filter(u => u.role !== 'organizer' && u.role !== 'admin').map((u) => (
                    <div 
                      key={u.id} 
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{u.name}</h3>
                          <p className="text-sm text-gray-400">{u.email}</p>
                          {u.emailVerified ? (
                            <span className="text-xs text-green-400">✓ Email megerősítve</span>
                          ) : (
                            <span className="text-xs text-yellow-400">⚠ Email nincs megerősítve</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {u.id === user?.id && (
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                            Te vagy
                          </span>
                        )}
                        <button
                          onClick={() => toggleOrganizerRole(u.id, u.role || 'user')}
                          disabled={u.id === user?.id || u.role === 'admin' || u.role === 'organizer'}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            u.role === 'organizer'
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : u.role === 'admin'
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-300 text-gray-300 hover:bg-gray-400'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {u.role === 'organizer' ? '✓ Szervező' : u.role === 'admin' ? '✓ Tulajdonos' : 'Szervező jogosultság adása'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


