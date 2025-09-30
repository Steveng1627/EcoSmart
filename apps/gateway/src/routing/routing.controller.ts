import { Controller, Post, Body, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { RoutePlanRequest, RoutePlanResponse, Asset } from "@ecosmart/types";
import { RoutingService } from "./routing.service";

@Controller("api/routing")
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}

  @Post("plan")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops")
  async planRoute(
    @Body() routePlanDto: RoutePlanRequest,
  ): Promise<RoutePlanResponse> {
    return this.routingService.planRoute(routePlanDto);
  }

  @Get("assets")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getAvailableAssets(
    @Query("type") type?: string,
    @Query("lat") lat?: number,
    @Query("lng") lng?: number,
    @Query("radius") radius?: number,
  ): Promise<Asset[]> {
    return this.routingService.getAvailableAssets({ type, lat, lng, radius });
  }
}
