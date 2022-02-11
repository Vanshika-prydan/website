import { inject, injectable } from 'tsyringe';
import { IAccount } from '../../../entities/Account';
import { PushNotificationGatewayInterface, PUSH_NOTIFICATION_GATEWAY } from '../../../interface-adapters/gateways/push-notification-gateway';
import { AccountNotificationRepositoryInterface, ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/account-notifiaction-repository';

export interface Notification {
    title:string;
    message:string;
    json?:Object;
  }

@injectable()
export default class SendNotificationUseCase {
  constructor (
        @inject(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE) private readonly accountNotificationRepository: AccountNotificationRepositoryInterface,
        @inject(PUSH_NOTIFICATION_GATEWAY) private readonly pushNotificationGateway: PushNotificationGatewayInterface,
  ) {}

  async execute ({ notification, account }: { notification: Notification; account: IAccount ; }): Promise<void> {
    const accountNotifications = await this.accountNotificationRepository.fetchByAccount(account.accountId);

    const promises:Promise<void>[] = [];
    accountNotifications.forEach(a => promises.push(this.pushNotificationGateway.sendNotification(
      a.token,
      notification.title,
      notification.message,
      notification.json,
    )));
    await Promise.all(promises);
  }
}
