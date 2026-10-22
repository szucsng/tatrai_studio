'use client'

import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader } from '@/components/GalleryChrome'

type AuthShellProps = {
  title: string
  description?: string
  children: ReactNode
  maxWidth?: string
  align?: 'center' | 'start'
}

export default function AuthShell({
  title,
  description,
  children,
  maxWidth = 'max-w-md',
  align = 'center',
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b1016] text-[#f5f5f5]">
      <div className="grain" />
      <SiteHeader />

      <main
        className={`flex flex-1 justify-center px-4 pb-16 pt-32 ${
          align === 'start' ? 'items-start' : 'items-center'
        }`}
      >
        <div className={`w-full ${maxWidth}`}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458]">Admin</p>
          <h1 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">{title}</h1>
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-white/55">{description}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
