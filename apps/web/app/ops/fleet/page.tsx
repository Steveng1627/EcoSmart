'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@ecosmart/ui'
import { Map } from '@ecosmart/ui'
import { PageLayout } from '../../components/PageLayout'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { LoadingState } from '../../components/LoadingState'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { 
  Truck, 
  Battery, 
  MapPin, 
  Settings, 
  AlertTriangle,
  Plus,
  Search
} from 'lucide-react'

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
  model: string
  firmware: string
  totalDistance: number
  maintenanceDue: Date
}

function FleetPageContent() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)

  useEffect(() => {
    // Mock data
    const mockAssets: Asset[] = [
      {
        id: 'asset-1',
        type: 'BIKE',
        serial: 'BIKE-001',
        status: 'ACTIVE',
        soc: 85,
        geo: { lat: 1.3521, lng: 103.8198 },
        lastSeen: new Date(),
        model: 'EcoBike Pro',
        firmware: 'v2.1.3',
        totalDistance: 1250,
        maintenanceDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'asset-2',
        type: 'DRONE',
        serial: 'DRONE-001',
        status: 'CHARGING',
        soc: 45,
        geo: { lat: 1.3550, lng: 103.8250 },
        lastSeen: new Date(),
        model: 'SkyDrone X1',
        firmware: 'v1.8.2',
        totalDistance: 890,
        maintenanceDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'asset-3',
        type: 'BIKE',
        serial: 'BIKE-002',
        status: 'MAINTENANCE',
        soc: 92,
        geo: { lat: 1.3521, lng: 103.8198 },
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        model: 'EcoBike Pro',
        firmware: 'v2.1.3',
        totalDistance: 2100,
        maintenanceDue: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]

    setTimeout(() => {
      setAssets(mockAssets)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success'
      case 'CHARGING': return 'warning'
      case 'INACTIVE': return 'secondary'
      case 'MAINTENANCE': return 'destructive'
      default: return 'default'
    }
  }

  const getBatteryColor = (soc: number) => {
    if (soc > 50) return 'text-green-600'
    if (soc > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleMaintenance = (asset: Asset) => {
    setSelectedAsset(asset)
    setShowMaintenanceModal(true)
  }

  const handleTrack = (asset: Asset) => {
    setSelectedAsset(asset)
    // In real app, this would open tracking view
    console.log('Tracking asset:', asset.serial)
  }

  const handleAddAsset = () => {
    // In real app, this would open add asset form
    console.log('Adding new asset')
    setShowAddModal(false)
  }

  const handleMaintenanceSubmit = () => {
    if (selectedAsset) {
      setAssets(prev => prev.map(asset => 
        asset.id === selectedAsset.id 
          ? { ...asset, status: 'MAINTENANCE' as const }
          : asset
      ))
      setShowMaintenanceModal(false)
      setSelectedAsset(null)
    }
  }

  if (loading) {
    return (
      <LoadingState 
        title="Loading Fleet Data" 
        description="Please wait while we fetch your fleet information"
        fullScreen 
      />
    )
  }

  return (
    <PageLayout 
      title="Fleet Management" 
      description="Manage and monitor your delivery fleet"
      requiredRole="ops"
    >

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assets.filter(a => a.status === 'ACTIVE').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Charging</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assets.filter(a => a.status === 'CHARGING').length}
                  </p>
                </div>
                <Battery className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Maintenance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assets.filter(a => a.status === 'MAINTENANCE').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
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
                    placeholder="Search by serial number or model..."
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
                  <option value="ACTIVE">Active</option>
                  <option value="CHARGING">Charging</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Table */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Assets ({filteredAssets.length})</CardTitle>
            <CardDescription>Manage and monitor your delivery assets</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{asset.serial}</div>
                        <div className="text-sm text-gray-500">{asset.model}</div>
                      </div>
                    </TableCell>
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
                        <span className={`text-sm font-medium ${getBatteryColor(asset.soc)}`}>
                          {asset.soc}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(asset.status) as any}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {asset.geo.lat.toFixed(4)}, {asset.geo.lng.toFixed(4)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(asset.lastSeen).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((Date.now() - asset.lastSeen.getTime()) / (1000 * 60))}m ago
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrack(asset)}
                        >
                          Track
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMaintenance(asset)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Live Map */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Live Fleet Map</CardTitle>
            <CardDescription>Real-time asset locations</CardDescription>
          </CardHeader>
          <CardContent>
            <Map
              markers={assets.map(asset => ({
                id: asset.id,
                lat: asset.geo.lat,
                lng: asset.geo.lng,
                title: asset.serial,
                type: 'asset' as const,
                status: asset.status,
                battery: asset.soc
              }))}
              height="400px"
              onMarkerClick={(marker) => {
                const asset = assets.find(a => a.id === marker.id)
                if (asset) setSelectedAsset(asset)
              }}
            />
          </CardContent>
        </Card>

        {/* Add Asset Modal */}
        <Modal open={showAddModal} onOpenChange={setShowAddModal}>
          <ModalHeader onClose={() => setShowAddModal(false)}>
            <CardTitle>Add New Asset</CardTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Asset Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="BIKE">E-Cargo Bike</option>
                  <option value="DRONE">Delivery Drone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Serial Number</label>
                <Input placeholder="Enter serial number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <Input placeholder="Enter model name" />
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAsset}>
              Add Asset
            </Button>
          </ModalFooter>
        </Modal>

        {/* Maintenance Modal */}
        <Modal open={showMaintenanceModal} onOpenChange={setShowMaintenanceModal}>
          <ModalHeader onClose={() => setShowMaintenanceModal(false)}>
            <CardTitle>Asset Maintenance</CardTitle>
          </ModalHeader>
          <ModalContent>
            {selectedAsset && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{selectedAsset.serial}</h4>
                  <p className="text-sm text-gray-600">{selectedAsset.model}</p>
                  <p className="text-sm text-gray-600">Status: {selectedAsset.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Maintenance Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="routine">Routine Maintenance</option>
                    <option value="repair">Repair</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Enter maintenance notes..."
                  />
                </div>
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowMaintenanceModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleMaintenanceSubmit}>
              Schedule Maintenance
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </PageLayout>
  )
}

export default function FleetPage() {
  return (
    <ErrorBoundary>
      <ProtectedRoute requiredRole="ops">
        <FleetPageContent />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}
