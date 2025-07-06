'use client'

import { Video } from '@/types/video'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import VideoPreview from './VideoPreview'
import SafeImage from './SafeImage'
import { useState, useRef } from 'react'
import { extractYouTubeId } from '@/lib/utils'

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // YouTube IDを安全に取得
  const videoId = extractYouTubeId(video.url) || ''

  const handleClick = () => {
    window.open(video.url, '_blank')
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true)
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovered) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setMousePosition({ x: touch.clientX, y: touch.clientY })
    
    const timer = setTimeout(() => {
      setIsHovered(true)
    }, 800)
    
    setLongPressTimer(timer)
  }

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    setIsHovered(false)
  }

  const handleTouchMove = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  return (
    <>
      <Card 
        ref={cardRef}
        className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:bg-white/90 dark:bg-slate-800/80 dark:hover:bg-slate-800/90 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
      >
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <SafeImage
              videoId={videoId}
              title={video.title}
              alt={video.title}
              width={480}
              height={270}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {video.duration && (
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                {video.duration}
              </div>
            )}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full ml-0.5" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <CardTitle className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
            {video.title}
          </CardTitle>
          <div className="flex items-center justify-between text-sm mb-3">
            {video.category && (
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {video.category}
              </span>
            )}
            {video.views && (
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {video.views.toLocaleString()} views
              </span>
            )}
          </div>
          {video.description && (
            <CardDescription className="line-clamp-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              {video.description}
            </CardDescription>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {new Date(video.createdAt).toLocaleDateString('ja-JP')}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <VideoPreview
        video={video}
        isVisible={isHovered}
        position={mousePosition}
      />
    </>
  )
}