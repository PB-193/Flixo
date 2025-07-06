'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getYouTubeThumbnailWithFallback } from '@/lib/utils'

interface SafeImageProps {
  videoId: string
  title: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
}

export default function SafeImage({ 
  videoId, 
  title, 
  alt, 
  width, 
  height, 
  className,
  sizes 
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState('')
  const [fallbackIndex, setFallbackIndex] = useState(-1)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!videoId || videoId.trim() === '') {
      setIsError(true)
      return
    }
    
    const { primary } = getYouTubeThumbnailWithFallback(videoId)
    setCurrentSrc(primary)
    setFallbackIndex(-1)
    setIsError(false)
  }, [videoId])

  const handleError = () => {
    const { fallbacks } = getYouTubeThumbnailWithFallback(videoId)
    
    if (fallbackIndex + 1 < fallbacks.length) {
      const nextIndex = fallbackIndex + 1
      setFallbackIndex(nextIndex)
      setCurrentSrc(fallbacks[nextIndex])
      setIsError(false)
    } else {
      // すべてのフォールバックが失敗した場合、プレースホルダーを表示
      setIsError(true)
    }
  }

  if (isError || !currentSrc || currentSrc.trim() === '') {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative`}
        style={{ width, height }}
      >
        {/* プレイボタン */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full ml-1" />
          </div>
        </div>
        
        {/* タイトル */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-medium truncate drop-shadow-lg">
            {title}
          </p>
        </div>
        
        {/* YouTubeアイコン */}
        <div className="absolute top-4 right-4">
          <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            YouTube
          </div>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      onError={handleError}
      priority={false}
    />
  )
}