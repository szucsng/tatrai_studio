'use client'

import { useState, useEffect, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Video from "yet-another-react-lightbox/plugins/video"
import ColorBends from "@/components/ColorBends"

interface Image {
  id: string
  filename: string
  path: string
}

interface Event {
  id: string
  name: string
  description: string | null
  date: string
  images: Image[]
  organizers?: { user: { id: string; name: string } }[]
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCopyToast, setShowCopyToast] = useState(false)

  // Helper function to detect video files
  const isVideoFile = (filename: string): boolean => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v']
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data)
        const imageId = searchParams.get('image')
        if (imageId && data.images) {
          const index = data.images.findIndex((img: Image) => img.id === imageId)
          if (index !== -1) {
            setCurrentImageIndex(index)
            setLightboxOpen(true)
          }
        }
      })
  }, [id, searchParams])

  if (!event || !event.images) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const slides = event.images.map(img => {
    if (isVideoFile(img.filename)) {
      return {
        type: 'video' as const,
        sources: [
          {
            src: img.path,
            type: 'video/mp4',
          }
        ],
        width: 1920,
        height: 1080,
      }
    }
    return {
      src: img.path,
      alt: img.filename,
      width: 3840,
      height: 2160,
    }
  })

  const handleDownload = async (imagePath: string, filename: string) => {
    try {
      const response = await fetch(imagePath)
      const blob = await response.blob()
      
      // Ellenőrizzük a fájltípust és állítsuk be a megfelelő MIME type-ot
      let mimeType = blob.type
      if (!mimeType || mimeType === 'application/octet-stream') {
        const ext = filename.toLowerCase().split('.').pop()
        if (ext === 'mov') mimeType = 'video/quicktime'
        else if (ext === 'mp4') mimeType = 'video/mp4'
        else if (ext === 'avi') mimeType = 'video/x-msvideo'
        else if (ext === 'mkv') mimeType = 'video/x-matroska'
        else if (ext === 'webm') mimeType = 'video/webm'
      }
      
      const newBlob = new Blob([blob], { type: mimeType })
      const url = window.URL.createObjectURL(newBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Hiba a fájl letöltése során:', error)
    }
  }

  const handleShare = async (imageId: string) => {
    const shareUrl = `${window.location.origin}/galeria/${id}?image=${imageId}`
    try {
      // Ellenőrizzük hogy elérhető-e a clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setShowCopyToast(true)
        setTimeout(() => setShowCopyToast(false), 3000)
      } else {
        // Fallback régi böngészőkhöz
        const textArea = document.createElement('textarea')
        textArea.value = shareUrl
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          setShowCopyToast(true)
          setTimeout(() => setShowCopyToast(false), 3000)
        } catch (err) {
          console.error('Fallback másolás sem sikerült:', err)
          alert('Link másolása nem támogatott: ' + shareUrl)
        }
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error('Nem sikerült a link másolása:', error)
      alert('Nem sikerült a link másolása')
    }
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
      
      <nav className="bg-[#FFFBF0]/80 dark:bg-[#2D3436]/80 backdrop-blur-xl shadow-sm border-b border-[#FFE5B4]/50 dark:border-[#E67E22]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/galeria" 
                className="text-[#2D3436] dark:text-[#FFF8E7] hover:text-[#E67E22] dark:hover:text-[#F39C12] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#E67E22]/10 dark:hover:bg-[#E67E22]/20 border border-transparent hover:border-[#E67E22]/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Vissza a galériához
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-xl border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 p-8 mb-8">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#FFA726] dark:from-[#F39C12] dark:via-[#FFA726] dark:to-[#E67E22] bg-clip-text text-transparent">
              {event.name}
            </span>
          </h1>
          {event.description && (
            <p className="text-[#636E72] dark:text-[#BDC3C7] text-lg mb-3">{event.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-[#636E72] dark:text-[#BDC3C7] mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(event.date).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.images.length} fájl
            </span>
          </div>
          {event.organizers && event.organizers.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#636E72] dark:text-[#BDC3C7] font-medium">👥 Szervezők:</span>
              <div className="flex flex-wrap gap-2">
                {event.organizers.map((organizer) => (
                  <span 
                    key={organizer.user.id} 
                    className="bg-[#E67E22]/10 dark:bg-[#E67E22]/20 text-[#E67E22] dark:text-[#F39C12] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {organizer.user.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {event.images.map((image, index) => (
            <div key={image.id} className="relative group">
              <button
                onClick={() => {
                  setCurrentImageIndex(index)
                  setLightboxOpen(true)
                }}
                className="relative aspect-square rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer w-full shadow-md hover:shadow-xl hover:scale-105 duration-300"
              >
                {isVideoFile(image.filename) ? (
                  <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎬</div>
                      <div className="text-lg font-semibold mb-2">Videó</div>
                      <div className="text-sm opacity-75">Kattints a lejátszáshoz vagy letöltéshez</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={image.path}
                    alt={image.filename}
                    fill
                    quality={100}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isVideoFile(image.filename) && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-4 pointer-events-none">
                    <svg className="w-8 h-8 text-[#E67E22]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </button>
              <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare(image.id)
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-all"
                  title="Fájl megosztása - link másolása"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(image.path, image.filename)
                  }}
                  className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] hover:from-[#F39C12] hover:to-[#FFA726] text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-all"
                  title="Fájl letöltése eredeti minőségben"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentImageIndex}
          plugins={[Zoom, Video]}
          zoom={{
            maxZoomPixelRatio: 5,
            scrollToZoom: true,
            doubleClickMaxStops: 3,
          }}
          video={{
            controls: true,
            autoPlay: false,
            playsInline: true,
          }}
        />

        {showCopyToast && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Link vágólapra másolva!</span>
          </div>
        )}
      </main>
    </div>
  )
}
