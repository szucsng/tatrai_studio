'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatEventDate } from '@/lib/format'
import { isVideoFile } from '@/lib/media'

function withVersion(url: string | null | undefined, version: string): string {
  if (!url) return ''
  return `${url}${url.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`
}

export type GalleryEvent = {
  id: string
  name: string
  description: string | null
  date: string
  images: {
    id: string
    filename: string
    path: string
    thumbPath: string | null
    mediumPath: string | null
  }[]
}

export default function GalleryBrowser({ events }: { events: GalleryEvent[] }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredEvents = useMemo(() => {
    if (!normalizedQuery) return events

    return events.filter((event) => {
      const haystack = `${event.name} ${event.description ?? ''}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [events, normalizedQuery])

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-light tracking-tight md:text-3xl">Rendezvények</h2>
          <p className="mt-1 text-sm text-white/50">{events.length} esemény</p>
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Keresés esemény neve vagy leírása szerint</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Keresés"
            className="h-11 w-full border-b border-white/15 bg-transparent pr-10 text-sm text-white placeholder:text-white/50 focus:border-[#E0A458] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Keresés törlése"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-[#E0A458] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </label>
      </div>

      {events.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-light text-white/80">Még nincs feltöltött esemény</p>
          <p className="mt-2 text-sm text-white/50">Az első galéria hamarosan érkezik.</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-light text-white/80">Nincs találat</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 text-sm text-[#E0A458] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
          >
            Keresés törlése
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: GalleryEvent }) {
  const photos = event.images.filter((image) => !isVideoFile(image.filename))
  const videos = event.images.filter((image) => isVideoFile(image.filename))
  const preview = photos[0] ?? event.images[0]
  const previewIsVideo = preview ? isVideoFile(preview.filename) : false
  const previewSrc = preview?.thumbPath || preview?.mediumPath || (!previewIsVideo ? preview?.path : null)

  return (
    <Link
      href={`/galeria/${event.id}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1016]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        {previewSrc ? (
          <img
            src={withVersion(previewSrc, preview?.id ?? event.id)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.14em] text-white/45">
            {previewIsVideo ? 'Videó' : 'Nincs kép'}
          </div>
        )}
      </div>

      <h3 className="mt-3 text-base font-normal leading-snug text-white/90 transition-colors group-hover:text-white md:text-lg">
        {event.name}
      </h3>
      <p className="mt-1 text-xs text-white/50">
        {formatEventDate(event.date)} · {photos.length} fotó
        {videos.length > 0 ? ` · ${videos.length} videó` : ''}
      </p>
    </Link>
  )
}
