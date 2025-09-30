'use client'

import { useAuth } from './AuthProvider'
import { Navigation } from './Navigation'
import { canAccessPage } from '../lib/permissions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  requiredRole?: string
  requiredPermission?: string
  showNavigation?: boolean
}

export function PageLayout({
  children,
  title,
  description,
  requiredRole,
  requiredPermission,
  showNavigation = true
}: PageLayoutProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // Check role-based access
      if (requiredRole && user.role !== requiredRole) {
        router.push('/unauthorized')
        return
      }

      // Check permission-based access
      if (requiredPermission && !canAccessPage(user.role, window.location.pathname)) {
        router.push('/unauthorized')
        return
      }
    }
  }, [user, isLoading, requiredRole, requiredPermission, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Navigation />}
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
