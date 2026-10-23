'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Video from 'yet-another-react-lightbox/plugins/video'
import { GalleryFooter, GalleryHeader } from '@/components/GalleryChrome'
import { formatEventDate } from '@/lib/format'
import { isVideoFile } from '@/lib/media'

interface Image {
  id: string
  filename: string
  path: string
  thumbPath?: string | null
  mediumPath?: string | null
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
  const searchParams = useSearchParams()
  const imageParam = searchParams.get('image')

  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCopyToast, setShowCopyToast] = useState(false)

  useEffect(() => {
    let cancelled = false

    setError(null)

    fetch(`/api/events/${id}`, { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Nem sikerült betölteni az eseményt.')
        }
        return response.json()
      })
      .then((data: Event) => {
        if (cancelled) return

        setEvent(data)

        if (imageParam && data.images) {
          const index = data.images.findIndex((image) => image.id === imageParam)
          if (index !== -1) {
            setCurrentImageIndex(index)
            setLightboxOpen(true)
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('A galéria betöltése nem sikerült.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [id, imageParam, reloadKey])

  const handleDownload = async (imagePath: string, filename: string) => {
    try {
      const response = await fetch(imagePath)
      const blob = await response.blob()

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
    } catch (downloadError) {
      console.error('Hiba a fájl letöltése során:', downloadError)
    }
  }

  const handleShare = async (imageId: string) => {
    const shareUrl = `${window.location.origin}/galeria/${id}?image=${imageId}`

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setShowCopyToast(true)
        setTimeout(() => setShowCopyToast(false), 3000)
      } else {
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
        } catch {
          alert('Link másolása nem támogatott: ' + shareUrl)
        }

        document.body.removeChild(textArea)
      }
    } catch (shareError) {
      console.error('Nem sikerült a link másolása:', shareError)
      alert('Nem sikerült a link másolása')
    }
  }

  const photos = event?.images.filter((image) => !isVideoFile(image.filename)) ?? []
  const videos = event?.images.filter((image) => isVideoFile(image.filename)) ?? []
  const organizers =
    event?.organizers?.map((organizer) => organizer.user.name).join(', ') ?? ''

  const slides =
    event?.images.map((image) => {
      if (isVideoFile(image.filename)) {
        return {
          type: 'video' as const,
          sources: [{ src: image.path, type: 'video/mp4' }],
          width: 1920,
          height: 1080,
        }
      }

      return {
        src: image.path,
        srcSet: image.mediumPath
          ? [
              { src: image.thumbPath || image.path, width: 300, height: 300 },
              { src: image.mediumPath, width: 800, height: 800 },
              { src: image.path, width: 3840, height: 2160 },
            ]
          : undefined,
        alt: image.filename,
        width: 3840,
        height: 2160,
      }
    }) ?? []

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1016] text-[#f5f5f5]">
      <div className="grain" />
      <GalleryHeader />

      <main className="flex-1 pt-28">
        {!event && !error && (
          <div className="container py-16" role="status" aria-live="polite">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
              Galéria betöltése...
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="aspect-square animate-pulse bg-white/[0.04]" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="container py-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">Hiba</p>
            <h1 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">
              A galéria nem tölthető be
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
              {error}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setReloadKey((value) => value + 1)}
                className="btn btn-primary"
              >
                Újrapróbálás
              </button>
              <Link href="/galeria" className="btn btn-ghost">
                Vissza a galériához
              </Link>
            </div>
          </div>
        )}

        {event && (
          <>
            <section className="container pb-8 pt-4 md:pt-8">
              <Link
                href="/galeria"
                className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#E0A458] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Vissza a galériához
              </Link>

              <h1 className="mt-8 text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight">
                {event.name}
              </h1>

              <p className="mt-3 text-sm text-white/50">
                {formatEventDate(event.date)} · {photos.length} fotó
                {videos.length > 0 ? ` · ${videos.length} videó` : ''}
                {organizers ? ` · ${organizers}` : ''}
              </p>

              {event.description && (
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                  {event.description}
                </p>
              )}
            </section>

            <section className="container pb-16 md:pb-24">
              {event.images.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg font-light text-white/85">
                    Ebben az eseményben még nincs média
                  </p>
                  <Link
                    href="/galeria"
                    className="mt-4 inline-block text-sm text-[#E0A458] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
                  >
                    Vissza a galériához
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
                  {event.images.map((image, index) => {
                    const video = isVideoFile(image.filename)

                    return (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => {
                          setCurrentImageIndex(index)
                          setLightboxOpen(true)
                        }}
                        aria-label={`${video ? 'Videó' : 'Kép'} megnyitása: ${image.filename}`}
                        className="group relative block aspect-square w-full overflow-hidden bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
                      >
                        {video ? (
                          <div className="flex h-full w-full items-center justify-center text-white/55">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                              <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </div>
                        ) : (
                          <img
                            src={image.thumbPath || image.mediumPath || image.path}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        )}
                        <span
                          className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
                          aria-hidden="true"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </section>

            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={slides}
              index={currentImageIndex}
              plugins={[Zoom, Video]}
              on={{ view: ({ index }) => setCurrentImageIndex(index) }}
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
              toolbar={{
                buttons: [
                  <button
                    key="share"
                    type="button"
                    aria-label="Megosztás"
                    className="yarl__button"
                    onClick={() => {
                      const imageId = event.images[currentImageIndex]?.id
                      if (imageId) {
                        handleShare(imageId)
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="yarl__icon"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </button>,
                  <button
                    key="download"
                    type="button"
                    aria-label="Letöltés"
                    className="yarl__button"
                    onClick={() => {
                      const image = event.images[currentImageIndex]
                      if (image) {
                        handleDownload(image.path, image.filename)
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="yarl__icon"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>,
                  'close',
                ],
              }}
            />
          </>
        )}
      </main>

      <GalleryFooter />

      {showCopyToast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-slide-up border border-[#E0A458]/40 bg-[#0b1016] px-4 py-3 text-sm text-[#E0A458] shadow-xl"
        >
          Link a vágólapra másolva.
        </div>
      )}
    </div>
  )
}
