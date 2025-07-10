import { Video } from '@/types/video'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || '' 
  : typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'

// 全動画を取得
export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos`, {
      cache: 'no-store' // 常に最新データを取得
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

// 新しい動画を作成
export async function createVideo(videoData: {
  title: string
  url: string
  category?: string
  description?: string
}): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create video')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating video:', error)
    throw error
  }
}

// 動画を更新
export async function updateVideo(
  id: string, 
  videoData: {
    title?: string
    category?: string
    description?: string
  }
): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update video')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating video:', error)
    throw error
  }
}

// 動画を削除
export async function deleteVideo(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete video')
    }
    
    return true
  } catch (error) {
    console.error('Error deleting video:', error)
    return false
  }
}

// 特定の動画を取得
export async function fetchVideo(id: string): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch video')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  }
}