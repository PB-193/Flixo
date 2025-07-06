'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addVideo } from '@/lib/data'
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/utils'
import { ArrowLeft, Video } from 'lucide-react'

interface VideoPostFormProps {
  onVideoAdded: () => void
  onCancel: () => void
}

export default function VideoPostForm({ onVideoAdded, onCancel }: VideoPostFormProps) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const videoId = extractYouTubeId(url)
      if (!videoId) {
        alert('有効なYouTubeのURLを入力してください')
        return
      }

      const thumbnailUrl = getYouTubeThumbnail(videoId)
      
      addVideo({
        title: title || 'Untitled Video',
        url,
        thumbnailUrl,
        category: category || undefined,
        description: description || undefined,
        views: 0
      })

      onVideoAdded()
    } catch (error) {
      console.error('Error adding video:', error)
      alert('動画の投稿に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onCancel}
          className="mb-4 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          一覧に戻る
        </Button>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            動画を投稿
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            YouTubeの動画URLを入力して、あなたのコレクションに追加しましょう
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-semibold mb-2 text-slate-700">
                YouTube URL *
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2 text-slate-700">
                タイトル *
              </label>
              <Input
                id="title"
                placeholder="動画のタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2 text-slate-700">
                カテゴリー
              </label>
              <Input
                id="category"
                placeholder="Music, Gaming, Education..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-2 text-slate-700">
                説明
              </label>
              <Input
                id="description"
                placeholder="動画の説明..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1 h-12 text-base"
              >
                キャンセル
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? '投稿中...' : '投稿する'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}