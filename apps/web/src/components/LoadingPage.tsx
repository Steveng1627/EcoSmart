'use client'

import { LoadingSpinner } from '@ecosmart/ui'

interface LoadingPageProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingPage({ 
  message = "Loading...", 
  fullScreen = true 
}: LoadingPageProps) {
  const containerClass = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center p-8"

  return (
    <div className={containerClass}>
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
