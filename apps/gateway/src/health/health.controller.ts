import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "ecosmart-gateway",
      version: "1.0.0",
    };
  }
}
