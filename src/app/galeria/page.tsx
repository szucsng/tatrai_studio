import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import ColorBends from "@/components/ColorBends"
import { GalleryIcon, CalendarIcon, UsersIcon, CameraIcon } from "@/components/Icons"

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
      
      <nav className="bg-[#2D3436]/80 backdrop-blur-xl shadow-sm border-b border-[#E67E22]/20 sticky top-0 z-50">
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
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#F39C12] to-[#E67E22] bg-clip-text text-transparent">
                Rendezvények
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-[#FFF8E7] hover:text-[#F39C12] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#E67E22]/20 border border-transparent hover:border-[#E67E22]/30"
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
            <span className="bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent">
              Kép és Videó Galéria
            </span>
          </h1>
          <p className="text-[#BDC3C7] text-lg">Válassz egy eseményt a képek és videók megtekintéséhez</p>
        </div>
        
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-10">
            {/* Kamera ikon pulzáló körrel */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-36 h-36 rounded-full bg-[#E67E22]/10 animate-ping" />
              <span className="absolute w-28 h-28 rounded-full bg-[#E67E22]/15" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#E67E22]/30 to-[#F39C12]/40 flex items-center justify-center shadow-lg shadow-[#E67E22]/20">
                <CameraIcon className="w-12 h-12 text-[#F39C12]" />
              </div>
            </div>

            {/* Szöveg */}
            <div className="text-center max-w-lg">
              <h2 className="text-3xl font-extrabold mb-3">
                <span className="bg-gradient-to-r from-[#F39C12] to-[#E67E22] bg-clip-text text-transparent">
                  Hamarosan érkezik!
                </span>
              </h2>
              <p className="text-[#BDC3C7] text-lg leading-relaxed">
                Dolgozunk az első esemény galériájának feltöltésén. Nézz vissza hamarosan – izgalmas pillanatok várnak rád!
              </p>
            </div>

            {/* Dekor kártyák */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm opacity-40">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-[#2D3436]/80 border border-[#E67E22]/20 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event: EventType) => (
              <Link
                key={event.id}
                href={`/galeria/${event.id}`}
                className="block bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-md border border-[#E67E22]/30 p-6 hover:shadow-xl hover:shadow-[#E67E22]/20 transition-all hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold text-[#FFF8E7] group-hover:text-[#F39C12] transition-colors">
                        {event.name}
                      </h2>
                    </div>
                    {event.description && (
                      <p className="text-[#BDC3C7] mb-3">{event.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-[#BDC3C7]">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('hu-HU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <GalleryIcon className="w-4 h-4" />
                        {event.images.length} fájl
                      </span>
                    </div>
                    {event.organizers && event.organizers.length > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <UsersIcon className="w-4 h-4 text-[#BDC3C7]" />
                        <span className="text-[#BDC3C7]">Szervezők:</span>
                        <div className="flex flex-wrap gap-1">
                          {event.organizers.map((organizer) => (
                            <span 
                              key={organizer.user.id} 
                              className="bg-[#E67E22]/20 text-[#F39C12] px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {organizer.user.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E67E22]/20 to-[#F39C12]/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#E67E22]/30 group-hover:to-[#F39C12]/40 transition-all">
                      <svg
                        className="w-6 h-6 text-[#F39C12] group-hover:translate-x-1 transition-transform"
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
