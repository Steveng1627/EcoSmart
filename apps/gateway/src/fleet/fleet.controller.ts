import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { Asset } from "@ecosmart/types";
import { FleetService } from "./fleet.service";

@Controller("api/fleet")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Get("assets")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getAssets(): Promise<Asset[]> {
    return this.fleetService.getAllAssets();
  }
}
