'use client'

import { useEffect, useRef } from 'react'

type HeroVideoProps = {
  src: string
  className?: string
}

export default function HeroVideo({ src, className = 'hero-video' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.muted = true
      video.defaultMuted = true
      video.loop = true
      video.playsInline = true

      const promise = video.play()
      if (promise) promise.catch(() => {})
    }

    const handlePause = () => {
      if (document.visibilityState === 'visible' && video.isConnected && !video.ended) {
        play()
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') play()
    }

    const handlePageShow = () => play()

    video.addEventListener('pause', handlePause)
    video.addEventListener('canplay', play)
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('pageshow', handlePageShow)
    play()

    return () => {
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('canplay', play)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
