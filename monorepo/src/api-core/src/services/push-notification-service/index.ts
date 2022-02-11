import { injectable } from 'tsyringe';
import { PushNotificationGatewayInterface } from '../../domain/interface-adapters/gateways/push-notification-gateway';
import { Expo } from 'expo-server-sdk';
import { ErrorCode } from '../../domain/entities/ErrorCode';

process.env.EXPO_ACCESS_TOKEN = '4fsGEKa8pejnOkRqq0uJy3OAxTmos-234Yw5yL68';

@injectable()
export default class PushNotificationService implements PushNotificationGatewayInterface {
  async sendNotification (token: string, title: string, message: string, json?: Object): Promise<void> {
    const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

    if (!Expo.isExpoPushToken(token)) throw new Error(ErrorCode.INVALID_INPUT);

    const msg = {
      to: token,
      title,
      body: message,
      data: json,
      ttl: 3600 * 60,
    };
    await expo.sendPushNotificationsAsync([msg]);
  }
}
