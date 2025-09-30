'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ecosmart/ui'
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@ecosmart/ui'
import { PageLayout } from '../components/PageLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { LoadingState } from '../components/LoadingState'
import { EmptyState } from '../components/EmptyState'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Package } from 'lucide-react'

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  status: 'CREATED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED' | 'RETURNED' | 'CANCELLED'
  mode: 'BIKE' | 'DRONE' | 'HYBRID'
  eta?: string
  createdAt: string
}

function MerchantPortalContent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupAddress: '',
    dropoffAddress: '',
    items: '',
    packagingType: 'REUSABLE_BOX'
  })

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        customer: {
          name: 'John Doe',
          phone: '+65 9123 4567',
          email: 'john@example.com'
        },
        status: 'IN_TRANSIT',
        mode: 'BIKE',
        eta: '2024-01-15T14:30:00Z',
        createdAt: '2024-01-15T13:00:00Z'
      },
      {
        id: 'order-2',
        customer: {
          name: 'Jane Smith',
          phone: '+65 9876 5432',
          email: 'jane@example.com'
        },
        status: 'DELIVERED',
        mode: 'DRONE',
        createdAt: '2024-01-15T12:00:00Z'
      },
      {
        id: 'order-3',
        customer: {
          name: 'Bob Wilson',
          phone: '+65 8765 4321'
        },
        status: 'CREATED',
        mode: 'HYBRID',
        createdAt: '2024-01-15T14:00:00Z'
      }
    ]
    
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CREATED': return 'info'
      case 'DISPATCHED': return 'warning'
      case 'IN_TRANSIT': return 'default'
      case 'DELIVERED': return 'success'
      case 'FAILED': return 'destructive'
      case 'RETURNED': return 'secondary'
      default: return 'default'
    }
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'BIKE': return '🚴'
      case 'DRONE': return '🚁'
      case 'HYBRID': return '🚴🚁'
      default: return '📦'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.phone.includes(searchTerm) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateOrder = () => {
    // Validate required fields
    if (!newOrder.customerName || !newOrder.customerPhone || !newOrder.pickupAddress || !newOrder.dropoffAddress) {
      alert('Please fill in all required fields')
      return
    }

    // In real app, this would call the API
    const newOrderData: Order = {
      id: `order-${Date.now()}`,
      customer: {
        name: newOrder.customerName,
        phone: newOrder.customerPhone,
        email: newOrder.customerEmail
      },
      status: 'CREATED',
      mode: 'HYBRID',
      createdAt: new Date().toISOString()
    }

    setOrders(prev => [newOrderData, ...prev])
    setShowCreateModal(false)
    setNewOrder({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      pickupAddress: '',
      dropoffAddress: '',
      items: '',
      packagingType: 'REUSABLE_BOX'
    })
    
    // Show success message
    alert('Order created successfully!')
  }

  if (loading) {
    return (
      <LoadingState 
        title="Loading Orders" 
        description="Please wait while we fetch your order data"
        fullScreen 
      />
    )
  }

  // Show empty state if no orders
  if (orders.length === 0 && !loading) {
    return (
      <PageLayout 
        title="Order Management" 
        description="Manage and track your delivery orders"
        requiredRole="merchant_admin"
      >
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="You haven't created any orders yet. Create your first order to get started."
          actionLabel="Create Order"
          onAction={() => setShowCreateModal(true)}
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout 
      title="Order Management" 
      description="Manage and track your delivery orders"
      requiredRole="merchant_admin"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">On-Time Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95.2%</div>
              <p className="text-xs text-green-600">+2.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Carbon Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4kg</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600">8 bikes, 4 drones</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search orders by customer name, phone, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="CREATED">Created</option>
                  <option value="DISPATCHED">Dispatched</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="FAILED">Failed</option>
                </select>
                <Button onClick={() => setShowCreateModal(true)}>
                  Create Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                <CardDescription>Manage and track your delivery orders</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getModeIcon(order.mode)}</span>
                          <span className="text-sm">{order.mode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer.name}\nStatus: ${order.status}\nCreated: ${new Date(order.createdAt).toLocaleString()}`)
                            }}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              window.open(`/tracking?order=${order.id}`, '_blank')
                            }}
                          >
                            Track
                          </Button>
                          {order.status === 'CREATED' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to cancel this order?')) {
                                  setOrders(prev => prev.map(o => 
                                    o.id === order.id ? { ...o, status: 'CANCELLED' } : o
                                  ))
                                  alert('Order cancelled successfully')
                                }
                              }}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Create Order Modal */}
        <Modal open={showCreateModal} onOpenChange={setShowCreateModal}>
          <ModalHeader onClose={() => setShowCreateModal(false)}>
            <CardTitle>Create New Order</CardTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name</label>
                  <Input
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    value={newOrder.customerPhone}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={newOrder.customerEmail}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Address</label>
                  <Input
                    value={newOrder.pickupAddress}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, pickupAddress: e.target.value }))}
                    placeholder="Enter pickup address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dropoff Address</label>
                  <Input
                    value={newOrder.dropoffAddress}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, dropoffAddress: e.target.value }))}
                    placeholder="Enter dropoff address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Items Description</label>
                <Input
                  value={newOrder.items}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, items: e.target.value }))}
                  placeholder="Describe the items to be delivered"
                />
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrder}>
              Create Order
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </PageLayout>
  )
}

export default function MerchantPortal() {
  return (
    <ErrorBoundary>
      <ProtectedRoute requiredRole="merchant_admin">
        <MerchantPortalContent />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}
