export interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  accessiblePages: string[]
  features: string[]
}

export const USER_ROLES: Record<string, UserRole> = {
  admin: {
    id: 'admin',
    name: 'System Administrator',
    description: 'Full platform access with all permissions',
    permissions: [
      'platform.manage',
      'users.manage',
      'merchants.manage',
      'operations.manage',
      'analytics.view',
      'settings.manage',
      'billing.manage'
    ],
    accessiblePages: [
      '/dashboard',
      '/merchant',
      '/merchant/reports',
      '/merchant/settings',
      '/ops',
      '/ops/fleet',
      '/ops/orders',
      '/ops/incidents',
      '/tracking'
    ],
    features: [
      'dashboard',
      'merchant_portal',
      'operations_console',
      'analytics',
      'user_management',
      'system_settings'
    ]
  },
  merchant_admin: {
    id: 'merchant_admin',
    name: 'Merchant Administrator',
    description: 'Full merchant account management',
    permissions: [
      'orders.manage',
      'reports.view',
      'settings.manage',
      'analytics.view'
    ],
    accessiblePages: [
      '/merchant',
      '/merchant/reports',
      '/merchant/settings'
    ],
    features: [
      'order_management',
      'analytics',
      'settings'
    ]
  },
  merchant_ops: {
    id: 'merchant_ops',
    name: 'Merchant Operations',
    description: 'Order management and basic operations',
    permissions: [
      'orders.manage',
      'reports.view'
    ],
    accessiblePages: [
      '/merchant',
      '/merchant/reports'
    ],
    features: [
      'order_management',
      'analytics'
    ]
  },
  ops: {
    id: 'ops',
    name: 'Operations Manager',
    description: 'Fleet and delivery operations management',
    permissions: [
      'fleet.manage',
      'orders.manage',
      'incidents.manage',
      'analytics.view'
    ],
    accessiblePages: [
      '/ops',
      '/ops/fleet',
      '/ops/orders',
      '/ops/incidents'
    ],
    features: [
      'fleet_management',
      'order_dispatch',
      'incident_management',
      'operations_analytics'
    ]
  },
  viewer: {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to basic information',
    permissions: [
      'analytics.view'
    ],
    accessiblePages: [
      '/dashboard'
    ],
    features: [
      'basic_analytics'
    ]
  }
}

export function hasPermission(userRole: string, permission: string): boolean {
  const role = USER_ROLES[userRole]
  return role ? role.permissions.includes(permission) : false
}

export function canAccessPage(userRole: string, page: string): boolean {
  const role = USER_ROLES[userRole]
  return role ? role.accessiblePages.includes(page) : false
}

export function getRoleFeatures(userRole: string): string[] {
  const role = USER_ROLES[userRole]
  return role ? role.features : []
}
