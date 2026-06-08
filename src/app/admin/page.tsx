'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, UsersIcon, GalleryIcon, EditIcon, TrashIcon, UploadIcon } from '@/components/Icons'

type Event = {
  id: string
  name: string
  description: string | null
  date: string
  images: { id: string; filename: string; path: string; thumbPath?: string; createdAt?: string }[]
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadingFile, setUploadingFile] = useState('')

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
    setUploadProgress(0)
    setUploadStatus('')

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

      // Progress tracking
      let uploadedSize = 0
      const totalSize = Array.from(selectedFiles || []).reduce((sum, file) => sum + file.size, 0)

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (response.ok) {
        setSuccess(editingEvent ? 'Esemény sikeresen frissítve!' : 'Esemény sikeresen létrehozva!')
        setUploadStatus('Feldolgozás... Kérjük várjon!')
        setUploadProgress(100)
        
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
        
        // Kicsit vár majd az első refresh
        setTimeout(async () => {
          await loadEvents()
          setUploadStatus('Képek feldolgozása... Kérjük várjon!')
        }, 1000)
        
        // Automata refresh néhány másodperc múlva hogy biztos az összes thumbnail létre legyen hozva
        setTimeout(async () => {
          await loadEvents()
          setUploadProgress(0)
          setUploadStatus('')
          setSuccess('Esemény és képek sikeresen feltöltve! Minden kép elérhető a weboldalon.')
        }, 4000)
        
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
      const updateData: { name?: string; currentPassword?: string; newPassword?: string } = {}

      // Név frissítés, ha megváltozott
      if (profileData.name && profileData.name !== user?.name) {
        updateData.name = profileData.name
      }

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

        if (!profileData.currentPassword) {
          setError('Add meg a jelenlegi jelszavadat a módosításhoz')
          setLoading(false)
          return
        }

        updateData.currentPassword = profileData.currentPassword
        updateData.newPassword = profileData.newPassword
      }

      // Ha nincs mit frissíteni
      if (Object.keys(updateData).length === 0) {
        setError('Nincs mit frissíteni')
        setLoading(false)
        return
      }

      // API hívás a profil frissítéséhez
      const response = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        setSuccess('Profil sikeresen frissítve!')
        await loadUserData()
        setProfileData({
          ...profileData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Hiba történt a profil frissítése során')
      }
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
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      
      {/* Navigation */}
      <nav className="bg-[#0b1016]/80 backdrop-blur-xl shadow-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={50} 
                height={50} 
                priority
                className="object-contain"
              />
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Admin Panel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/galeria" 
                className="text-[#f5f5f5] hover:text-[#06B6D4] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#7C3AED]/20 border border-transparent hover:border-[#7C3AED]/30 flex items-center gap-2"
              >
                <GalleryIcon className="w-4 h-4" />
                Galéria
              </Link>
              <div className="flex items-center space-x-3 px-4 py-2 bg-[#7C3AED]/20 rounded-lg border border-[#7C3AED]/30">
                <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-sm font-medium text-[#f5f5f5]">{user?.name || 'Admin'}</span>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] shadow-md'
                  : 'text-[#f5f5f5] hover:bg-[#7C3AED]/20'
              }`}
            >
              <CalendarIcon className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-[#0b0f18]' : 'text-[#06B6D4]'}`} />
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('events')
                loadUsers()
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] shadow-md'
                  : 'text-[#f5f5f5] hover:bg-[#7C3AED]/20'
              }`}
            >
              <CalendarIcon className={`w-5 h-5 ${activeTab === 'events' ? 'text-[#0b0f18]' : 'text-[#06B6D4]'}`} />
              Események
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] shadow-md'
                  : 'text-[#f5f5f5] hover:bg-[#7C3AED]/20'
              }`}
            >
              <UsersIcon className={`w-5 h-5 ${activeTab === 'profile' ? 'text-[#0b0f18]' : 'text-[#06B6D4]'}`} />
              Profil
            </button>
            {(user?.role === 'admin' || user?.role === 'organizer') && (
              <button
                onClick={() => {
                  setActiveTab('organizers')
                  loadUsers()
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'organizers'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] shadow-md'
                    : 'text-[#f5f5f5] hover:bg-[#7C3AED]/20'
                }`}
              >
                <UsersIcon className={`w-5 h-5 ${activeTab === 'organizers' ? 'text-[#0b0f18]' : 'text-[#06B6D4]'}`} />
                Szervezők
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] rounded-2xl shadow-xl p-6 text-[#0b0f18]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Összes esemény</p>
                    <p className="text-4xl font-bold mt-2">{stats.totalEvents}</p>
                  </div>
                  <div className="opacity-20">
                    <CalendarIcon className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-2xl shadow-xl p-6 text-[#0b0f18]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Összes fájl</p>
                    <p className="text-4xl font-bold mt-2">{stats.totalImages}</p>
                  </div>
                  <div className="opacity-20">
                    <GalleryIcon className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] rounded-2xl shadow-xl p-6 text-[#0b0f18]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Új események (30 nap)</p>
                    <p className="text-4xl font-bold mt-2">{stats.recentEvents}</p>
                  </div>
                  <div className="text-5xl opacity-20">✨</div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Legutóbbi események
              </h2>
              {events.slice(0, 5).length === 0 ? (
                <p className="text-[#9CA3AF] text-center py-8">Még nincsenek események</p>
              ) : (
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-white/10 rounded-xl hover:shadow-md transition-all bg-white/5">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#f5f5f5]">{event.name}</h3>
                        <p className="text-sm text-[#9CA3AF]">
                          {new Date(event.date).toLocaleDateString('hu-HU')} • {event.images.length} fájl
                        </p>
                      </div>
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#0b0f18] rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        Szerkesztés
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Gyors műveletek
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('events')}
                  className="p-6 border-2 border-[#7C3AED]/50 rounded-xl hover:border-[#7C3AED] hover:bg-[#7C3AED]/20 transition-all text-left"
                >
                  <div className="text-3xl mb-2">➕</div>
                  <h3 className="font-semibold text-[#f5f5f5] mb-1">Új esemény létrehozása</h3>
                  <p className="text-sm text-[#9CA3AF]">Hozz létre új eseményt képekkel és videókkal</p>
                </button>
                <Link
                  href="/galeria"
                  className="p-6 border-2 border-[#06B6D4]/50 rounded-xl hover:border-[#06B6D4] hover:bg-[#06B6D4]/20 transition-all text-left"
                >
                  <div className="flex justify-center mb-2">
                    <GalleryIcon className="w-8 h-8 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-semibold text-[#f5f5f5] mb-1">Galéria megtekintése</h3>
                  <p className="text-sm text-[#9CA3AF]">Nézd meg a nyilvános galériát</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Create/Edit Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                {editingEvent ? 'Esemény szerkesztése' : 'Új esemény létrehozása'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Esemény neve *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Leírás (opcionális)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Dátum
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Szervezők
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-white/10 rounded-xl p-4 bg-[#0b1016]/50">
                    {users.length === 0 ? (
                      <p className="text-sm text-[#6B7280]">Nincsenek elérhető felhasználók</p>
                    ) : (
                      users
                        .filter(u => u.role === 'organizer')
                        .map((u) => (
                          <label key={u.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
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
                              className="w-4 h-4 text-[#7C3AED] border-white/30 rounded focus:ring-[#7C3AED] bg-[#0b1016]"
                            />
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-[#f5f5f5]">{u.name}</span>
                                <span className="text-xs text-[#9CA3AF] ml-2">{u.email}</span>
                              </div>
                            </div>
                          </label>
                        ))
                    )}
                  </div>
                  <p className="mt-2 text-xs text-[#6B7280]">
                    Csak szervező jogosultsággal rendelkező felhasználók jelennek meg
                  </p>
                </div>

                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    {editingEvent ? 'Új képek/videók hozzáadása (opcionális)' : 'Képek és videók feltöltése *'}
                  </label>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#7C3AED] file:to-[#06B6D4] file:text-[#0b0f18] hover:file:from-[#8B5CF6] hover:file:to-[#14C8E0]"
                    required={!editingEvent}
                  />
                  {selectedFiles && (
                    <p className="mt-2 text-sm text-[#9CA3AF]">
                      {selectedFiles.length} fájl kiválasztva
                    </p>
                  )}

                  {uploadProgress > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#06B6D4]">
                          {uploadStatus || `Feltöltés: ${uploadProgress}%`}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">Kérjük várjon...</span>
                      </div>
                      <div className="w-full bg-[#0b1016] rounded-full h-2 overflow-hidden border border-white/10">
                        <div
                          className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] h-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {loading ? (editingEvent ? 'Frissítés...' : 'Létrehozás...') : (editingEvent ? 'Esemény frissítése' : 'Esemény létrehozása')}
                  </button>
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 bg-white/10 hover:bg-white/20 text-[#f5f5f5] font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                      Mégse
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Meglévő események ({events.length})
              </h2>

              {events.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <GalleryIcon className="w-16 h-16 text-[#06B6D4]" />
                  </div>
                  <p className="text-[#9CA3AF]">
                    Még nincsenek események. Hozz létre egyet!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-white/10 rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#7C3AED]/50 bg-white/5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#f5f5f5] mb-2">{event.name}</h3>
                          {event.description && (
                            <p className="text-[#9CA3AF] mb-2">{event.description}</p>
                          )}
                          <p className="text-sm text-[#9CA3AF] flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString('hu-HU')} • 
                            <GalleryIcon className="w-4 h-4" />
                            {event.images.length} kép
                          </p>
                          {event.organizers && event.organizers.length > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                              <UsersIcon className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-sm text-[#9CA3AF]">Szervezők:</span>
                              <div className="flex flex-wrap gap-2">
                                {event.organizers.map((organizer) => (
                                  <span 
                                    key={organizer.user.id} 
                                    className="text-xs bg-[#7C3AED]/20 text-[#06B6D4] px-2 py-1 rounded-full font-medium"
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
                            className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
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
                          <p className="text-sm font-medium text-[#9CA3AF] mb-3">Fájlok:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {event.images.map((image) => (
                              <div key={image.id} className="relative group">
                                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#0b1016] shadow-md group-hover:shadow-lg transition-shadow">
                                  {isVideoFile(image.filename) ? (
                                    <div className="w-full h-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                  ) : (
                                    <Image
                                      src={image.thumbPath ? `${image.thumbPath}?t=${Date.now()}` : `${image.path}?t=${Date.now()}`}
                                      alt={image.filename}
                                      fill
                                      quality={100}
                                      className="object-cover"
                                      sizes="150px"
                                      unoptimized
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Profil beállítások
              </h2>

              <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-white/10">
                <div className="w-24 h-24 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#f5f5f5]">{user?.name}</h3>
                  <p className="text-[#9CA3AF]">{user?.email}</p>
                  <div className="mt-2">
                    {user?.emailVerified ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                        ✓ Email megerősítve
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400">
                        ⚠️ Email nincs megerősítve
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="profileName" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Név
                  </label>
                  <input
                    id="profileName"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="profileEmail" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Email (nem módosítható)
                  </label>
                  <input
                    id="profileEmail"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#6B7280] rounded-xl cursor-not-allowed"
                  />
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Jelszó módosítása</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                        Jelenlegi jelszó
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                        Új jelszó
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                        minLength={8}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                        Új jelszó megerősítése
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0b1016]/50 border border-white/10 text-[#f5f5f5] rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all outline-none"
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#8B5CF6] hover:to-[#14C8E0] text-[#0b0f18] font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? 'Mentés...' : 'Módosítások mentése'}
                </button>
              </form>
            </div>

            {/* Account Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Fiók információk
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-[#9CA3AF]">Fiók létrehozva:</span>
                  <span className="font-medium text-[#f5f5f5]">
                    {user ? new Date().toLocaleDateString('hu-HU') : '-'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-[#9CA3AF]">Szerepkör:</span>
                  <span className="font-medium text-[#f5f5f5]">Adminisztrátor</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#9CA3AF]">Email státusz:</span>
                  <span className={`font-medium ${user?.emailVerified ? 'text-green-400' : 'text-yellow-400'}`}>
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                Szervezők kezelése
              </h2>
              
              <p className="text-[#9CA3AF] mb-6">
                Jelöld meg, hogy mely regisztrált felhasználók legyenek szervezők. A szervezők jogosultak események létrehozására és kezelésére.
              </p>

              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-[#9CA3AF] py-8">Nincsenek regisztrált felhasználók</p>
                ) : (
                  users.filter(u => u.role !== 'admin').map((u) => (
                    <div 
                      key={u.id} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#f5f5f5]">{u.name}</h3>
                          <p className="text-sm text-[#9CA3AF]">{u.email}</p>
                          {u.emailVerified ? (
                            <span className="text-xs text-green-400">✓ Email megerősítve</span>
                          ) : (
                            <span className="text-xs text-yellow-400">⚠ Email nincs megerősítve</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {u.role === 'organizer' && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                            ✓ Szervező
                          </span>
                        )}
                        {u.id === user?.id && (
                          <span className="text-xs bg-[#7C3AED]/20 text-[#06B6D4] px-3 py-1 rounded-full font-medium">
                            Te vagy
                          </span>
                        )}
                        <button
                          onClick={() => toggleOrganizerRole(u.id, u.role || 'user')}
                          disabled={u.id === user?.id || u.role === 'admin' || (user?.role !== 'admin' && user?.role !== 'organizer')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            u.role === 'organizer'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {u.role === 'organizer' ? 'Jogosultság elvétele' : 'Szervező jogosultság adása'}
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




