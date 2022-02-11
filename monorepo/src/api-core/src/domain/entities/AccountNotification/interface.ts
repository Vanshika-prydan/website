import { IAccount } from '../Account';

export const ACCOUNT_NOTIFICATION_INTERFACE = 'IAccountNotification';
export interface IAccountNotification {
    accountNotificationId: string;
    account: IAccount;
    token: string;
    createdAt?: Date;
}
