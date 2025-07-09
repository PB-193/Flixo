'use client'

import { useState, useEffect } from 'react'
import { Video } from '@/types/video'
import { extractYouTubeId } from '@/lib/utils'

interface VideoPreviewProps {
  video: Video
  isVisible: boolean
}

export default function VideoPreview({ video, isVisible }: VideoPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)
  const videoId = extractYouTubeId(video.url)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isVisible) {
      timeout = setTimeout(() => {
        setShowPreview(true)
      }, 1000)
    } else {
      setShowPreview(false)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isVisible])

  if (!showPreview || !videoId) return null

  return (
    <div
      className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    >
      <div className="relative w-4/5 h-4/5 max-w-md">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          className="w-full h-full rounded-lg border-2 border-white/20"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute -bottom-8 left-0 right-0 text-white text-center">
          <p className="text-sm font-medium truncate">{video.title}</p>
        </div>
      </div>
    </div>
  )
}