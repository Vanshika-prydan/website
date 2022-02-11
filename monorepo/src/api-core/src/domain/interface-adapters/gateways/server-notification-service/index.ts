export const SERVER_NOTIFICATION_SERVICE = 'SERVER_NOTIFICATION_SERVICE';

export type Level = 'ERROR' | 'INFO' | 'WARN';

export interface ServerNotificationService {
    send(message: string, level?: Level):Promise<void>;
}
