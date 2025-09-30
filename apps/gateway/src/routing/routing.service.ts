import { Injectable } from "@nestjs/common";
import {
  RoutePlanRequest,
  RoutePlanResponse,
  Asset,
  DeliveryMode,
} from "@ecosmart/types";

@Injectable()
export class RoutingService {
  private assets: Map<string, Asset> = new Map();

  constructor() {
    this.initializeMockAssets();
  }

  async planRoute(routePlanDto: RoutePlanRequest): Promise<RoutePlanResponse> {
    const { pickup, dropoff, constraints } = routePlanDto;

    // Calculate distance and duration (simplified)
    const distance = this.calculateDistance(
      pickup.lat,
      pickup.lng,
      dropoff.lat,
      dropoff.lng,
    );
    const duration = this.calculateDuration(distance);
    const energy = this.calculateEnergy(distance);
    const gco2e = this.calculateCO2(distance);

    // Determine optimal mode based on distance and constraints
    const mode = this.determineOptimalMode(distance, constraints);

    const route = {
      id: this.generateId(),
      orderId: "", // Will be set when order is created
      legs: [
        {
          mode,
          distance,
          duration,
          energy,
          coordinates: [
            { lat: pickup.lat, lng: pickup.lng },
            { lat: dropoff.lat, lng: dropoff.lng },
          ],
        },
      ],
      totalDistance: distance,
      totalEnergy: energy,
      gco2e,
      createdAt: new Date(),
    };

    const eta = new Date(Date.now() + duration * 60 * 1000);

    return {
      route,
      eta,
      energy,
      gco2e,
      legs: route.legs,
    };
  }

  async getAvailableAssets(filters: {
    type?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  }): Promise<Asset[]> {
    let filteredAssets = Array.from(this.assets.values());

    if (filters.type) {
      filteredAssets = filteredAssets.filter(
        (asset) => asset.type === filters.type,
      );
    }

    if (filters.lat && filters.lng && filters.radius) {
      filteredAssets = filteredAssets.filter((asset) => {
        const distance = this.calculateDistance(
          filters.lat!,
          filters.lng!,
          asset.geo.lat,
          asset.geo.lng,
        );
        return distance <= filters.radius!;
      });
    }

    return filteredAssets.filter((asset) => asset.status === "ACTIVE");
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private calculateDuration(distance: number): number {
    // Simplified: 30 km/h average speed
    return (distance / 30) * 60; // minutes
  }

  private calculateEnergy(distance: number): number {
    // Simplified: 0.1 kWh per km
    return distance * 0.1;
  }

  private calculateCO2(distance: number): number {
    // Simplified: 50g CO2 per km for electric vehicles
    return distance * 50;
  }

  private determineOptimalMode(
    distance: number,
    constraints?: any,
  ): DeliveryMode {
    if (constraints?.preferredMode) {
      return constraints.preferredMode;
    }

    // Simple logic: bikes for short distances, drones for longer ones
    if (distance <= 5) return "BIKE";
    if (distance <= 15) return "DRONE";
    return "HYBRID";
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
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
        id: "bike-2",
        type: "BIKE",
        serial: "BIKE-002",
        status: "ACTIVE",
        soc: 92,
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
      {
        id: "drone-2",
        type: "DRONE",
        serial: "DRONE-002",
        status: "CHARGING",
        soc: 45,
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
