import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

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

function isVideo(filename: string) {
  return /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(filename)
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function GaleriaPage() {
  const events = await prisma.event.findMany({
    include: {
      images: true,
      organizers: {
        include: {
          user: { select: { id: true, name: true } }
        }
      }
    },
    orderBy: { date: 'desc' }
  })

  const totalPhotos = events.reduce((s, e) => s + e.images.filter(i => !isVideo(i.filename)).length, 0)
  const totalVideos = events.reduce((s, e) => s + e.images.filter(i => isVideo(i.filename)).length, 0)
  const featured = events[0]

  return (
    <div className="min-h-screen" style={{ background: '#0b1016' }}>
      <div className="grain" />

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.025) 0%, transparent 60%)' }} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 w-full" style={{ background: 'rgba(14,16,18,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full px-6 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-medium tracking-[2px] uppercase text-sm" style={{ color: '#f5f5f5' }}>
                Tátrai Levente
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-xs tracking-[2px] uppercase font-medium transition-all duration-300" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Főoldal
              </Link>
              <Link href="/galeria" className="text-xs tracking-[2px] uppercase font-medium transition-all duration-300 relative" style={{ color: '#fff' }}>
                Galéria
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-white" />
              </Link>
              <Link href="/#faq" className="text-xs tracking-[2px] uppercase font-medium transition-all duration-300" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Kapcsolat
              </Link>
            </div>
            <Link
              href="/#faq"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))',
                color: '#0b0f18',
                borderRadius: '14px',
                boxShadow: '0 18px 45px rgba(124,58,237,0.22)',
              }}
            >
              Ajánlatot kérek
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/indexkep2.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(11,16,22,0.10) 0%, rgba(11,16,22,0.35) 25%, rgba(11,16,22,0.70) 55%, #0b1016 100%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(90deg, rgba(124,58,237,0.06) 0%, transparent 50%, rgba(6,182,212,0.04) 100%)'
            }} />
          </div>

          <div className="relative w-full px-6 lg:px-16 pt-32 pb-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase mb-10" style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
              }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(124,58,237,1)', boxShadow: '0 0 12px rgba(124,58,237,0.7)' }} />
                Portfólió
              </div>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-light leading-none tracking-[2px] uppercase mb-4" style={{ color: '#f5f5f5' }}>
                Galéria
              </h1>
              <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Rendezvények, események és történetek képekben.
                Válassz egy eseményt a fotók és videók megtekintéséhez.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#featured"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:translate-y-[-1px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))',
                    color: '#0b0f18',
                    borderRadius: '14px',
                    boxShadow: '0 18px 45px rgba(124,58,237,0.22)',
                  }}
                >
                  Események
                </Link>
                <Link
                  href="#stats"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:translate-y-[-1px]"
                  style={{
                    color: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                  }}
                >
                  Statisztika
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="relative z-10 w-full" style={{ marginTop: '-36px' }}>
          <div className="w-full px-6 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {[
                { value: `${events.length}`, label: 'rendezvény', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { value: `${totalPhotos}+`, label: 'fotó', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z' },
                { value: `${totalVideos}+`, label: 'videó', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                { value: `${totalPhotos + totalVideos}+`, label: 'fájl', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '18px',
                    padding: '24px 20px',
                    boxShadow: '0 18px 55px rgba(0,0,0,0.20)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-[clamp(2rem,4vw,3rem)] font-black leading-none mb-1.5" style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full mt-28">
          <div className="w-full px-6 lg:px-16">
            <div className="relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '22px',
              padding: '20px',
              boxShadow: '0 18px 70px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
            }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.03), transparent 50%)',
                borderRadius: '22px',
              }} />
              <div className="flex flex-col md:flex-row gap-4 items-stretch relative z-10">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300" style={{ color: 'rgba(255,255,255,0.20)' }}>
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Keresés rendezvény szerint..."
                    className="w-full h-12 pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:ring-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.8)',
                      borderRadius: '14px',
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {['Összes', 'Koncert', 'Esküvő', 'Sport', 'Iskola', 'Autó', 'Rendezvény', 'Egyéb'].map((cat) => (
                    <button
                      key={cat}
                      className="px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:translate-y-[-1px]"
                      style={{
                        background: cat === 'Összes' ? 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))' : 'rgba(255,255,255,0.06)',
                        color: cat === 'Összes' ? '#0b0f18' : 'rgba(255,255,255,0.75)',
                        border: cat === 'Összes' ? 'none' : '1px solid rgba(255,255,255,0.14)',
                        borderRadius: '999px',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {featured && (
          <section id="featured" className="w-full mt-28">
            <div className="w-full px-6 lg:px-16">
              <div className="mb-10">
                <span className="inline-block text-xs font-black uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                  Kiemelt esemény
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light leading-none tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Legfrissebb
                </h2>
              </div>
              <Link
                href={`/galeria/${featured.id}`}
                className="group relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '22px',
                  boxShadow: '0 18px 70px rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '22px' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(6,182,212,0.02))' }} />
                </div>
                <div className="flex flex-col lg:flex-row min-h-[220px]">
                  <div className="relative flex-shrink-0 w-full lg:w-[460px] min-h-[260px] overflow-hidden" style={{ borderRadius: '22px 22px 0 0' }}>
                    <Image
                      src={featured.images[0]?.thumbPath || featured.images[0]?.path || '/indexkep2.jpg'}
                      alt=""
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="460px"
                      unoptimized
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(11,16,22,0.40) 0%, transparent 60%)' }} />

                    {featured.images.filter(i => isVideo(i.filename)).length > 0 && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider" style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <i className="fas fa-play mr-1.5" />
                        Videó
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-10 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider mb-3" style={{ color: 'rgba(124,58,237,0.8)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(124,58,237,1)', boxShadow: '0 0 8px rgba(124,58,237,0.6)' }} />
                      Kiemelt
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.92)' }}>
                      {featured.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <span>{new Date(featured.date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                      <span>{featured.images.filter(i => !isVideo(i.filename)).length} fotó</span>
                      {featured.images.filter(i => isVideo(i.filename)).length > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                          <span>{featured.images.filter(i => isVideo(i.filename)).length} videó</span>
                        </>
                      )}
                    </div>
                    {featured.description && (
                      <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'rgba(255,255,255,0.70)' }}>
                        {featured.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3" style={{ color: 'rgba(124,58,237,0.9)' }}>
                      Esemény megtekintése
                      <svg className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        <section id="events" className="w-full mt-28 pb-24">
          <div className="w-full px-6 lg:px-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="inline-block text-xs font-black uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                  Események
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light leading-none tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Rendezvények
                </h2>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.70)' }}>
                  {events.length} esemény, {totalPhotos + totalVideos} médiafájl
                </p>
              </div>
            </div>

            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <svg className="w-10 h-10" style={{ color: 'rgba(255,255,255,0.25)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Hamarosan érkezik</h3>
                <p className="text-sm text-center max-w-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>Az első galéria feltöltés alatt áll. Nézz vissza később!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event: EventType) => {
                  const photos = event.images.filter(i => !isVideo(i.filename))
                  const videos = event.images.filter(i => isVideo(i.filename))
                  const previews = event.images.slice(0, 2)

                  return (
                    <Link
                      key={event.id}
                      href={`/galeria/${event.id}`}
                      className="group relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: '22px',
                        boxShadow: '0 18px 55px rgba(0,0,0,0.22)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.04), transparent)' }} />
                      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)' }} />

                      <div className="flex flex-col">
                        <div className="relative w-full h-[220px] overflow-hidden">
                          {previews[0] ? (
                            <Image
                              src={previews[0].thumbPath || previews[0].path}
                              alt=""
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              loading="lazy"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                              <svg className="w-12 h-12" style={{ color: 'rgba(255,255,255,0.10)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(11,16,22,0.60) 100%)' }} />

                          {videos.length > 0 && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider" style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.10)' }}>
                              <i className="fas fa-play mr-1" />
                              {videos.length} videó
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                            {previews.length > 1 && (
                              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                                <Image
                                  src={previews[1].thumbPath || previews[1].path}
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full"
                                  unoptimized
                                />
                              </div>
                            )}
                            <div className="text-[11px] font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                              {photos.length} fotó
                            </div>
                          </div>
                        </div>

                        <div className="p-6 relative z-10">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-black tracking-tight truncate" style={{ color: 'rgba(255,255,255,0.92)' }}>
                                {event.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1.5 text-[10px] font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.50)' }}>
                                <span>{new Date(event.date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'short' })}</span>
                              </div>
                            </div>
                            <StarRating />
                          </div>

                          {event.description && (
                            <p className="text-sm leading-relaxed mt-2 line-clamp-2" style={{ color: 'rgba(255,255,255,0.60)' }}>
                              {event.description}
                            </p>
                          )}

                          {event.organizers.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              {event.organizers.map((o) => (
                                <span
                                  key={o.user.id}
                                  className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider"
                                  style={{
                                    background: 'rgba(124,58,237,0.12)',
                                    color: 'rgba(124,58,237,0.8)',
                                    border: '1px solid rgba(124,58,237,0.10)',
                                    borderRadius: '999px',
                                  }}
                                >
                                  {o.user.name}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-4 text-[11px] font-bold uppercase tracking-wider transition-all duration-300" style={{ color: 'rgba(124,58,237,0.8)' }}>
                            Megtekintés
                            <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="w-full pb-24">
          <div className="w-full px-6 lg:px-16">
            <div className="relative overflow-hidden transition-all duration-300" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '22px',
              padding: '28px',
              boxShadow: '0 18px 70px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
            }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.06), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.04), transparent 60%)',
                borderRadius: '22px',
              }} />
              <div className="absolute left-[14px] top-[14px] bottom-[14px] w-[3px] rounded-full" style={{
                background: 'linear-gradient(180deg, rgba(120,100,255,0.9), rgba(60,160,255,0.6))',
                opacity: 0.85,
              }} />
              <div className="flex flex-col lg:flex-row items-center gap-6 pl-4 relative z-10">
                <div className="flex-1">
                  <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-tight mb-3" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Te lehetsz a <span style={{ background: 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>következő</span>
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                    Dolgozzunk együtt valami különlegesen.
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:translate-y-[-1px]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,1), rgba(6,182,212,1))',
                      color: '#0b0f18',
                      borderRadius: '14px',
                      boxShadow: '0 18px 45px rgba(124,58,237,0.22)',
                    }}
                  >
                    Ajánlatot kérek
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:translate-y-[-1px]"
                    style={{
                      color: 'rgba(255,255,255,0.92)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                    }}
                  >
                    Főoldal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="w-full px-6 lg:px-16" style={{ maxWidth: '100%' }}>
          <div className="footer-grid" style={{ maxWidth: 'none' }}>
            <div className="footer-brand">
              <a className="footer-logo" href="/" aria-label="Tátrai Levente kezdőlap">Tátrai Levente<span>.</span></a>
            </div>
            <nav className="footer-links" aria-label="Gyors linkek">
              <h3>Gyors linkek</h3>
              <ul>
                <li><a href="/galeria">Galéria</a></li>
                <li><a href="/#next">Rólam</a></li>
                <li><a href="/#faq">Kapcsolat</a></li>
              </ul>
            </nav>

            <div className="footer-contact">
              <h3>Kapcsolat</h3>
              <div className="footer-cta">
                <a className="btn btn-accent" href="/#faq">Kapcsolatfelvétel</a>
                <a className="btn btn-ghost" href="/galeria">Munkák</a>
              </div>
              <div className="footer-social" aria-label="Közösségi oldalak">
                <a href="#" aria-label="Instagram" className="social-btn"><i className="fab fa-instagram" /></a>
                <a href="#" aria-label="TikTok" className="social-btn"><i className="fab fa-tiktok" /></a>
                <a href="#" aria-label="YouTube" className="social-btn"><i className="fab fa-youtube" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:px-16" style={{ maxWidth: '100%' }}>
          <div className="footer-bottom" style={{ maxWidth: 'none' }}>
            <p>© {new Date().getFullYear()} Tátrai Levente. Minden jog fenntartva.</p>
            <div className="footer-legal">
              <a href="#">Adatkezelési tájékoztató</a>
              <span className="sep">•</span>
              <a href="#">Impresszum</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
