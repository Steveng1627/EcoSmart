import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { Report } from "@ecosmart/types";
import { ReportingService } from "./reporting.service";

@Controller("api/reports")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get("co2e")
  @Roles("admin", "ops", "merchant_admin", "merchant_ops", "viewer")
  async getCO2Report(
    @Query("merchantId") merchantId?: string,
  ): Promise<Report> {
    return this.reportingService.getCO2Report(merchantId);
  }
}
