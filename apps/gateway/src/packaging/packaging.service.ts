import { Injectable } from "@nestjs/common";
import { Packaging } from "@ecosmart/types";

@Injectable()
export class PackagingService {
  async getAllPackaging(): Promise<Packaging[]> {
    // Mock data
    return [
      {
        id: "pkg-1",
        type: "REUSABLE_BOX",
        cycles: 5,
        deposit: 10.0,
        state: "IN_USE",
        merchantId: "merchant-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "pkg-2",
        type: "BIODEGRADABLE_BAG",
        cycles: 1,
        deposit: 2.0,
        state: "RETURNED",
        merchantId: "merchant-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
