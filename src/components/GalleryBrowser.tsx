'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatEventDate } from '@/lib/format'
import { isVideoFile } from '@/lib/media'

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
  organizers: { user: { id: string; name: string } }[]
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
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">Archívum</p>
          <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Rendezvények</h2>
          <p className="mt-2 text-sm text-white/55">
            {events.length} esemény
          </p>
        </div>

        <label className="relative w-full sm:w-80">
          <span className="sr-only">Keresés esemény neve vagy leírása szerint</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Keresés..."
            className="h-11 w-full border border-white/10 bg-white/[0.03] pl-10 pr-12 text-sm text-white placeholder:text-white/50 focus:border-[#E0A458] focus:outline-none focus:ring-1 focus:ring-[#E0A458]"
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
        <div className="border border-white/10 px-6 py-20 text-center">
          <p className="text-lg font-light text-white/85">Még nincs feltöltött esemény</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/55">
            Az első galéria hamarosan érkezik. Addig is írhatsz, ha van egy esemény, amit meg kell örökíteni.
          </p>
          <Link
            href="/#faq"
            className="mt-7 inline-flex items-center justify-center border border-[#E0A458]/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E0A458] transition-colors hover:bg-[#E0A458]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="border border-white/10 px-6 py-16 text-center">
          <p className="text-lg font-light text-white/85">Nincs találat</p>
          <p className="mt-2 text-sm text-white/55">Próbálj másik kifejezést.</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#E0A458] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458]"
          >
            Keresés törlése
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  const organizers = event.organizers.map((organizer) => organizer.user.name).join(', ')

  return (
    <Link
      href={`/galeria/${event.id}`}
      className="group flex flex-col border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-[#E0A458]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A458] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1016]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        {previewSrc ? (
          <img
            src={previewSrc}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.16em] text-white/45">
            {previewIsVideo ? 'Videó' : 'Nincs kép'}
          </div>
        )}

        {videos.length > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-black/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            {videos.length} videó
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
          {formatEventDate(event.date)}
        </p>
        <h3 className="mt-2 text-xl font-normal leading-snug text-white/90 transition-colors group-hover:text-white">
          {event.name}
        </h3>
        {event.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
            {event.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-[11px] uppercase tracking-[0.12em] text-white/55">
          <span>{photos.length} fotó</span>
          {videos.length > 0 && <span>{videos.length} videó</span>}
          {organizers && (
            <span className="normal-case tracking-normal text-white/50">Szervező: {organizers}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
