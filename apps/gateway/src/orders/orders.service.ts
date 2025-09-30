import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateOrderRequest, Order, OrderStatus } from "@ecosmart/types";

@Injectable()
export class OrdersService {
  private orders: Map<string, Order> = new Map();

  async createOrder(createOrderDto: CreateOrderRequest): Promise<Order> {
    const order: Order = {
      id: this.generateId(),
      merchantId: createOrderDto.merchantId,
      customer: createOrderDto.customer,
      items: createOrderDto.items,
      pickup: createOrderDto.pickup,
      dropoff: createOrderDto.dropoff,
      weight: createOrderDto.items.reduce((sum, item) => sum + item.weight, 0),
      packagingType: createOrderDto.packagingType,
      status: "CREATED",
      mode: createOrderDto.mode || "HYBRID",
      eta: undefined,
      events: [
        {
          timestamp: new Date(),
          status: "CREATED",
          message: "Order created successfully",
          metadata: {},
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.set(order.id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getOrders(filters: {
    merchantId?: string;
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{ orders: Order[]; total: number; page: number; limit: number }> {
    let filteredOrders = Array.from(this.orders.values());

    if (filters.merchantId) {
      filteredOrders = filteredOrders.filter(
        (order) => order.merchantId === filters.merchantId,
      );
    }

    if (filters.status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === filters.status,
      );
    }

    const total = filteredOrders.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const orders = filteredOrders.slice(startIndex, endIndex);

    return { orders, total, page, limit };
  }

  async dispatchOrder(id: string): Promise<Order> {
    const order = await this.getOrder(id);

    if (order.status !== "CREATED") {
      throw new BadRequestException(
        `Cannot dispatch order in ${order.status} status`,
      );
    }

    order.status = "DISPATCHED";
    order.updatedAt = new Date();
    order.events.push({
      timestamp: new Date(),
      status: "DISPATCHED",
      message: "Order dispatched to fleet",
      metadata: {},
    });

    this.orders.set(id, order);
    return order;
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.getOrder(id);

    if (order.status === "DELIVERED" || order.status === "FAILED") {
      throw new BadRequestException(
        `Cannot cancel order in ${order.status} status`,
      );
    }

    order.status = "FAILED";
    order.updatedAt = new Date();
    order.events.push({
      timestamp: new Date(),
      status: "FAILED",
      message: "Order cancelled",
      metadata: {},
    });

    this.orders.set(id, order);
    return order;
  }

  async handleWebhookEvent(
    id: string,
    eventData: {
      status: OrderStatus;
      message: string;
      metadata?: any;
    },
  ): Promise<{ success: boolean }> {
    const order = await this.getOrder(id);

    order.status = eventData.status;
    order.updatedAt = new Date();
    order.events.push({
      timestamp: new Date(),
      status: eventData.status,
      message: eventData.message,
      metadata: eventData.metadata || {},
    });

    this.orders.set(id, order);
    return { success: true };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
