'use client'

import { useState, useEffect } from 'react'
import { Video } from '@/types/video'
import { extractYouTubeId } from '@/lib/utils'

interface VideoPreviewProps {
  video: Video
  isVisible: boolean
  position: { x: number; y: number }
}

export default function VideoPreview({ video, isVisible, position }: VideoPreviewProps) {
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
      className="fixed z-50 w-80 h-48 bg-background border border-border rounded-lg shadow-lg pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="relative w-full h-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-lg">
          <p className="text-sm font-medium truncate">{video.title}</p>
          <p className="text-xs text-gray-300 truncate">{video.category}</p>
        </div>
      </div>
    </div>
  )
}