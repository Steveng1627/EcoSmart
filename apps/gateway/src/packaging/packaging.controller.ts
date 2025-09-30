import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { Packaging } from "@ecosmart/types";
import { PackagingService } from "./packaging.service";

@Controller("api/packaging")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PackagingController {
  constructor(private readonly packagingService: PackagingService) {}

  @Get()
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getPackaging(): Promise<Packaging[]> {
    return this.packagingService.getAllPackaging();
  }
}
