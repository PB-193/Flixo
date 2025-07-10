'use client'

import { Video } from '@/types/video'
import VideoCard from './VideoCard'
import EmptyState from './EmptyState'

interface VideoGridProps {
  videos: Video[]
  onAddVideo: () => void
}

export default function VideoGrid({ videos, onAddVideo }: VideoGridProps) {
  if (videos.length === 0) {
    return <EmptyState onAddVideo={onAddVideo} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {videos.map((video, index) => (
        <div 
          key={video.id} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  )
}