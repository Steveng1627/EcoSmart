import { Button } from '@ecosmart/ui'
import { Card, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EcoSmart</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Faster. <span className="text-green-600">Greener.</span> Safer.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered last-mile delivery with e-cargo bikes and drones. 
              Zero emissions, optimized routes, and circular packaging for a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/contact">Start Delivering Green</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EcoSmart?</h2>
            <p className="text-lg text-gray-600">
              Revolutionary technology for sustainable last-mile delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚴</span>
                </div>
                <CardTitle>Zero Emissions</CardTitle>
                <CardDescription>
                  Electric vehicles and drones powered by renewable energy, 
                  reducing carbon footprint by 60% compared to traditional delivery.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle>AI Optimization</CardTitle>
                <CardDescription>
                  Machine learning algorithms optimize routes in real-time, 
                  reducing delivery time by 30% and improving efficiency.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♻️</span>
                </div>
                <CardTitle>Circular Packaging</CardTitle>
                <CardDescription>
                  Reusable and biodegradable packaging solutions that 
                  minimize waste and promote environmental sustainability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-lg text-gray-600">
              Real impact from our sustainable delivery solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
              <div className="text-lg text-gray-700 mb-1">Carbon Reduction</div>
              <div className="text-sm text-gray-600">vs traditional delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-lg text-gray-700 mb-1">Faster Delivery</div>
              <div className="text-sm text-gray-600">with AI optimization</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-lg text-gray-700 mb-1">Customer Satisfaction</div>
              <div className="text-sm text-gray-600">rating across all deliveries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">1M+</div>
              <div className="text-lg text-gray-700 mb-1">Deliveries Completed</div>
              <div className="text-sm text-gray-600">with zero emissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Go Green?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Join the sustainable delivery revolution. Start with a pilot program and scale to full operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/contact">Schedule Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/whitepaper">Download Whitepaper</Link>
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
                <li><Link href="/demo">Demo</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/auth/login">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact">Help Center</Link></li>
                <li><Link href="/contact">Contact Support</Link></li>
                <li><Link href="/contact">Privacy Policy</Link></li>
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