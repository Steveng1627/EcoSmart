'use client'

import { useAuth } from './AuthProvider'
import { Button } from '@ecosmart/ui'
import Link from 'next/link'
import { 
  BarChart3, 
  Store, 
  Settings, 
  Truck, 
  Package, 
  AlertTriangle,
  LogOut,
  User
} from 'lucide-react'

export function Navigation() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  const getNavigationItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { href: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'System overview' },
          { href: '/merchant', label: 'Merchant Portal', icon: Store, description: 'Merchant management' },
          { href: '/ops', label: 'Operations', icon: Truck, description: 'Fleet & dispatch' },
          { href: '/tracking', label: 'Track Order', icon: Package, description: 'Order tracking' }
        ]
      case 'merchant_admin':
      case 'merchant_ops':
        return [
          { href: '/merchant', label: 'Orders', icon: Package, description: 'Order management' },
          { href: '/merchant/reports', label: 'Reports', icon: BarChart3, description: 'Analytics & insights' },
          { href: '/merchant/settings', label: 'Settings', icon: Settings, description: 'Account settings' }
        ]
      case 'ops':
        return [
          { href: '/ops', label: 'Dashboard', icon: BarChart3, description: 'Operations overview' },
          { href: '/ops/fleet', label: 'Fleet', icon: Truck, description: 'Fleet management' },
          { href: '/ops/orders', label: 'Orders', icon: Package, description: 'Order dispatch' },
          { href: '/ops/incidents', label: 'Incidents', icon: AlertTriangle, description: 'Incident management' }
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EcoSmart</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                title={item.description}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
              <span className="text-gray-400">({user.role})</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
