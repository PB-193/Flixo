import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYouTubeId(url: string): string | null {
  // 空文字列やnull/undefinedのチェック
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null
  }

  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    try {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    } catch (error) {
      console.warn('Error matching YouTube URL pattern:', error)
      continue
    }
  }

  return null
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export function getYouTubeThumbnailWithFallback(videoId: string): {
  primary: string
  fallbacks: string[]
} {
  return {
    primary: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    fallbacks: [
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`,
    ]
  }
}

export function createPlaceholderImage(title: string): string {
  // プレースホルダー画像のData URLを生成
  const canvas = document.createElement('canvas')
  canvas.width = 480
  canvas.height = 270
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // グラデーション背景
    const gradient = ctx.createLinearGradient(0, 0, 480, 270)
    gradient.addColorStop(0, '#3B82F6')
    gradient.addColorStop(1, '#8B5CF6')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 480, 270)
    
    // YouTube風のプレイボタン
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.beginPath()
    ctx.arc(240, 135, 30, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#1F2937'
    ctx.beginPath()
    ctx.moveTo(230, 120)
    ctx.lineTo(230, 150)
    ctx.lineTo(255, 135)
    ctx.closePath()
    ctx.fill()
    
    // タイトルテキスト
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.font = '16px Inter, sans-serif'
    ctx.textAlign = 'center'
    const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title
    ctx.fillText(truncatedTitle, 240, 200)
  }
  
  return canvas.toDataURL('image/png')
}