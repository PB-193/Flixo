import { Video } from '@/types/video'
import { fetchVideos, createVideo } from './api'

// フォールバック用のローカルデータ（開発環境のみ）
const fallbackVideos: Video[] = process.env.NODE_ENV === 'production' ? [] : [
  {
    id: '1',
    title: 'Rick Astley - Never Gonna Give You Up',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    category: 'Music',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    description: 'クラシックなミュージックビデオです',
    views: 1000000000,
    duration: '3:32'
  },
  {
    id: '2',
    title: 'Big Buck Bunny',
    url: 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
    thumbnailUrl: 'https://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg',
    category: 'Entertainment',
    createdAt: new Date('2024-01-02T00:00:00.000Z'),
    description: 'オープンソースの短編アニメーション',
    views: 25000000,
    duration: '9:56'
  },
  {
    id: '3',
    title: 'Blender Animation Studio',
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    thumbnailUrl: 'https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
    category: 'Technology',
    createdAt: new Date('2024-01-03T00:00:00.000Z'),
    description: 'Blenderで作られた美しいアニメーション作品',
    views: 15000000,
    duration: '4:15'
  }
]

// API経由で動画を取得（フォールバック付き）
export const getVideos = async (): Promise<Video[]> => {
  try {
    // データベース接続が可能な場合はAPIから取得
    const videos = await fetchVideos()
    if (videos && videos.length > 0) {
      return videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  } catch (error) {
    console.error('Failed to fetch from API, using fallback data:', error)
  }
  
  // APIが利用できない場合はフォールバックデータを使用
  return fallbackVideos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

// API経由で動画を追加
export const addVideo = async (video: Omit<Video, 'id' | 'createdAt'>): Promise<Video> => {
  try {
    const newVideo = await createVideo(video)
    if (newVideo) {
      return newVideo
    }
  } catch (error) {
    console.error('Failed to create video via API:', error)
    throw error
  }
  
  // フォールバック: メモリ内データに追加（開発環境のみ）
  const newVideo: Video = {
    ...video,
    id: Date.now().toString(),
    createdAt: new Date()
  }
  fallbackVideos.push(newVideo)
  return newVideo
}

// レガシー関数（互換性のため）
export const getVideoById = (id: string): Video | undefined => {
  return fallbackVideos.find(video => video.id === id)
}

export const deleteVideo = (id: string): boolean => {
  const index = fallbackVideos.findIndex(video => video.id === id)
  if (index !== -1) {
    fallbackVideos.splice(index, 1)
    return true
  }
  return false
}