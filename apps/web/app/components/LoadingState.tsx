'use client'

import { LoadingSpinner } from '@ecosmart/ui'
import { Card, CardContent } from '@ecosmart/ui'

interface LoadingStateProps {
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function LoadingState({ 
  title = 'Loading...', 
  description = 'Please wait while we load your data',
  size = 'lg',
  fullScreen = false
}: LoadingStateProps) {
  const content = (
    <div className="text-center">
      <LoadingSpinner size={size} className="mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            {content}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  )
}
