import { Injectable } from "@nestjs/common";
import { Asset } from "@ecosmart/types";

@Injectable()
export class FleetService {
  private assets: Map<string, Asset> = new Map();

  constructor() {
    this.initializeMockAssets();
  }

  async getAllAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  private initializeMockAssets(): void {
    const mockAssets: Asset[] = [
      {
        id: "bike-1",
        type: "BIKE",
        serial: "BIKE-001",
        status: "ACTIVE",
        soc: 85,
        lastSeen: new Date(),
        geo: { lat: 1.3521, lng: 103.8198 },
        metadata: { model: "E-Cargo Pro", capacity: 50 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "drone-1",
        type: "DRONE",
        serial: "DRONE-001",
        status: "ACTIVE",
        soc: 78,
        lastSeen: new Date(),
        geo: { lat: 1.3521, lng: 103.8198 },
        metadata: { model: "Delivery Drone X1", capacity: 5 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockAssets.forEach((asset) => {
      this.assets.set(asset.id, asset);
    });
  }
}
