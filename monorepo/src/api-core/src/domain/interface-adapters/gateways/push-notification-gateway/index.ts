
export const PUSH_NOTIFICATION_GATEWAY = 'PushNotificationGatewayInterface';
export interface PushNotificationGatewayInterface {
    sendNotification(token: String, title: string, message: string, json?:Object): Promise<void>;
}
