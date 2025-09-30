'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ecosmart/ui'
import { Badge } from '@ecosmart/ui'
import { Button } from '@ecosmart/ui'
import { Input } from '@ecosmart/ui'
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@ecosmart/ui'
import { LoadingSpinner } from '@ecosmart/ui'
import { Navigation } from '../../components/Navigation'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe,
  Save,
  Trash2,
  Plus,
  Key
} from 'lucide-react'

interface MerchantSettings {
  businessInfo: {
    name: string
    email: string
    phone: string
    address: string
    website: string
    description: string
  }
  deliverySettings: {
    maxDistance: number
    deliveryTime: number
    autoAccept: boolean
    notifications: boolean
  }
  billing: {
    plan: string
    rate: number
    currency: string
    nextBilling: string
  }
  apiKeys: {
    id: string
    name: string
    key: string
    created: string
    lastUsed: string
  }[]
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<MerchantSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('business')
  const [showApiModal, setShowApiModal] = useState(false)

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setSettings({
        businessInfo: {
          name: 'GreenMart Singapore',
          email: 'contact@greenmart.sg',
          phone: '+65 6123 4567',
          address: '123 Orchard Road, Singapore 238863',
          website: 'https://greenmart.sg',
          description: 'Sustainable grocery delivery service'
        },
        deliverySettings: {
          maxDistance: 15,
          deliveryTime: 30,
          autoAccept: true,
          notifications: true
        },
        billing: {
          plan: 'Premium',
          rate: 0.15,
          currency: 'SGD',
          nextBilling: '2024-02-15'
        },
        apiKeys: [
          {
            id: 'key-1',
            name: 'Production API',
            key: 'sk_live_...',
            created: '2024-01-15',
            lastUsed: '2024-01-20'
          },
          {
            id: 'key-2',
            name: 'Development API',
            key: 'sk_test_...',
            created: '2024-01-10',
            lastUsed: '2024-01-18'
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  const handleCreateApiKey = () => {
    const name = prompt('Enter API key name:')
    if (name) {
      const newKey = {
        id: `key-${Date.now()}`,
        name,
        key: `sk_${Math.random().toString(36).substr(2, 9)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never'
      }
      setSettings(prev => prev ? {
        ...prev,
        apiKeys: [...prev.apiKeys, newKey]
      } : null)
      setShowApiModal(false)
      alert('API key created successfully!')
    }
  }

  const handleDeleteApiKey = (keyId: string) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setSettings(prev => prev ? {
        ...prev,
        apiKeys: prev.apiKeys.filter(key => key.id !== keyId)
      } : null)
      // Modal closed
      alert('API key deleted successfully!')
    }
  }

  const handleUpgradePlan = () => {
    alert('Redirecting to billing portal...')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: 'business', label: 'Business Info', icon: User },
              { id: 'delivery', label: 'Delivery Settings', icon: Globe },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Business Info Tab */}
        {activeTab === 'business' && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Manage your business profile and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <Input
                    value={settings?.businessInfo.name || ''}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      businessInfo: { ...prev.businessInfo, name: e.target.value }
                    } : null)}
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    value={settings?.businessInfo.email || ''}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      businessInfo: { ...prev.businessInfo, email: e.target.value }
                    } : null)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    value={settings?.businessInfo.phone || ''}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      businessInfo: { ...prev.businessInfo, phone: e.target.value }
                    } : null)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={settings?.businessInfo.website || ''}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      businessInfo: { ...prev.businessInfo, website: e.target.value }
                    } : null)}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={settings?.businessInfo.address || ''}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    businessInfo: { ...prev.businessInfo, address: e.target.value }
                  } : null)}
                  placeholder="Enter business address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={settings?.businessInfo.description || ''}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    businessInfo: { ...prev.businessInfo, description: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your business"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Settings Tab */}
        {activeTab === 'delivery' && (
          <Card>
            <CardHeader>
              <CardTitle>Delivery Settings</CardTitle>
              <CardDescription>Configure your delivery preferences and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Max Delivery Distance (km)</label>
                  <Input
                    type="number"
                    value={settings?.deliverySettings.maxDistance || 0}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      deliverySettings: { ...prev.deliverySettings, maxDistance: parseInt(e.target.value) }
                    } : null)}
                    placeholder="Enter max distance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Time (minutes)</label>
                  <Input
                    type="number"
                    value={settings?.deliverySettings.deliveryTime || 0}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      deliverySettings: { ...prev.deliverySettings, deliveryTime: parseInt(e.target.value) }
                    } : null)}
                    placeholder="Enter delivery time"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-accept Orders</h4>
                    <p className="text-sm text-gray-600">Automatically accept orders within your criteria</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings?.deliverySettings.autoAccept || false}
                      onChange={(e) => setSettings(prev => prev ? {
                        ...prev,
                        deliverySettings: { ...prev.deliverySettings, autoAccept: e.target.checked }
                      } : null)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email updates about order status</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings?.deliverySettings.notifications || false}
                      onChange={(e) => setSettings(prev => prev ? {
                        ...prev,
                        deliverySettings: { ...prev.deliverySettings, notifications: e.target.checked }
                      } : null)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Current Plan</h3>
                    <p className="text-gray-600">{settings?.billing.plan} Plan</p>
                  </div>
                  <Badge variant="success">{settings?.billing.plan}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Rate per delivery:</span>
                    <span className="font-medium ml-2">{settings?.billing.currency} {settings?.billing.rate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Next billing:</span>
                    <span className="font-medium ml-2">{settings?.billing.nextBilling}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={handleUpgradePlan}>
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Security</CardTitle>
              <CardDescription>Manage your API keys and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">API Keys</h3>
                  <p className="text-sm text-gray-600">Manage your API access keys</p>
                </div>
                <Button onClick={() => setShowApiModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </div>
              
              <div className="space-y-4">
                {settings?.apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Key className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{apiKey.name}</span>
                          <Badge variant="outline">{apiKey.key}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Created: {apiKey.created} | Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: 'order_updates', label: 'Order Status Updates', description: 'Get notified when order status changes' },
                  { id: 'delivery_alerts', label: 'Delivery Alerts', description: 'Receive alerts for delivery issues' },
                  { id: 'payment_notifications', label: 'Payment Notifications', description: 'Get notified about payments and billing' },
                  { id: 'system_updates', label: 'System Updates', description: 'Receive important system announcements' }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{notification.label}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>

        {/* Create API Key Modal */}
        <Modal open={showApiModal} onOpenChange={setShowApiModal}>
          <ModalHeader onClose={() => setShowApiModal(false)}>
            <CardTitle>Create API Key</CardTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Key Name</label>
                <Input placeholder="Enter a descriptive name for this key" />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> API keys provide full access to your account. 
                  Keep them secure and never share them publicly.
                </p>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowApiModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateApiKey}>
              Create Key
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  )
}
