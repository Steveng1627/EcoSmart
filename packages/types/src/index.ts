import { z } from 'zod';

// Core Entity Schemas
export const MerchantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  tier: z.enum(['BASIC', 'PREMIUM', 'ENTERPRISE']),
  billing: z.object({
    plan: z.string(),
    rate: z.number(),
    currency: z.string()
  }),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  merchantId: z.string().uuid(),
  role: z.enum(['admin', 'ops', 'merchant_admin', 'merchant_ops', 'viewer']),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const OrderStatusSchema = z.enum([
  'CREATED',
  'DISPATCHED', 
  'IN_TRANSIT',
  'DELIVERED',
  'FAILED',
  'RETURNED',
  'CANCELLED'
]);

export const DeliveryModeSchema = z.enum(['BIKE', 'DRONE', 'HYBRID']);

export const OrderSchema = z.object({
  id: z.string().uuid(),
  merchantId: z.string().uuid(),
  customer: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email().optional()
  }),
  items: z.array(z.object({
    name: z.string(),
    weight: z.number(),
    dimensions: z.object({
      length: z.number(),
      width: z.number(),
      height: z.number()
    })
  })),
  pickup: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    contact: z.string(),
    instructions: z.string().optional()
  }),
  dropoff: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    contact: z.string(),
    instructions: z.string().optional()
  }),
  weight: z.number(),
  packagingType: z.enum(['REUSABLE_BOX', 'BIODEGRADABLE_BAG', 'STANDARD']),
  status: OrderStatusSchema,
  mode: DeliveryModeSchema,
  eta: z.date().optional(),
  events: z.array(z.object({
    timestamp: z.date(),
    status: OrderStatusSchema,
    message: z.string(),
    metadata: z.record(z.any()).optional()
  })),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const AssetTypeSchema = z.enum(['BIKE', 'DRONE', 'CHARGER', 'BOX']);

export const AssetSchema = z.object({
  id: z.string().uuid(),
  type: AssetTypeSchema,
  serial: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CHARGING']),
  soc: z.number().min(0).max(100), // State of Charge
  lastSeen: z.date(),
  geo: z.object({
    lat: z.number(),
    lng: z.number(),
    heading: z.number().optional()
  }),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const RouteSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  legs: z.array(z.object({
    mode: DeliveryModeSchema,
    distance: z.number(),
    duration: z.number(),
    energy: z.number(),
    coordinates: z.array(z.object({
      lat: z.number(),
      lng: z.number()
    }))
  })),
  totalDistance: z.number(),
  totalEnergy: z.number(),
  gco2e: z.number(),
  createdAt: z.date()
});

export const PackagingSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['REUSABLE_BOX', 'BIODEGRADABLE_BAG']),
  cycles: z.number(),
  deposit: z.number(),
  state: z.enum(['IN_USE', 'RETURNED', 'DAMAGED']),
  merchantId: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const ReportSchema = z.object({
  id: z.string().uuid(),
  merchantId: z.string().uuid(),
  period: z.object({
    start: z.date(),
    end: z.date()
  }),
  kpis: z.object({
    totalOrders: z.number(),
    onTimeDelivery: z.number(),
    averageDeliveryTime: z.number(),
    fleetUtilization: z.number(),
    energyEfficiency: z.number()
  }),
  co2e: z.number(),
  createdAt: z.date()
});

export const IncidentSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  type: z.enum(['MECHANICAL', 'WEATHER', 'TRAFFIC', 'SAFETY', 'OTHER']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  description: z.string(),
  notes: z.string().optional(),
  resolved: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// API Request/Response Schemas
export const CreateOrderRequestSchema = z.object({
  merchantId: z.string().uuid(),
  customer: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email().optional()
  }),
  items: z.array(z.object({
    name: z.string(),
    weight: z.number(),
    dimensions: z.object({
      length: z.number(),
      width: z.number(),
      height: z.number()
    })
  })),
  pickup: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    contact: z.string(),
    instructions: z.string().optional()
  }),
  dropoff: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    contact: z.string(),
    instructions: z.string().optional()
  }),
  packagingType: z.enum(['REUSABLE_BOX', 'BIODEGRADABLE_BAG', 'STANDARD']),
  mode: DeliveryModeSchema.optional()
});

export const RoutePlanRequestSchema = z.object({
  pickup: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  dropoff: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  constraints: z.object({
    maxDistance: z.number().optional(),
    maxDuration: z.number().optional(),
    preferredMode: DeliveryModeSchema.optional(),
    avoidTolls: z.boolean().optional(),
    avoidHighways: z.boolean().optional()
  }).optional()
});

export const RoutePlanResponseSchema = z.object({
  route: RouteSchema,
  eta: z.date(),
  energy: z.number(),
  gco2e: z.number(),
  legs: z.array(z.object({
    mode: DeliveryModeSchema,
    distance: z.number(),
    duration: z.number(),
    energy: z.number(),
    coordinates: z.array(z.object({
      lat: z.number(),
      lng: z.number()
    }))
  }))
});

// Type exports
export type Merchant = z.infer<typeof MerchantSchema>;
export type User = z.infer<typeof UserSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type DeliveryMode = z.infer<typeof DeliveryModeSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type AssetType = z.infer<typeof AssetTypeSchema>;
export type Route = z.infer<typeof RouteSchema>;
export type Packaging = z.infer<typeof PackagingSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type Incident = z.infer<typeof IncidentSchema>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
export type RoutePlanRequest = z.infer<typeof RoutePlanRequestSchema>;
export type RoutePlanResponse = z.infer<typeof RoutePlanResponseSchema>;
