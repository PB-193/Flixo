'use client'

import { useState } from 'react'
import { getVideos } from '@/lib/data'
import VideoGrid from '@/components/VideoGrid'
import VideoPostForm from '@/components/VideoPostForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Home() {
  const [videos, setVideos] = useState(getVideos())
  const [showPostForm, setShowPostForm] = useState(false)

  const handleVideoAdded = () => {
    setVideos(getVideos())
    setShowPostForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Flixo
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            🎬 動画を美しくシェアする、次世代プラットフォーム
          </p>
          <Button 
            className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
            onClick={() => setShowPostForm(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            動画を投稿
          </Button>
        </header>
        
        <main>
          {showPostForm ? (
            <VideoPostForm 
              onVideoAdded={handleVideoAdded}
              onCancel={() => setShowPostForm(false)}
            />
          ) : (
            <VideoGrid videos={videos} />
          )}
        </main>
      </div>
    </div>
  )
}