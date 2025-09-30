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
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Search,
  Plus,
  Eye,
  CheckCircle
} from 'lucide-react'

interface Incident {
  id: string
  type: 'ACCIDENT' | 'BREAKDOWN' | 'THEFT' | 'WEATHER' | 'TRAFFIC' | 'OTHER'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  title: string
  description: string
  location: {
    address: string
    lat: number
    lng: number
  }
  reportedBy: string
  reportedAt: Date
  assignedTo?: string
  resolvedAt?: Date
  resolution?: string
  affectedOrders: string[]
  affectedAssets: string[]
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    // Mock data
    const mockIncidents: Incident[] = [
      {
        id: 'inc-001',
        type: 'ACCIDENT',
        severity: 'HIGH',
        status: 'OPEN',
        title: 'Bike collision with pedestrian',
        description: 'EcoBike-001 collided with pedestrian at Orchard Road intersection. Minor injuries reported.',
        location: {
          address: 'Orchard Road, Singapore 238863',
          lat: 1.3048,
          lng: 103.8318
        },
        reportedBy: 'Alex Chen',
        reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        affectedOrders: ['order-123'],
        affectedAssets: ['BIKE-001']
      },
      {
        id: 'inc-002',
        type: 'BREAKDOWN',
        severity: 'MEDIUM',
        status: 'IN_PROGRESS',
        title: 'Drone battery failure',
        description: 'SkyDrone-001 experienced sudden battery drain during delivery. Emergency landing required.',
        location: {
          address: 'Marina Bay, Singapore 018956',
          lat: 1.2833,
          lng: 103.8607
        },
        reportedBy: 'Pilot System',
        reportedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        assignedTo: 'Sarah Lee',
        affectedOrders: ['order-125'],
        affectedAssets: ['DRONE-001']
      },
      {
        id: 'inc-003',
        type: 'WEATHER',
        severity: 'LOW',
        status: 'RESOLVED',
        title: 'Heavy rain delay',
        description: 'Heavy rain caused delays in drone operations. All flights grounded for safety.',
        location: {
          address: 'Singapore Central',
          lat: 1.3521,
          lng: 103.8198
        },
        reportedBy: 'Weather System',
        reportedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        assignedTo: 'Mike Johnson',
        resolvedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        resolution: 'Weather cleared, operations resumed',
        affectedOrders: ['order-124', 'order-125'],
        affectedAssets: ['DRONE-001']
      }
    ]

