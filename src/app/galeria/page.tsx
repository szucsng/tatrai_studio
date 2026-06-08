import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
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
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />
      
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
                Rendezvények
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-[#f5f5f5] hover:text-[#06B6D4] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#7C3AED]/20 border border-transparent hover:border-[#7C3AED]/30"
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
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Munkáim
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg">Válassz egy eseményt a képek és videók megtekintéséhez</p>
        </div>
        
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-10">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-36 h-36 rounded-full bg-[#7C3AED]/10 animate-ping" />
              <span className="absolute w-28 h-28 rounded-full bg-[#7C3AED]/15" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#06B6D4]/40 flex items-center justify-center shadow-lg shadow-[#7C3AED]/20">
                <CameraIcon className="w-12 h-12 text-[#06B6D4]" />
              </div>
            </div>

            <div className="text-center max-w-lg">
              <h2 className="text-3xl font-extrabold mb-3">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                  Hamarosan érkezik!
                </span>
              </h2>
              <p className="text-[#9CA3AF] text-lg leading-relaxed">
                Dolgozunk az első esemény galériájának feltöltésén. Nézz vissza hamarosan – izgalmas pillanatok várnak rád!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-sm opacity-40">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-white/5 border border-white/10 animate-pulse"
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
                className="block bg-white/5 backdrop-blur-xl rounded-2xl shadow-md border border-white/10 p-6 hover:shadow-xl hover:shadow-[#7C3AED]/10 transition-all hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold text-[#f5f5f5] group-hover:text-[#06B6D4] transition-colors">
                        {event.name}
                      </h2>
                    </div>
                    {event.description && (
                      <p className="text-[#9CA3AF] mb-3">{event.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-[#9CA3AF]">
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
                        <UsersIcon className="w-4 h-4 text-[#9CA3AF]" />
                        <span className="text-[#9CA3AF]">Szervezők:</span>
                        <div className="flex flex-wrap gap-1">
                          {event.organizers.map((organizer) => (
                            <span 
                              key={organizer.user.id} 
                              className="bg-[#7C3AED]/20 text-[#06B6D4] px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {organizer.user.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#7C3AED]/30 group-hover:to-[#06B6D4]/40 transition-all">
                      <svg
                        className="w-6 h-6 text-[#06B6D4] group-hover:translate-x-1 transition-transform"
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
