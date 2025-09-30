'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { LoadingSpinner } from '@ecosmart/ui'
import { useAuth } from '../../components/AuthProvider'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'ops' | 'merchant_admin' | 'merchant_ops' | 'viewer'
  merchantId?: string
  avatar?: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    remember: false
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      if (form.email === 'admin@ecosmart.com' && form.password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@ecosmart.com',
          role: 'admin'
        }
        login(user)
        window.location.href = '/dashboard'
      } else if (form.email === 'merchant@greenmart.sg' && form.password === 'merchant123') {
        const user: User = {
          id: '2',
          name: 'GreenMart Admin',
          email: 'merchant@greenmart.sg',
          role: 'merchant_admin',
          merchantId: 'merchant-1'
        }
        login(user)
        window.location.href = '/merchant'
      } else if (form.email === 'ops@ecosmart.com' && form.password === 'ops123') {
        const user: User = {
          id: '3',
          name: 'Operations Manager',
          email: 'ops@ecosmart.com',
          role: 'ops'
        }
        login(user)
        window.location.href = '/ops'
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 1500)
  }

  const handleDemoLogin = (role: string) => {
    setLoading(true)
    setTimeout(() => {
      let user: User
      let redirectUrl: string

      switch (role) {
        case 'admin':
          user = {
            id: '1',
            name: 'Admin User',
            email: 'admin@ecosmart.com',
            role: 'admin'
          }
          redirectUrl = '/dashboard'
          break
        case 'merchant':
          user = {
            id: '2',
            name: 'GreenMart Admin',
            email: 'merchant@greenmart.sg',
            role: 'merchant_admin',
            merchantId: 'merchant-1'
          }
          redirectUrl = '/merchant'
          break
        case 'ops':
          user = {
            id: '3',
            name: 'Operations Manager',
            email: 'ops@ecosmart.com',
            role: 'ops'
          }
          redirectUrl = '/ops'
          break
        default:
          return
      }

      login(user)
      window.location.href = redirectUrl
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sign in to EcoSmart</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your delivery management platform
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => setForm(prev => ({ ...prev, remember: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Demo Accounts</CardTitle>
            <CardDescription className="text-center">
              Try different user roles to explore the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-sm">A</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Admin Dashboard</div>
                <div className="text-xs text-gray-500">Full platform access</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDemoLogin('merchant')}
              disabled={loading}
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">M</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Merchant Portal</div>
                <div className="text-xs text-gray-500">Order management</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDemoLogin('ops')}
              disabled={loading}
            >
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-sm">O</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Operations Console</div>
                <div className="text-xs text-gray-500">Fleet & dispatch</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-green-600 hover:text-green-500">
              Contact sales
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
