import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  status: 'CREATED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED' | 'RETURNED'
  mode: 'BIKE' | 'DRONE' | 'HYBRID'
  eta?: string
  createdAt: string
}

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
}

interface AppState {
  // Orders
  orders: Order[]
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  
  // Assets
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
  updateAsset: (id: string, updates: Partial<Asset>) => void
  
  // UI State
  loading: boolean
  setLoading: (loading: boolean) => void
  
  // Filters
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  
  // Auto-refresh
  autoRefresh: boolean
  setAutoRefresh: (enabled: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Orders
      orders: [],
      setOrders: (orders) => set({ orders }),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrder: (id, updates) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, ...updates } : order
        )
      })),
      
      // Assets
      assets: [],
      setAssets: (assets) => set({ assets }),
      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(asset => 
          asset.id === id ? { ...asset, ...updates } : asset
        )
      })),
      
      // UI State
      loading: false,
      setLoading: (loading) => set({ loading }),
      
      // Filters
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),
      statusFilter: 'all',
      setStatusFilter: (status) => set({ statusFilter: status }),
      
      // Auto-refresh
      autoRefresh: true,
      setAutoRefresh: (enabled) => set({ autoRefresh: enabled }),
    }),
    {
      name: 'ecosmart-store',
    }
  )
)
