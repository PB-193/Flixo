export interface Video {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  category?: string
  createdAt: Date
  description?: string
  views?: number
  duration?: string
}