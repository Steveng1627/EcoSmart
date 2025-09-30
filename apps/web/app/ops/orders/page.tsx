'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@ecosmart/ui'
import { LoadingSpinner } from '@ecosmart/ui'
import { Navigation } from '../../components/Navigation'
import { 
  Package, 
  Clock, 
  Phone,
  Search,
  Eye,
  Truck
} from 'lucide-react'

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  status: 'CREATED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED' | 'RETURNED'
  mode: 'BIKE' | 'DRONE' | 'HYBRID'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  pickup: {
    address: string
    lat: number
    lng: number
    contact: string
    phone: string
  }
  dropoff: {
    address: string
    lat: number
    lng: number
    contact: string
    phone: string
  }
  items: string
  weight: number
  estimatedDelivery: Date
  createdAt: Date
  assignedAsset?: string
  driver?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)

  useEffect(() => {
    // Mock data
    const mockOrders: Order[] = [
      {
        id: 'order-123',
        customer: { 
          name: 'John Doe', 
          phone: '+65 9123 4567',
          email: 'john@example.com'
        },
        status: 'CREATED',
        mode: 'HYBRID',
        priority: 'MEDIUM',
        pickup: {
          address: '123 Orchard Road, Singapore 238863',
          lat: 1.3048,
          lng: 103.8318,
          contact: 'Jane Smith',
          phone: '+65 9876 5432'
        },
        dropoff: {
          address: '456 Marina Bay, Singapore 018956',
          lat: 1.2833,
          lng: 103.8607,
          contact: 'John Doe',
          phone: '+65 9123 4567'
        },
        items: 'Electronics - 2kg',
        weight: 2,
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 'order-124',
        customer: { 
          name: 'Sarah Wilson', 
          phone: '+65 8765 4321',
          email: 'sarah@example.com'
        },
        status: 'DISPATCHED',
        mode: 'BIKE',
        priority: 'HIGH',
        pickup: {
          address: '789 Bugis Street, Singapore 189655',
          lat: 1.3003,
          lng: 103.8561,
          contact: 'Mike Johnson',
          phone: '+65 8765 4321'
        },
        dropoff: {
          address: '321 Tampines Ave, Singapore 529653',
          lat: 1.3496,
          lng: 103.9568,
          contact: 'Sarah Wilson',
          phone: '+65 8765 4321'
        },
        items: 'Documents - 0.5kg',
        weight: 0.5,
        estimatedDelivery: new Date(Date.now() + 1 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        assignedAsset: 'BIKE-001',
        driver: 'Alex Chen'
      },
      {
        id: 'order-125',
        customer: { 
          name: 'David Lee', 
          phone: '+65 7654 3210',
          email: 'david@example.com'
        },
        status: 'IN_TRANSIT',
        mode: 'DRONE',
        priority: 'URGENT',
        pickup: {
          address: '555 Sentosa Island, Singapore 099585',
          lat: 1.2494,
          lng: 103.8303,
          contact: 'Lisa Wong',
          phone: '+65 7654 3210'
        },
        dropoff: {
          address: '888 Jurong East, Singapore 609760',
          lat: 1.3333,
          lng: 103.7333,
          contact: 'David Lee',
          phone: '+65 7654 3210'
        },
        items: 'Medical supplies - 1kg',
        weight: 1,
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000),
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        assignedAsset: 'DRONE-001',
        driver: 'Pilot System'
      }
    ]

    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'text-gray-500'
      case 'MEDIUM': return 'text-blue-500'
      case 'HIGH': return 'text-orange-500'
      case 'URGENT': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  const handleAssign = (order: Order) => {
    setSelectedOrder(order)
    setShowAssignModal(true)
  }

  const handleAssignSubmit = () => {
    if (selectedOrder) {
      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: 'DISPATCHED' as const, assignedAsset: 'BIKE-001', driver: 'Alex Chen' }
          : order
      ))
      setShowAssignModal(false)
      setSelectedOrder(null)
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any }
        : order
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'CREATED').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'IN_TRANSIT').length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'DELIVERED').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by order ID, customer name, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Priority</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>Manage and track delivery orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>ETA</TableHead>
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
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {order.mode === 'BIKE' ? '🚴' : order.mode === 'DRONE' ? '🚁' : '🚴🚁'}
                        </span>
                        <span className="text-sm">{order.mode}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.estimatedDelivery.toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((order.estimatedDelivery.getTime() - Date.now()) / (1000 * 60))}m
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === 'CREATED' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAssign(order)}
                          >
                            Assign
                          </Button>
                        )}
                        {order.status === 'DISPATCHED' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'IN_TRANSIT')}
                          >
                            Start
                          </Button>
                        )}
                        {order.status === 'IN_TRANSIT' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <Modal open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <ModalHeader onClose={() => setShowDetailsModal(false)}>
            <CardTitle>Order Details</CardTitle>
          </ModalHeader>
          <ModalContent>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Order Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-gray-600">ID:</span> {selectedOrder.id}</p>
                      <p><span className="text-gray-600">Status:</span> 
                        <Badge variant={getStatusColor(selectedOrder.status) as any} className="ml-2">
                          {selectedOrder.status}
                        </Badge>
                      </p>
                      <p><span className="text-gray-600">Priority:</span> 
                        <span className={`ml-2 ${getPriorityColor(selectedOrder.priority)}`}>
                          {selectedOrder.priority}
                        </span>
                      </p>
                      <p><span className="text-gray-600">Mode:</span> {selectedOrder.mode}</p>
                      <p><span className="text-gray-600">Weight:</span> {selectedOrder.weight}kg</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Customer</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-gray-600">Name:</span> {selectedOrder.customer.name}</p>
                      <p><span className="text-gray-600">Phone:</span> {selectedOrder.customer.phone}</p>
                      {selectedOrder.customer.email && (
                        <p><span className="text-gray-600">Email:</span> {selectedOrder.customer.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Pickup Location</h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedOrder.pickup.address}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Contact: {selectedOrder.pickup.contact} ({selectedOrder.pickup.phone})
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Delivery Location</h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedOrder.dropoff.address}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Contact: {selectedOrder.dropoff.contact} ({selectedOrder.dropoff.phone})
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Items</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.items}</p>
                </div>

                {selectedOrder.assignedAsset && (
                  <div>
                    <h4 className="font-medium text-gray-900">Assignment</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-gray-600">Asset:</span> {selectedOrder.assignedAsset}</p>
                      {selectedOrder.driver && (
                        <p><span className="text-gray-600">Driver:</span> {selectedOrder.driver}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {/* Assign Order Modal */}
        <Modal open={showAssignModal} onOpenChange={setShowAssignModal}>
          <ModalHeader onClose={() => setShowAssignModal(false)}>
            <CardTitle>Assign Order</CardTitle>
          </ModalHeader>
          <ModalContent>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{selectedOrder.id}</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">Priority: {selectedOrder.priority}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Select Asset</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="BIKE-001">BIKE-001 (EcoBike Pro) - 85% battery</option>
                    <option value="BIKE-002">BIKE-002 (EcoBike Pro) - 92% battery</option>
                    <option value="DRONE-001">DRONE-001 (SkyDrone X1) - 45% battery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Select Driver</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="Alex Chen">Alex Chen</option>
                    <option value="Sarah Lee">Sarah Lee</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Enter assignment notes..."
                  />
                </div>
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignSubmit}>
              Assign Order
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  )
}
