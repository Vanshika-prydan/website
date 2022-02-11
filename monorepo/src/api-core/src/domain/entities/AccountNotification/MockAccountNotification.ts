import { v4 } from 'uuid';
import { IAccount } from '../Account';
import MockAccount from '../Account/mock-account';
import { IAccountNotification } from './interface';

export default class MockAccountNotification implements IAccountNotification {
    accountNotificationId: string;
    account: IAccount;
    token: string;
    createdAt?: Date | undefined;

    constructor (d: Partial<IAccountNotification> = {}) {
      this.accountNotificationId = d.accountNotificationId ?? v4();
      this.account = d.account ?? new MockAccount();
      this.token = d.token ?? 'tokenString';
      this.createdAt = d.createdAt ?? new Date();
    }
}
