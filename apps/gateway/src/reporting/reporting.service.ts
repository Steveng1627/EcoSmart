import { Injectable } from "@nestjs/common";
import { Report } from "@ecosmart/types";

@Injectable()
export class ReportingService {
  async getCO2Report(merchantId?: string): Promise<Report> {
    // Mock data
    return {
      id: "report-1",
      merchantId: merchantId || "merchant-1",
      period: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date(),
      },
      kpis: {
        totalOrders: 150,
        onTimeDelivery: 95.5,
        averageDeliveryTime: 25.3,
        fleetUtilization: 78.2,
        energyEfficiency: 85.7,
      },
      co2e: 1250.5, // grams CO2 equivalent
      createdAt: new Date(),
    };
  }
}
