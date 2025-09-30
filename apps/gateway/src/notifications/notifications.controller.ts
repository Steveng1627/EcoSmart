import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { NotificationsService } from "./notifications.service";

@Controller("api/notifications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("send")
  @Roles("admin", "ops", "merchant_admin")
  async sendNotification(
    @Body()
    notificationDto: {
      type: "email" | "sms" | "push";
      recipient: string;
      subject: string;
      message: string;
    },
  ) {
    return this.notificationsService.sendNotification(notificationDto);
  }
}