    setTimeout(() => {
      setIncidents(mockIncidents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'success'
      case 'MEDIUM': return 'warning'
      case 'HIGH': return 'destructive'
      case 'CRITICAL': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'destructive'
      case 'IN_PROGRESS': return 'warning'
      case 'RESOLVED': return 'success'
      case 'CLOSED': return 'secondary'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ACCIDENT': return '🚨'
      case 'BREAKDOWN': return '🔧'
      case 'THEFT': return '🔒'
      case 'WEATHER': return '🌧️'
      case 'TRAFFIC': return '🚦'
      default: return '⚠️'
    }
  }

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident)
    setShowDetailsModal(true)
  }

  const handleAssign = (incident: Incident) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incident.id 
        ? { ...inc, status: 'IN_PROGRESS' as const, assignedTo: 'Current User' }
        : inc
    ))
  }

  const handleResolve = (incident: Incident) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incident.id 
        ? { 
            ...inc, 
            status: 'RESOLVED' as const, 
            resolvedAt: new Date(),
            resolution: 'Incident resolved by operations team'
          }
        : inc
    ))
  }

  const handleCreateIncident = () => {
    // In real app, this would create a new incident
    console.log('Creating new incident')
    setShowCreateModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading incidents...</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                  <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Open</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {incidents.filter(i => i.status === 'OPEN').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {incidents.filter(i => i.status === 'IN_PROGRESS').length}
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
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {incidents.filter(i => i.status === 'RESOLVED').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
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
                    placeholder="Search by incident ID, title, or description..."
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
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Severity</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents ({filteredIncidents.length})</CardTitle>
            <CardDescription>Manage and track operational incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{incident.id}</div>
                        <div className="text-sm text-gray-500">{incident.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTypeIcon(incident.type)}</span>
                        <span className="text-sm">{incident.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(incident.severity) as any}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(incident.status) as any}>
                        {incident.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm max-w-32 truncate">
                          {incident.location.address}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {incident.reportedAt.toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {incident.reportedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(incident)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {incident.status === 'OPEN' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAssign(incident)}
                          >
                            Assign
                          </Button>
                        )}
                        {incident.status === 'IN_PROGRESS' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResolve(incident)}
                          >
                            Resolve
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

        {/* Incident Details Modal */}
        <Modal open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <ModalHeader onClose={() => setShowDetailsModal(false)}>
            <CardTitle>Incident Details</CardTitle>
          </ModalHeader>
          <ModalContent>
            {selectedIncident && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Incident Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-gray-600">ID:</span> {selectedIncident.id}</p>
                      <p><span className="text-gray-600">Type:</span> {selectedIncident.type}</p>
                      <p><span className="text-gray-600">Severity:</span> 
                        <Badge variant={getSeverityColor(selectedIncident.severity) as any} className="ml-2">
                          {selectedIncident.severity}
                        </Badge>
                      </p>
                      <p><span className="text-gray-600">Status:</span> 
                        <Badge variant={getStatusColor(selectedIncident.status) as any} className="ml-2">
                          {selectedIncident.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Report Details</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-gray-600">Reported by:</span> {selectedIncident.reportedBy}</p>
                      <p><span className="text-gray-600">Reported at:</span> {selectedIncident.reportedAt.toLocaleString()}</p>
                      {selectedIncident.assignedTo && (
                        <p><span className="text-gray-600">Assigned to:</span> {selectedIncident.assignedTo}</p>
                      )}
                      {selectedIncident.resolvedAt && (
                        <p><span className="text-gray-600">Resolved at:</span> {selectedIncident.resolvedAt.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <p className="text-sm text-gray-600 mt-2">{selectedIncident.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedIncident.location.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {selectedIncident.location.lat.toFixed(4)}, {selectedIncident.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>

                {selectedIncident.affectedOrders.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900">Affected Orders</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedIncident.affectedOrders.map(orderId => (
                        <Badge key={orderId} variant="outline">{orderId}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedIncident.affectedAssets.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900">Affected Assets</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedIncident.affectedAssets.map(assetId => (
                        <Badge key={assetId} variant="outline">{assetId}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedIncident.resolution && (
                  <div>
                    <h4 className="font-medium text-gray-900">Resolution</h4>
                    <p className="text-sm text-gray-600 mt-2">{selectedIncident.resolution}</p>
                  </div>
                )}
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
            {selectedIncident?.status === 'OPEN' && (
              <Button onClick={() => {
                handleAssign(selectedIncident)
                setShowDetailsModal(false)
              }}>
                Assign to Me
              </Button>
            )}
            {selectedIncident?.status === 'IN_PROGRESS' && (
              <Button onClick={() => {
                handleResolve(selectedIncident)
                setShowDetailsModal(false)
              }}>
                Mark Resolved
              </Button>
            )}
          </ModalFooter>
        </Modal>

        {/* Create Incident Modal */}
        <Modal open={showCreateModal} onOpenChange={setShowCreateModal}>
          <ModalHeader onClose={() => setShowCreateModal(false)}>
            <CardTitle>Report New Incident</CardTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Incident Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="ACCIDENT">Accident</option>
                  <option value="BREAKDOWN">Breakdown</option>
                  <option value="THEFT">Theft</option>
                  <option value="WEATHER">Weather</option>
                  <option value="TRAFFIC">Traffic</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Severity</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input placeholder="Brief description of the incident" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Detailed description of what happened..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input placeholder="Address or location of the incident" />
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateIncident}>
              Report Incident
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  )
}
