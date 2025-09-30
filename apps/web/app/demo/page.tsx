'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Map } from '@ecosmart/ui'
import { LineChart, PieChart, MetricCard } from '@ecosmart/ui'
import Link from 'next/link'
import { 
  Play, 
  Pause, 
  RotateCcw,
  Truck,
  Package,
  Battery,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DemoData {
  orders: number
  deliveries: number
  carbonSaved: number
  efficiency: number
}

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [demoData, setDemoData] = useState<DemoData>({
    orders: 0,
    deliveries: 0,
    carbonSaved: 0,
    efficiency: 0
  })

  const demoSteps = [
    {
      title: "Order Creation",
      description: "Merchant creates a new delivery order",
      action: () => {
        setDemoData(prev => ({ ...prev, orders: prev.orders + 1 }))
      }
    },
    {
      title: "AI Route Planning",
      description: "System optimizes delivery route using AI",
      action: () => {
        setDemoData(prev => ({ ...prev, efficiency: Math.min(prev.efficiency + 15, 95) }))
      }
    },
    {
      title: "Fleet Assignment",
      description: "Assigns optimal vehicle (bike or drone)",
      action: () => {
        setDemoData(prev => ({ ...prev, efficiency: Math.min(prev.efficiency + 10, 95) }))
      }
    },
    {
      title: "Real-time Tracking",
      description: "Customer tracks delivery in real-time",
      action: () => {
        setDemoData(prev => ({ ...prev, deliveries: prev.deliveries + 1 }))
      }
    },
    {
      title: "Carbon Tracking",
      description: "System calculates and reports carbon savings",
      action: () => {
        setDemoData(prev => ({ ...prev, carbonSaved: prev.carbonSaved + 0.5 }))
      }
    }
  ]

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      // Simulate demo progression
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < demoSteps.length - 1) {
            const nextStep = prev + 1
            // Execute the action for the next step
            demoSteps[nextStep].action()
            return nextStep
          } else {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
        })
      }, 2000)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setDemoData({
      orders: 0,
      deliveries: 0,
      carbonSaved: 0,
      efficiency: 0
    })
  }

  const orderTrendData = [
    { label: '9:00', value: 12, color: '#3b82f6' },
    { label: '10:00', value: 18, color: '#3b82f6' },
    { label: '11:00', value: 25, color: '#3b82f6' },
    { label: '12:00', value: 32, color: '#3b82f6' },
    { label: '13:00', value: 28, color: '#3b82f6' },
    { label: '14:00', value: 35, color: '#3b82f6' }
  ]

  const deliveryModeData = [
    { label: 'Bike', value: 65, color: '#10b981' },
    { label: 'Drone', value: 25, color: '#8b5cf6' },
    { label: 'Hybrid', value: 10, color: '#f59e0b' }
  ]

  const mapMarkers = [
    {
      id: 'asset-1',
      lat: 1.3521,
      lng: 103.8198,
      title: 'Bike-001',
      type: 'asset' as const,
      status: 'ACTIVE',
      battery: 85
    },
    {
      id: 'asset-2',
      lat: 1.3550,
      lng: 103.8250,
      title: 'Drone-001',
      type: 'asset' as const,
      status: 'CHARGING',
      battery: 45
    },
    {
      id: 'order-1',
      lat: 1.3500,
      lng: 103.8200,
      title: 'Order-123',
      type: 'pickup' as const,
      status: 'CREATED'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EcoSmart Demo</span>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              See EcoSmart in
              <span className="text-green-600"> Action</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience how our AI-powered platform transforms delivery operations 
              in real-time. Watch as orders are created, routes are optimized, and 
              deliveries are completed with zero emissions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" onClick={handlePlayPause}>
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause Demo
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Demo
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" onClick={handleReset}>
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentStep ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {demoSteps.length}
              </span>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-900">
                {demoSteps[currentStep]?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {demoSteps[currentStep]?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Dashboard */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Dashboard</h2>
            <p className="text-lg text-gray-600">
              Real-time metrics and operations monitoring
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard
              title="Orders Today"
              value={demoData.orders}
              change={{ value: 12, type: 'increase' }}
              icon={<Package className="h-8 w-8" />}
            />
            <MetricCard
              title="Deliveries Completed"
              value={demoData.deliveries}
              change={{ value: 8, type: 'increase' }}
              icon={<Truck className="h-8 w-8" />}
            />
            <MetricCard
              title="CO2 Saved (kg)"
              value={demoData.carbonSaved.toFixed(1)}
              change={{ value: 15, type: 'increase' }}
              icon={<Battery className="h-8 w-8" />}
            />
            <MetricCard
              title="Efficiency"
              value={`${demoData.efficiency}%`}
              change={{ value: 5, type: 'increase' }}
              icon={<CheckCircle className="h-8 w-8" />}
            />
          </div>

          {/* Charts and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>Real-time order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={orderTrendData} height={200} />
              </CardContent>
            </Card>

            {/* Delivery Modes */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Modes</CardTitle>
                <CardDescription>Distribution by vehicle type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={deliveryModeData} size={200} />
              </CardContent>
            </Card>
          </div>

          {/* Live Map */}
          <Card>
            <CardHeader>
              <CardTitle>Live Operations Map</CardTitle>
              <CardDescription>Real-time fleet and order tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Map
                markers={mapMarkers}
                height="400px"
                onMarkerClick={(marker) => {
                  alert(`Clicked on ${marker.title} (${marker.type})`)
                }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              See how our platform handles complex delivery scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>AI Route Optimization</CardTitle>
                <CardDescription>
                  Intelligent routing that reduces delivery time by 30% and carbon emissions by 60%
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>
                  Real-time monitoring of electric vehicles with battery optimization and maintenance scheduling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>
                  Customers can track their deliveries in real-time with accurate ETAs and delivery updates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Delivery Operations?
          </h2>
          <p className="text-green-100 mb-8">
            Join the sustainable delivery revolution and start reducing your carbon footprint today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/auth/login">Try Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold">EcoSmart</span>
              </div>
              <p className="text-gray-400">
                Sustainable last-mile delivery powered by AI and green technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/merchant">Merchant Portal</Link></li>
                <li><Link href="/ops">Operations Console</Link></li>
                <li><Link href="/api">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/status">System Status</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
