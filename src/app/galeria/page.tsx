import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatEventDate } from '@/lib/format'
import { isVideoFile } from '@/lib/media'
import GalleryBrowser, { type GalleryEvent } from '@/components/GalleryBrowser'
import { GalleryFooter, GalleryHeader } from '@/components/GalleryChrome'

export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      date: true,
      images: {
        select: {
          id: true,
          filename: true,
          path: true,
          thumbPath: true,
          mediumPath: true,
        },
      },
      organizers: {
        select: {
          user: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { date: 'desc' },
  })

  const totalPhotos = events.reduce(
    (sum, event) => sum + event.images.filter((image) => !isVideoFile(image.filename)).length,
    0
  )
  const totalVideos = events.reduce(
    (sum, event) => sum + event.images.filter((image) => isVideoFile(image.filename)).length,
    0
  )

  const featured = events[0]
  const featuredPhotos = featured?.images.filter((image) => !isVideoFile(image.filename)) ?? []
  const featuredVideos = featured?.images.filter((image) => isVideoFile(image.filename)) ?? []
  const featuredImage = featuredPhotos[0] ?? featured?.images[0]
  const featuredImageSrc =
    featuredImage?.mediumPath ||
    featuredImage?.thumbPath ||
    (featuredImage && !isVideoFile(featuredImage.filename) ? featuredImage.path : null) ||
    '/indexkep2.jpg'
  const featuredOrganizers =
    featured?.organizers.map((organizer) => organizer.user.name).join(', ') ?? ''

  const heroImage =
    featuredPhotos[0]?.mediumPath || featuredPhotos[0]?.path || '/indexkep2.jpg'

  const galleryEvents: GalleryEvent[] = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-[#0b1016] text-[#f5f5f5]">
      <div className="grain" />
      <GalleryHeader />

      <main>
        <section className="relative flex min-h-[72vh] items-end overflow-hidden pb-14 pt-32">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1016]/35 via-[#0b1016]/65 to-[#0b1016]" />

          <div className="container relative">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">
              Portfólió
            </p>
            <h1 className="mt-4 text-[clamp(3.5rem,12vw,9rem)] font-light uppercase leading-[0.85] tracking-[0.02em]">
              Galéria
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Rendezvények, emberek és pillanatok. Válogatás a munkáimból, eseményekre rendezve.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#events" className="btn btn-primary">
                Események
              </Link>
              <Link href="/#faq" className="btn btn-ghost">
                Kapcsolat
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.16em] text-white/55">
              <span>{events.length} esemény</span>
              <span>{totalPhotos} fotó</span>
              <span>{totalVideos} videó</span>
            </div>
          </div>
        </section>

        {featured && (
          <section id="featured" className="container border-b border-white/10 py-14 md:py-20">
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">
                Kiemelt esemény
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">
                Legfrissebb
              </h2>
            </div>

            <Link
              href={`/galeria/${featured.id}`}
              className="group grid overflow-hidden border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-[#E0A458]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1016] lg:grid-cols-[1.25fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03] lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={featuredImageSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {featuredVideos.length > 0 && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-black/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90">
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {featuredVideos.length} videó
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {formatEventDate(featured.date)}
                </p>
                <h3 className="mt-3 text-2xl font-light leading-tight text-white/95 md:text-4xl">
                  {featured.name}
                </h3>
                {featured.description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/60 md:text-base">
                    {featured.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-white/55">
                  <span>{featuredPhotos.length} fotó</span>
                  {featuredVideos.length > 0 && <span>{featuredVideos.length} videó</span>}
                  {featuredOrganizers && (
                    <span className="normal-case tracking-normal text-white/50">
                      Szervező: {featuredOrganizers}
                    </span>
                  )}
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E0A458]">
                  Esemény megnyitása
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </section>
        )}

        <section id="events" className="container py-14 md:py-20">
          <GalleryBrowser events={galleryEvents} />
        </section>

        <section className="container border-t border-white/10 py-14 md:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">
                Kapcsolat
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">
                Dolgozzunk együtt
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                Ha van egy esemény, amit meg kell örökíteni, írj, és megbeszéljük a részleteket.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#faq" className="btn btn-primary">
                Kapcsolatfelvétel
              </Link>
              <Link href="/" className="btn btn-ghost">
                Főoldal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GalleryFooter />
    </div>
  )
}
