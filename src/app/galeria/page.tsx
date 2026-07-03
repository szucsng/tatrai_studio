import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, CameraIcon } from "@/components/Icons"

export const dynamic = 'force-dynamic'

interface ImageType {
  id: string
  filename: string
  path: string
  thumbPath: string | null
  mediumPath: string | null
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
            select: { id: true, name: true }
          }
        }
      }
    },
    orderBy: { date: 'desc' }
  })

  const totalImages = events.reduce((sum, e) => sum + e.images.length, 0)

  return (
    <div className="min-h-screen relative">
      <div className="grain" />
      <div className="fixed inset-0 -z-10 bg-[#0b1016]" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1016]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#0b1016] flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">TL</span>
                </div>
              </div>
              <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">Tátrai Levente</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
              >
                Főoldal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#06B6D4] tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                Portfólió
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Munkáim
                </span>
              </h1>
              <p className="text-lg text-white/40 max-w-xl leading-relaxed">
                Válogatás az elmúlt évek eseményeiből, projektjeiből és együttműködéseiből.
              </p>
              <div className="flex items-center gap-8 mt-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center">
                    <CameraIcon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{events.length}</div>
                    <div className="text-xs text-white/30">Esemény</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 flex items-center justify-center">
                    <CameraIcon className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{totalImages}</div>
                    <div className="text-xs text-white/30">Fotó / Videó</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {events.length === 0 ? (
          <section className="pb-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center py-32 gap-10">
                <div className="relative">
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#7C3AED]/20 animate-ping" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#06B6D4]/30 flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <CameraIcon className="w-12 h-12 text-white/40" />
                  </div>
                </div>
                <div className="text-center max-w-md">
                  <h2 className="text-2xl font-bold text-white/80 mb-2">Hamarosan érkezik</h2>
                  <p className="text-white/30 leading-relaxed">
                    Az első galéria feltöltés alatt áll. Nézz vissza hamarosan!
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="pb-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {events.map((event: EventType) => {
                  const coverImage = event.images?.[0]
                  const hasCover = coverImage?.thumbPath || coverImage?.path

                  return (
                    <Link
                      key={event.id}
                      href={`/galeria/${event.id}`}
                      className="group block break-inside-avoid rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
                    >
                      <div className="relative overflow-hidden">
                        {hasCover ? (
                          <div className="relative w-full aspect-[4/3]">
                            <Image
                              src={coverImage.thumbPath || coverImage.path}
                              alt={event.name}
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1016] via-[#0b1016]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          </div>
                        ) : (
                          <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center">
                            <CameraIcon className="w-12 h-12 text-white/10" />
                          </div>
                        )}

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80">
                            {event.images.length} kép
                          </span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors mb-2">
                          {event.name}
                        </h3>
                        {event.description && (
                          <p className="text-sm text-white/40 line-clamp-2 mb-4 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-white/30">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {new Date(event.date).toLocaleDateString('hu-HU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/20">
              <span>© {new Date().getFullYear()}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Tátrai Levente</span>
            </div>
            <Link
              href="/"
              className="text-sm text-white/20 hover:text-white/60 transition-colors"
            >
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
