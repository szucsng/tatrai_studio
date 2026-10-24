import { prisma } from '@/lib/prisma'
import GalleryBrowser, { type GalleryEvent } from '@/components/GalleryBrowser'
import { GalleryFooter, GalleryHeader } from '@/components/GalleryChrome'
import HeroVideo from '@/components/HeroVideo'

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
    },
    orderBy: { date: 'desc' },
  })

  const galleryEvents: GalleryEvent[] = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
  }))

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1016] text-[#f5f5f5]">
      <div className="grain" />
      <GalleryHeader />

      <main className="flex-1">
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden text-center">
          <HeroVideo src="/header_video.mp4" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b1016]/60 via-[#0b1016]/40 to-[#0b1016]" />

          <div className="container relative z-20">
            <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-light uppercase leading-[0.9] tracking-[0.01em]">
              Galéria
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Rendezvények, emberek és pillanatok.
            </p>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <GalleryBrowser events={galleryEvents} />
        </section>
      </main>

      <GalleryFooter />
    </div>
  )
}
