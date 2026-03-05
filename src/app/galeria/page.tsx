import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "@/components/ThemeToggle"
import ColorBends from "@/components/ColorBends"

export const dynamic = 'force-dynamic'

interface ImageType {
  id: string
  filename: string
  path: string
  eventId: string
  createdAt: Date
  updatedAt: Date
}

interface EventType {
  id: string
  name: string
  description: string | null
  date: Date
  createdAt: Date
  updatedAt: Date
  images: ImageType[]
  organizers: { user: { id: string; name: string } }[]
}

export default async function GaleriaPage() {
  const events = await prisma.event.findMany({
    include: {
      images: true,
      organizers: {
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

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
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#E67E22] to-[#F39C12] dark:from-[#F39C12] dark:to-[#E67E22] bg-clip-text text-transparent">
                Rendezvények
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/" 
                className="text-[#2D3436] dark:text-[#FFF8E7] hover:text-[#E67E22] dark:hover:text-[#F39C12] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#E67E22]/10 dark:hover:bg-[#E67E22]/20 border border-transparent hover:border-[#E67E22]/30"
              >
                Főoldal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#FFA726] dark:from-[#F39C12] dark:via-[#FFA726] dark:to-[#E67E22] bg-clip-text text-transparent">
              Kép és Videó Galéria
            </span>
          </h1>
          <p className="text-[#636E72] dark:text-[#BDC3C7] text-lg">Válassz egy eseményt a képek és videók megtekintéséhez</p>
        </div>
        
        {events.length === 0 ? (
          <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-xl border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 p-12 text-center">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-[#636E72] dark:text-[#BDC3C7] text-lg">
              Még nincsenek feltöltött események. 
              <Link href="/admin" className="text-[#E67E22] dark:text-[#F39C12] hover:text-[#F39C12] dark:hover:text-[#FFA726] font-semibold ml-1 underline decoration-2">
                Kattints ide
              </Link> az első esemény létrehozásához.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event: EventType) => (
              <Link
                key={event.id}
                href={`/galeria/${event.id}`}
                className="block bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-md border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 p-6 hover:shadow-xl hover:shadow-[#E67E22]/20 transition-all hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold text-[#2D3436] dark:text-[#FFF8E7] group-hover:text-[#E67E22] dark:group-hover:text-[#F39C12] transition-colors">
                        {event.name}
                      </h2>
                    </div>
                    {event.description && (
                      <p className="text-[#636E72] dark:text-[#BDC3C7] mb-3">{event.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-[#636E72] dark:text-[#BDC3C7]">
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
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="text-[#636E72] dark:text-[#BDC3C7]">👥 Szervezők:</span>
                        <div className="flex flex-wrap gap-1">
                          {event.organizers.map((organizer) => (
                            <span 
                              key={organizer.user.id} 
                              className="bg-[#E67E22]/10 dark:bg-[#E67E22]/20 text-[#E67E22] dark:text-[#F39C12] px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {organizer.user.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E67E22]/10 to-[#F39C12]/20 dark:from-[#E67E22]/20 dark:to-[#F39C12]/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#E67E22]/20 group-hover:to-[#F39C12]/30 transition-all">
                      <svg
                        className="w-6 h-6 text-[#E67E22] dark:text-[#F39C12] group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
