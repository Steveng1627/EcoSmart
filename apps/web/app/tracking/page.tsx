'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { Map } from '@ecosmart/ui'
import { LoadingState } from '../components/LoadingState'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Navigation,
  Battery
} from 'lucide-react'

interface TrackingEvent {
  timestamp: string
  status: string
  message: string
  location?: string
  lat?: number
  lng?: number
}

interface OrderDetails {
  id: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  status: string
  mode: string
  eta?: string
  events: TrackingEvent[]
  pickup: {
    address: string
    contact: string
    lat: number
    lng: number
  }
  dropoff: {
    address: string
    contact: string
    lat: number
    lng: number
  }
  driver?: {
    name: string
    phone: string
    vehicle: string
    battery?: number
  }
}

function TrackingContent() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Mock order data with enhanced tracking
  const mockOrder: OrderDetails = {
    id: 'order-123',
    customer: {
      name: 'John Doe',
      phone: '+65 9123 4567',
      email: 'john@example.com'
    },
    status: 'IN_TRANSIT',
    mode: 'BIKE',
    eta: '15 minutes',
    driver: {
      name: 'Mike Chen',
      phone: '+65 9876 5432',
      vehicle: 'E-Bike #001',
      battery: 85
    },
    pickup: {
      address: '123 Orchard Road, Singapore 238863',
      contact: '+65 6123 4567',
      lat: 1.3048,
      lng: 103.8318
    },
    dropoff: {
      address: '456 Marina Bay Sands, Singapore 018956',
      contact: '+65 6123 4567',
      lat: 1.2839,
      lng: 103.8607
    },
    events: [
      {
        timestamp: '2024-01-15T14:30:00Z',
        status: 'PICKED_UP',
        message: 'Package picked up from sender',
        location: '123 Orchard Road',
        lat: 1.3048,
        lng: 103.8318
      },
      {
        timestamp: '2024-01-15T14:45:00Z',
        status: 'IN_TRANSIT',
        message: 'Package is on the way',
        location: 'Central Business District',
        lat: 1.2966,
        lng: 103.8480
      },
      {
        timestamp: '2024-01-15T15:00:00Z',
        status: 'IN_TRANSIT',
        message: 'Approaching destination',
        location: 'Marina Bay Area',
        lat: 1.2839,
        lng: 103.8607
      }
    ]
  }

  const handleTrack = async () => {
    if (!orderId.trim()) return

    setLoading(true)
    setNotFound(false)
    setOrder(null)

    // Simulate API call
    setTimeout(() => {
      if (orderId === 'order-123' || orderId === '123') {
        setOrder(mockOrder)
        setAutoRefresh(true)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PICKED_UP':
        return 'bg-blue-100 text-blue-800'
      case 'IN_TRANSIT':
        return 'bg-yellow-100 text-yellow-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PICKED_UP':
        return <Package className="h-4 w-4" />
      case 'IN_TRANSIT':
        return <Truck className="h-4 w-4" />
      case 'DELIVERED':
        return <Package className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Auto refresh for real-time updates
  useEffect(() => {
    if (!autoRefresh || !order) return

    const interval = setInterval(() => {
      // Simulate real-time updates
      setOrder(prev => {
        if (!prev) return null
        
        // Simulate driver movement
        const newEvents = [...prev.events]
        const lastEvent = newEvents[newEvents.length - 1]
        
        if (lastEvent && lastEvent.status === 'IN_TRANSIT') {
          // Simulate progress update
          const newEvent: TrackingEvent = {
            timestamp: new Date().toISOString(),
            status: 'IN_TRANSIT',
            message: 'Driver is making good progress',
            location: 'En route to destination',
            lat: lastEvent.lat ? lastEvent.lat + (Math.random() - 0.5) * 0.01 : 1.2839,
            lng: lastEvent.lng ? lastEvent.lng + (Math.random() - 0.5) * 0.01 : 103.8607
          }
          newEvents.push(newEvent)
        }

        return {
          ...prev,
          events: newEvents,
          driver: prev.driver ? {
            ...prev.driver,
            battery: Math.max(0, prev.driver.battery! - Math.random() * 2)
          } : prev.driver
        }
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, order])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
              <p className="text-gray-600">Real-time delivery tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Order ID</CardTitle>
            <CardDescription>
              Track your delivery in real-time with our advanced tracking system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter order ID (e.g., order-123)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={loading}>
                {loading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
            {notFound && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Order not found. Please check your order ID.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {loading && (
          <LoadingState 
            title="Tracking Order" 
            description="Please wait while we locate your package"
          />
        )}

        {order && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Order ID</label>
                    <p className="text-lg font-mono">{order.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Delivery Mode</label>
                    <p className="text-lg">{order.mode}</p>
                  </div>
                  {order.eta && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">ETA</label>
                      <p className="text-lg font-semibold text-green-600">{order.eta}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Driver Info */}
              {order.driver && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Driver Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Driver</label>
                      <p className="text-lg">{order.driver.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Vehicle</label>
                      <p className="text-lg">{order.driver.vehicle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact</label>
                      <p className="text-lg">{order.driver.phone}</p>
                    </div>
                    {order.driver.battery && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Battery Level</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Battery className="h-4 w-4" />
                          <span className="text-lg">{order.driver.battery.toFixed(0)}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-lg">{order.customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-lg flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {order.customer.phone}
                    </p>
                  </div>
                  {order.customer.email && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-lg flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {order.customer.email}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Map and Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Live Tracking Map
                  </CardTitle>
                  <CardDescription>
                    Real-time location of your package
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 rounded-lg overflow-hidden">
                    <Map
                      markers={[
                        {
                          id: 'pickup',
                          lat: order.pickup.lat,
                          lng: order.pickup.lng,
                          title: 'Pickup Location',
                          type: 'pickup',
                          status: 'COMPLETED'
                        },
                        {
                          id: 'dropoff',
                          lat: order.dropoff.lat,
                          lng: order.dropoff.lng,
                          title: 'Delivery Location',
                          type: 'dropoff',
                          status: 'PENDING'
                        },
                        ...order.events
                          .filter(event => event.lat && event.lng)
                          .map((event, index) => ({
                            id: `event-${index}`,
                            lat: event.lat!,
                            lng: event.lng!,
                            title: event.message,
                            type: 'order' as const,
                            status: event.status
                          }))
                      ]}
                      height="100%"
                      onMarkerClick={(marker) => {
                        console.log('Marker clicked:', marker)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    Tracking Timeline
                  </CardTitle>
                  <CardDescription>
                    Real-time updates of your package journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.events.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === order.events.length - 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {getStatusIcon(event.status)}
                          </div>
                          {index < order.events.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium">{event.message}</p>
                          {event.location && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TrackingPage() {
  return (
    <ErrorBoundary>
      <TrackingContent />
    </ErrorBoundary>
  )
}