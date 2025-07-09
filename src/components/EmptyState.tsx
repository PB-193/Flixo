import { Plus, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onAddVideo: () => void
}

export default function EmptyState({ onAddVideo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        まだ動画がありません
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        最初の動画を投稿して、あなたのコレクションを始めましょう！
      </p>
      
      <Button 
        onClick={onAddVideo}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <Plus className="mr-2 h-5 w-5" />
        動画を投稿
      </Button>
    </div>
  )
}