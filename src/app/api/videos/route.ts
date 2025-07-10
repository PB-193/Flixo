import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { extractYouTubeId } from '@/lib/utils'

// GET /api/videos - 全動画を取得
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

// POST /api/videos - 新しい動画を追加
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, url, category, description } = body

    // 必須フィールドのバリデーション
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      )
    }

    // YouTube URLのバリデーション
    const videoId = extractYouTubeId(url)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    // サムネイルURLを生成
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    // データベースに保存
    const video = await prisma.video.create({
      data: {
        title,
        url,
        thumbnailUrl,
        category,
        description,
        views: Math.floor(Math.random() * 10000000), // ランダムな視聴回数
      }
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}