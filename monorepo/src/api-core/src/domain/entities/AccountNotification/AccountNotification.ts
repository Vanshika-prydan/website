import { v4 } from 'uuid';
import { Optional } from '../../../types/optional';
import Account from '../Account';
import { IAccountNotification } from './interface';

export class AccountNotification implements IAccountNotification {
  readonly accountNotificationId: string;
  readonly account: Account;
  readonly token: string;
  readonly createdAt?: Date ;

  constructor (data:Optional<IAccountNotification, 'accountNotificationId'>) {
    this.accountNotificationId = data.accountNotificationId ?? v4();
    this.account = new Account(data.account);
    this.token = data.token;
    this.createdAt = data.createdAt;
  }
}
