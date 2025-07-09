import { Video } from '@/types/video'

// 本番環境では空の配列からスタート
let videos: Video[] = process.env.NODE_ENV === 'production' ? [] : [
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
  },
  {
    id: '4',
    title: 'JavaScript Tutorial for Beginners',
    url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
    thumbnailUrl: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
    category: 'Education',
    createdAt: new Date('2024-01-04T00:00:00.000Z'),
    description: '初心者向けJavaScriptチュートリアル',
    views: 8500000,
    duration: '45:30'
  },
  {
    id: '5',
    title: 'Beautiful Nature Documentary',
    url: 'https://www.youtube.com/watch?v=hFZFjoX2cGg',
    thumbnailUrl: 'https://img.youtube.com/vi/hFZFjoX2cGg/maxresdefault.jpg',
    category: 'Documentary',
    createdAt: new Date('2024-01-05T00:00:00.000Z'),
    description: '息をのむような美しい自然のドキュメンタリー',
    views: 32000000,
    duration: '28:45'
  },
  {
    id: '6',
    title: 'Epic Gaming Montage 2024',
    url: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
    thumbnailUrl: 'https://img.youtube.com/vi/TcMBFSGVi1c/maxresdefault.jpg',
    category: 'Gaming',
    createdAt: new Date('2024-01-06T00:00:00.000Z'),
    description: '2024年最高のゲーミングモンタージュ',
    views: 12000000,
    duration: '8:22'
  },
  {
    id: '7',
    title: 'React Hooks Explained',
    url: 'https://www.youtube.com/watch?v=f687hBjwFcM',
    thumbnailUrl: 'https://img.youtube.com/vi/f687hBjwFcM/maxresdefault.jpg',
    category: 'Education',
    createdAt: new Date('2024-01-07T00:00:00.000Z'),
    description: 'React Hooksの基本から応用まで詳しく解説',
    views: 6700000,
    duration: '32:18'
  },
  {
    id: '8',
    title: 'Lo-Fi Hip Hop Beats',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    thumbnailUrl: 'https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    category: 'Music',
    createdAt: new Date('2024-01-08T00:00:00.000Z'),
    description: '勉強や作業に最適なチルなビート',
    views: 89000000,
    duration: '2:15:30'
  },
  {
    id: '9',
    title: 'Space Exploration Documentary',
    url: 'https://www.youtube.com/watch?v=LS-VPyLaJFM',
    thumbnailUrl: 'https://img.youtube.com/vi/LS-VPyLaJFM/maxresdefault.jpg',
    category: 'Science',
    createdAt: new Date('2024-01-09T00:00:00.000Z'),
    description: '宇宙探査の最前線を追ったドキュメンタリー',
    views: 18500000,
    duration: '52:08'
  },
  {
    id: '10',
    title: 'Cooking Masterclass: Italian Pasta',
    url: 'https://www.youtube.com/watch?v=UhsUsOZoMDk',
    thumbnailUrl: 'https://img.youtube.com/vi/UhsUsOZoMDk/maxresdefault.jpg',
    category: 'Cooking',
    createdAt: new Date('2024-01-10T00:00:00.000Z'),
    description: 'プロが教える本格イタリアンパスタの作り方',
    views: 4200000,
    duration: '18:45'
  },
  {
    id: '11',
    title: 'Modern Art Exhibition Tour',
    url: 'https://www.youtube.com/watch?v=9No-FiEInLA',
    thumbnailUrl: 'https://img.youtube.com/vi/9No-FiEInLA/maxresdefault.jpg',
    category: 'Art',
    createdAt: new Date('2024-01-11T00:00:00.000Z'),
    description: '世界最高峰の現代美術展をバーチャルツアー',
    views: 2800000,
    duration: '35:20'
  },
  {
    id: '12',
    title: 'Fitness Workout: Full Body',
    url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
    thumbnailUrl: 'https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg',
    category: 'Fitness',
    createdAt: new Date('2024-01-12T00:00:00.000Z'),
    description: '自宅でできる効果的な全身ワークアウト',
    views: 15600000,
    duration: '25:15'
  }
]

export const getVideos = (): Video[] => {
  return videos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const addVideo = (video: Omit<Video, 'id' | 'createdAt'>): Video => {
  const newVideo: Video = {
    ...video,
    id: Date.now().toString(),
    createdAt: new Date()
  }
  videos.push(newVideo)
  return newVideo
}

export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id)
}

export const deleteVideo = (id: string): boolean => {
  const index = videos.findIndex(video => video.id === id)
  if (index !== -1) {
    videos.splice(index, 1)
    return true
  }
  return false
}