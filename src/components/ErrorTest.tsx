'use client'

import { useState } from 'react'
import SafeImage from './SafeImage'
import { Button } from './ui/button'

// 開発時のテスト用コンポーネント
export default function ErrorTest() {
  const [testCases] = useState([
    { id: 'valid', videoId: 'dQw4w9WgXcQ', title: 'Valid Video ID' },
    { id: 'invalid', videoId: 'INVALID_ID_TEST', title: 'Invalid Video ID' },
    { id: 'empty', videoId: '', title: 'Empty Video ID' },
    { id: 'null', videoId: null as any, title: 'Null Video ID' },
  ])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Image Error Handling Test</h2>
      <div className="grid grid-cols-2 gap-4">
        {testCases.map((testCase) => (
          <div key={testCase.id} className="border rounded p-4">
            <h3 className="font-semibold mb-2">{testCase.title}</h3>
            <p className="text-sm text-gray-600 mb-2">ID: {testCase.videoId || 'null'}</p>
            <div className="w-full h-32">
              <SafeImage
                videoId={testCase.videoId}
                title={testCase.title}
                alt={testCase.title}
                width={200}
                height={120}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}