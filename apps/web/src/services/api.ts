// API service layer for EcoSmart application

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Orders API
  async getOrders(params?: {
    merchantId?: string
    status?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params?.merchantId) queryParams.set('merchantId', params.merchantId)
    if (params?.status) queryParams.set('status', params.status)
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    
    const query = queryParams.toString()
    return this.request(`/api/orders${query ? `?${query}` : ''}`)
  }

  async getOrder(id: string) {
    return this.request(`/api/orders/${id}`)
  }

  async createOrder(orderData: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async dispatchOrder(id: string) {
    return this.request(`/api/orders/${id}/dispatch`, {
      method: 'POST',
    })
  }

  async cancelOrder(id: string) {
    return this.request(`/api/orders/${id}/cancel`, {
      method: 'POST',
    })
  }

  // Assets API
  async getAssets(params?: {
    type?: string
    lat?: number
    lng?: number
    radius?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.set('type', params.type)
    if (params?.lat) queryParams.set('lat', params.lat.toString())
    if (params?.lng) queryParams.set('lng', params.lng.toString())
    if (params?.radius) queryParams.set('radius', params.radius.toString())
    
    const query = queryParams.toString()
    return this.request(`/api/fleet/assets${query ? `?${query}` : ''}`)
  }

  // Routing API
  async planRoute(routeData: {
    pickup: { lat: number; lng: number }
    dropoff: { lat: number; lng: number }
    constraints?: any
  }) {
    return this.request('/api/routing/plan', {
      method: 'POST',
      body: JSON.stringify(routeData),
    })
  }

  // Reporting API
  async getCO2Report(merchantId?: string, period?: string) {
    const queryParams = new URLSearchParams()
    if (merchantId) queryParams.set('merchantId', merchantId)
    if (period) queryParams.set('period', period)
    
    const query = queryParams.toString()
    return this.request(`/api/reports/co2e${query ? `?${query}` : ''}`)
  }

  // Notifications API
  async sendNotification(notificationData: {
    type: 'email' | 'sms' | 'push'
    recipient: string
    subject: string
    message: string
  }) {
    return this.request('/api/notifications/send', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }
}

export const apiService = new ApiService()
export default apiService
