import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@ecosmart/types";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    // Mock user validation - replace with real authentication
    const mockUsers: User[] = [
      {
        id: "1",
        merchantId: "merchant-1",
        role: "admin",
        email: "admin@ecosmart.com",
        name: "Admin User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        merchantId: "merchant-1",
        role: "merchant_admin",
        email: "merchant@ecosmart.com",
        name: "Merchant Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const user = mockUsers.find((u) => u.email === email);
    if (user && password === "password") {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      merchantId: user.merchantId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateJwtPayload(payload: any): Promise<User | null> {
    // Mock user lookup by ID
    const mockUsers: User[] = [
      {
        id: "1",
        merchantId: "merchant-1",
        role: "admin",
        email: "admin@ecosmart.com",
        name: "Admin User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        merchantId: "merchant-1",
        role: "merchant_admin",
        email: "merchant@ecosmart.com",
        name: "Merchant Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return mockUsers.find((u) => u.id === payload.sub) || null;
  }
}
