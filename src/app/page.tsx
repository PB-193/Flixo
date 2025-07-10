'use client'

import { useState, useEffect } from 'react'
import { getVideos } from '@/lib/data'
import { Video } from '@/types/video'
import VideoGrid from '@/components/VideoGrid'
import VideoPostForm from '@/components/VideoPostForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [showPostForm, setShowPostForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadVideos = async () => {
    setLoading(true)
    try {
      const videosData = await getVideos()
      setVideos(videosData)
    } catch (error) {
      console.error('Failed to load videos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  const handleVideoAdded = () => {
    loadVideos()
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
          ) : loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">動画を読み込み中...</p>
              </div>
            </div>
          ) : (
            <VideoGrid videos={videos} onAddVideo={() => setShowPostForm(true)} />
          )}
        </main>
      </div>
    </div>
  )
}