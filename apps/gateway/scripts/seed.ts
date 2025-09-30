import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { OrdersService } from '../src/orders/orders.service';
import { CreateOrderRequest } from '@ecosmart/types';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ordersService = app.get(OrdersService);

  console.log('🌱 Seeding database with demo data...');

  // Create demo merchants
  const merchants = [
    {
      id: 'merchant-1',
      name: 'Green Grocer Co.',
      tier: 'PREMIUM',
      billing: { plan: 'premium', rate: 0.15, currency: 'USD' }
    },
    {
      id: 'merchant-2', 
      name: 'Eco Restaurant',
      tier: 'BASIC',
      billing: { plan: 'basic', rate: 0.20, currency: 'USD' }
    }
  ];

  // Create demo orders
  const demoOrders: CreateOrderRequest[] = [
    {
      merchantId: 'merchant-1',
      customer: {
        name: 'John Doe',
        phone: '+65 9123 4567',
        email: 'john@example.com'
      },
      items: [
        {
          name: 'Organic Vegetables',
          weight: 2.5,
          dimensions: { length: 30, width: 20, height: 15 }
        }
      ],
      pickup: {
        address: '123 Green Street, Singapore 123456',
        coordinates: { lat: 1.3521, lng: 103.8198 },
        contact: '+65 6123 4567',
        instructions: 'Ring doorbell twice'
      },
      dropoff: {
        address: '456 Eco Avenue, Singapore 654321',
        coordinates: { lat: 1.2966, lng: 103.7764 },
        contact: '+65 6789 0123',
        instructions: 'Leave at front door if no answer'
      },
      packagingType: 'REUSABLE_BOX',
      mode: 'BIKE'
    },
    {
      merchantId: 'merchant-2',
      customer: {
        name: 'Jane Smith',
        phone: '+65 9876 5432',
        email: 'jane@example.com'
      },
      items: [
        {
          name: 'Fresh Salad Bowl',
          weight: 0.8,
          dimensions: { length: 25, width: 25, height: 10 }
        }
      ],
      pickup: {
        address: '789 Restaurant Row, Singapore 789012',
        coordinates: { lat: 1.3048, lng: 103.8318 },
        contact: '+65 6234 5678'
      },
      dropoff: {
        address: '321 Office Tower, Singapore 321098',
        coordinates: { lat: 1.2804, lng: 103.8503 },
        contact: '+65 6456 7890'
      },
      packagingType: 'BIODEGRADABLE_BAG',
      mode: 'DRONE'
    }
  ];

  // Create orders
  for (const orderData of demoOrders) {
    try {
      const order = await ordersService.createOrder(orderData);
      console.log(`✅ Created order ${order.id} for ${order.customer.name}`);
    } catch (error) {
      console.error(`❌ Failed to create order:`, error.message);
    }
  }

  console.log('🎉 Seeding completed!');
  await app.close();
}

seed().catch(console.error);
