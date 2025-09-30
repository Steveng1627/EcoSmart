import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CreateOrderRequest, Order, OrderStatus } from "@ecosmart/types";
import { OrdersService } from "./orders.service";

@Controller("api/orders")
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles("merchant_admin", "merchant_ops", "admin")
  async createOrder(
    @Body() createOrderDto: CreateOrderRequest,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(":id")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getOrder(@Param("id") id: string): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Get()
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getOrders(
    @Query("merchantId") merchantId?: string,
    @Query("status") status?: OrderStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ): Promise<{ orders: Order[]; total: number; page: number; limit: number }> {
    return this.ordersService.getOrders({ merchantId, status, page, limit });
  }

  @Post(":id/dispatch")
  @Roles("admin", "ops", "merchant_admin")
  async dispatchOrder(@Param("id") id: string): Promise<Order> {
    return this.ordersService.dispatchOrder(id);
  }

  @Post(":id/cancel")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops")
  async cancelOrder(@Param("id") id: string): Promise<Order> {
    return this.ordersService.cancelOrder(id);
  }

  @Post(":id/events/webhook")
  async webhookEvent(
    @Param("id") id: string,
    @Body() eventData: { status: OrderStatus; message: string; metadata?: any },
  ): Promise<{ success: boolean }> {
    return this.ordersService.handleWebhookEvent(id, eventData);
  }
}
