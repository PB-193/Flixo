'use client'

import { Video } from '@/types/video'
import VideoCard from './VideoCard'

interface VideoGridProps {
  videos: Video[]
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="text-white text-4xl">🎬</div>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-xl font-semibold mb-2">
          まだ動画がありません
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto leading-relaxed">
          最初の動画を投稿して、あなたのコレクションを始めましょう！
        </p>
      </div>
    )
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