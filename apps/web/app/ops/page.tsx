'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ecosmart/ui'
import { PageLayout } from '../components/PageLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { LoadingState } from '../components/LoadingState'
import { ErrorBoundary } from '../components/ErrorBoundary'

interface Asset {
  id: string
  type: 'BIKE' | 'DRONE'
  serial: string
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'CHARGING'
  soc: number
  geo: {
    lat: number
    lng: number
  }
  lastSeen: Date
}

interface Order {
  id: string
  customer: {
    name: string
    phone: string
  }
  status: string
  mode: string
  eta?: string
}

function OpsConsoleContent() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockAssets: Asset[] = [
      {
        id: 'asset-1',
        type: 'BIKE',
        serial: 'BIKE-001',
        status: 'ACTIVE',
        soc: 85,
        geo: { lat: 1.3521, lng: 103.8198 },
        lastSeen: new Date()
      },
      {
        id: 'asset-2',
        type: 'DRONE',
        serial: 'DRONE-001',
        status: 'CHARGING',
        soc: 45,
        geo: { lat: 1.3521, lng: 103.8198 },
        lastSeen: new Date()
      }
    ]

    const mockOrders: Order[] = [
      {
        id: 'order-123',
        customer: { name: 'John Doe', phone: '+65 9123 4567' },
        status: 'CREATED',
        mode: 'HYBRID'
      }
    ]

    setTimeout(() => {
      setAssets(mockAssets)
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <LoadingState 
        title="Loading Operations Data" 
        description="Please wait while we fetch fleet and order information"
        fullScreen 
      />
    )
  }

  return (
    <PageLayout 
      title="Operations Console" 
      description="Monitor and manage fleet operations"
      requiredRole="ops"
    >

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Active Assets</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assets.filter(a => a.status === 'ACTIVE').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🚴</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Orders Today</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📦</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Avg Battery</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(assets.reduce((acc, asset) => acc + asset.soc, 0) / assets.length)}%
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">🔋</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">CO2 Saved</p>
                  <p className="text-2xl font-bold text-gray-900">2.4kg</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🌱</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Status</CardTitle>
              <CardDescription>Real-time fleet monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.serial}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {asset.type === 'BIKE' ? '🚴' : '🚁'}
                          </span>
                          <span>{asset.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                asset.soc > 50 ? 'bg-green-500' : 
                                asset.soc > 20 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${asset.soc}%` }}
                            />
                          </div>
                          <span className="text-sm">{asset.soc}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">
                          {asset.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Queue</CardTitle>
              <CardDescription>Orders awaiting dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="info">
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Live Map</CardTitle>
            <CardDescription>Real-time asset tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-500 text-2xl">🗺️</span>
                </div>
                <p className="text-gray-600">Interactive map will be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Showing {assets.length} assets in Singapore
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </PageLayout>
  )
}

export default function OpsConsole() {
  return (
    <ErrorBoundary>
      <ProtectedRoute requiredRole="ops">
        <OpsConsoleContent />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}