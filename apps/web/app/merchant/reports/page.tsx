'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { LineChart, PieChart, MetricCard } from '@ecosmart/ui'
import { LoadingSpinner } from '@ecosmart/ui'
import { Navigation } from '../../components/Navigation'
import { 
  TrendingUp, 
  Package, 
  Clock, 
  Download,
  RefreshCw
} from 'lucide-react'

interface ReportData {
  period: string
  totalOrders: number
  deliveredOrders: number
  failedOrders: number
  avgDeliveryTime: number
  customerSatisfaction: number
  carbonSaved: number
  revenue: number
}

interface ChartData {
  label: string
  value: number
  color?: string
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setReportData({
        period: 'Last 7 days',
        totalOrders: 156,
        deliveredOrders: 148,
        failedOrders: 8,
        avgDeliveryTime: 28,
        customerSatisfaction: 4.8,
        carbonSaved: 2.4,
        revenue: 12500
      })
      setLoading(false)
    }, 1000)
  }, [selectedPeriod])

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

  const handleExportReport = () => {
    // Simulate report export
    alert('Report exported successfully! Check your downloads folder.')
  }

  const handleRefreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Data refreshed successfully!')
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Period</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRefreshData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Orders"
            value={reportData?.totalOrders || 0}
            change={{ value: 12, type: 'increase' }}
            icon={<Package className="h-8 w-8" />}
          />
          <MetricCard
            title="Success Rate"
            value={`${Math.round(((reportData?.deliveredOrders || 0) / (reportData?.totalOrders || 1)) * 100)}%`}
            change={{ value: 3, type: 'increase' }}
            icon={<TrendingUp className="h-8 w-8" />}
          />
          <MetricCard
            title="Avg Delivery Time"
            value={`${reportData?.avgDeliveryTime || 0}min`}
            change={{ value: 8, type: 'decrease' }}
            icon={<Clock className="h-8 w-8" />}
          />
          <MetricCard
            title="Customer Rating"
            value={`${reportData?.customerSatisfaction || 0}/5`}
            change={{ value: 0.2, type: 'increase' }}
            icon={<TrendingUp className="h-8 w-8" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Daily order volume over time</CardDescription>
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
        <Card className="mb-8">
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

        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Carbon footprint reduction and sustainability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {reportData?.carbonSaved || 0}kg
                </div>
                <div className="text-sm text-gray-600">CO2 Saved</div>
                <div className="text-xs text-green-600 mt-1">+15% vs last period</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Green Delivery Rate</div>
                <div className="text-xs text-blue-600 mt-1">Electric vehicles only</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                <div className="text-sm text-gray-600">Packaging Reuse</div>
                <div className="text-xs text-purple-600 mt-1">Circular packaging system</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
