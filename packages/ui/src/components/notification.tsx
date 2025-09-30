'use client'

import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read?: boolean
  actions?: {
    label: string
    onClick: () => void
  }[]
}

interface NotificationItemProps {
  notification: Notification
  onClose: (id: string) => void
  onAction?: (notification: Notification, action: string) => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClose,
  onAction
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-green-500'
      case 'error':
        return 'border-l-red-500'
      case 'warning':
        return 'border-l-yellow-500'
      case 'info':
        return 'border-l-blue-500'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg border-l-4 p-4 mb-3 transition-all duration-300 transform",
        getBorderColor(),
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              {notification.title}
            </h4>
            <button
              onClick={() => onClose(notification.id)}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {notification.message}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {notification.timestamp.toLocaleTimeString()}
            </span>
            {notification.actions && (
              <div className="flex gap-2">
                {notification.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onAction?.(notification, action.label)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NotificationCenterProps {
  notifications: Notification[]
  onClose: (id: string) => void
  onAction?: (notification: Notification, action: string) => void
  onMarkAllRead?: () => void
  onClearAll?: () => void
  className?: string
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onClose,
  onAction,
  onMarkAllRead,
  onClearAll,
  className
}) => {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={cn("bg-white rounded-lg shadow-lg", className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
          <div className="flex gap-2">
            {onMarkAllRead && (
              <Button variant="outline" size="sm" onClick={onMarkAllRead}>
                Mark All Read
              </Button>
            )}
            {onClearAll && (
              <Button variant="outline" size="sm" onClick={onClearAll}>
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Info className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="p-4">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={onClose}
                onAction={onAction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ToastProps {
  notification: Notification
  onClose: (id: string) => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({
  notification,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id)
    }, duration)

    return () => clearTimeout(timer)
  }, [notification.id, onClose, duration])

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <NotificationItem
        notification={notification}
        onClose={onClose}
      />
    </div>
  )
}

export default NotificationCenter
