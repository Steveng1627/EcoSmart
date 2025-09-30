'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Map } from '@ecosmart/ui'
import { NotificationCenter } from '@ecosmart/ui'
import { LineChart, PieChart, MetricCard } from '@ecosmart/ui'
import { PageLayout } from '../components/PageLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { LoadingState } from '../components/LoadingState'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Battery
} from 'lucide-react'

interface DashboardData {
  orders: {
    total: number
    today: number
    pending: number
    completed: number
  }
  fleet: {
    total: number
    active: number
    charging: number
    maintenance: number
  }
  performance: {
    avgDeliveryTime: number
    successRate: number
    carbonSaved: number
  }
}

interface ChartData {
  label: string
  value: number
  color?: string
}

function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        orders: {
          total: 1250,
          today: 45,
          pending: 12,
          completed: 33
        },
        fleet: {
          total: 150,
          active: 120,
          charging: 20,
          maintenance: 10
        },
        performance: {
          avgDeliveryTime: 28,
          successRate: 95.2,
          carbonSaved: 2.4
        }
      })
      setLoading(false)
    }, 1000)
  }, [])

  const orderTrendData: ChartData[] = [
    { label: 'Mon', value: 22, color: '#3b82f6' },
    { label: 'Tue', value: 28, color: '#3b82f6' },
    { label: 'Wed', value: 24, color: '#3b82f6' },
    { label: 'Thu', value: 31, color: '#3b82f6' },
    { label: 'Fri', value: 27, color: '#3b82f6' },
    { label: 'Sat', value: 18, color: '#3b82f6' },
    { label: 'Sun', value: 6, color: '#3b82f6' }
  ]

  const deliveryModeData: ChartData[] = [
    { label: 'Bike', value: 65, color: '#10b981' },
    { label: 'Drone', value: 25, color: '#8b5cf6' },
    { label: 'Hybrid', value: 10, color: '#f59e0b' }
  ]

  const satisfactionData: ChartData[] = [
    { label: '5 Stars', value: 85, color: '#10b981' },
    { label: '4 Stars', value: 12, color: '#84cc16' },
    { label: '3 Stars', value: 2, color: '#f59e0b' },
    { label: '2 Stars', value: 1, color: '#f97316' },
    { label: '1 Star', value: 0, color: '#ef4444' }
  ]

  if (loading) {
    return (
      <LoadingState 
        title="Loading Dashboard" 
        description="Please wait while we fetch your analytics data"
        fullScreen 
      />
    )
  }

  return (
    <PageLayout 
      title="Dashboard" 
      description="System overview and analytics"
      requiredRole="admin"
    >
      <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value={data?.orders.total || 0}
          change={{ value: 12, type: 'increase' }}
          icon={<Package className="h-8 w-8" />}
        />
        <MetricCard
          title="Active Fleet"
          value={data?.fleet.active || 0}
          change={{ value: 3, type: 'increase' }}
          icon={<Truck className="h-8 w-8" />}
        />
        <MetricCard
          title="Success Rate"
          value={`${data?.performance.successRate || 0}%`}
          change={{ value: 2, type: 'increase' }}
          icon={<TrendingUp className="h-8 w-8" />}
        />
        <MetricCard
          title="CO2 Saved (kg)"
          value={data?.performance.carbonSaved || 0}
          change={{ value: 15, type: 'increase' }}
          icon={<Battery className="h-8 w-8" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Daily order volume over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={orderTrendData} height={200} />
          </CardContent>
        </Card>

        {/* Delivery Modes */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Mode Distribution</CardTitle>
            <CardDescription>Orders by delivery method</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={deliveryModeData} size={200} />
          </CardContent>
        </Card>
      </div>

      {/* Customer Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Satisfaction</CardTitle>
          <CardDescription>Rating distribution from customer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <PieChart data={satisfactionData} size={200} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">5 Stars</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">4 Stars</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-lime-500 h-2 rounded-full" style={{ width: '12%' }} />
                  </div>
                  <span className="text-sm text-gray-600">12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">3 Stars</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '2%' }} />
                  </div>
                  <span className="text-sm text-gray-600">2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">2 Stars</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '1%' }} />
                  </div>
                  <span className="text-sm text-gray-600">1%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">1 Star</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Map */}
      <Card>
        <CardHeader>
          <CardTitle>Live Operations Map</CardTitle>
          <CardDescription>Real-time fleet and order tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <Map
            markers={[
              {
                id: 'asset-1',
                lat: 1.3521,
                lng: 103.8198,
                title: 'Bike-001',
                type: 'asset',
                status: 'ACTIVE',
                battery: 85
              },
              {
                id: 'asset-2',
                lat: 1.3550,
                lng: 103.8250,
                title: 'Drone-001',
                type: 'asset',
                status: 'CHARGING',
                battery: 45
              },
              {
                id: 'order-1',
                lat: 1.3500,
                lng: 103.8200,
                title: 'Order-123',
                type: 'pickup',
                status: 'CREATED'
              }
            ]}
            height="400px"
            onMarkerClick={(marker) => {
              alert(`Clicked on ${marker.title} (${marker.type})`)
            }}
          />
        </CardContent>
      </Card>

      {/* Notifications */}
      {showNotifications && (
        <div className="fixed top-20 right-4 z-50 w-96">
          <NotificationCenter
            notifications={notifications}
            onClose={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
            onMarkAllRead={() => setNotifications([])}
            onClearAll={() => setNotifications([])}
          />
        </div>
      )}
      </div>
    </PageLayout>
  )
}

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <ProtectedRoute requiredRole="admin">
        <DashboardContent />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}