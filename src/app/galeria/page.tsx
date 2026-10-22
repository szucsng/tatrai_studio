import { prisma } from '@/lib/prisma'
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
    },
    orderBy: { date: 'desc' },
  })

  const latestPhoto = events
    .flatMap((event) => event.images)
    .find((image) => !isVideoFile(image.filename))

  const heroImage = latestPhoto?.mediumPath || latestPhoto?.path || '/indexkep2.jpg'

  const galleryEvents: GalleryEvent[] = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-[#0b1016] text-[#f5f5f5]">
      <div className="grain" />
      <GalleryHeader />

      <main>
        <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-12 pt-32">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1016]/70 via-[#0b1016]/55 to-[#0b1016]" />

          <div className="container relative">
            <h1 className="text-[clamp(3.5rem,11vw,8rem)] font-light uppercase leading-[0.9] tracking-[0.01em]">
              Galéria
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
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
