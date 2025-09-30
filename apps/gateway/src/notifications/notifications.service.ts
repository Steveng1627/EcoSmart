import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  async sendNotification(notificationDto: {
    type: "email" | "sms" | "push";
    recipient: string;
    subject: string;
    message: string;
  }) {
    // Mock notification sending
    console.log(
      `Sending ${notificationDto.type} notification to ${notificationDto.recipient}: ${notificationDto.subject}`,
    );

    return {
      success: true,
      messageId: `msg-${Date.now()}`,
      sentAt: new Date(),
    };
  }
}
