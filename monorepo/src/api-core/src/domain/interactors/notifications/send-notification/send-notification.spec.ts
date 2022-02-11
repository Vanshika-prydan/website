import SendNotificationUseCase, { Notification } from '.';
import MockAccount from '../../../entities/Account/mock-account';
import MockAccountNotification from '../../../entities/AccountNotification/MockAccountNotification';
import { PushNotificationGatewayInterface } from '../../../interface-adapters/gateways/push-notification-gateway';
import { AccountNotificationRepositoryInterface } from '../../../interface-adapters/repositories/account-notifiaction-repository';

describe('send-notification-use-case', () => {
  const account = new MockAccount();
  const mockAccountNotification = new MockAccountNotification();
  // ts-ignore
  const pushNotificationGateway: PushNotificationGatewayInterface = {
    sendNotification: jest.fn(() => Promise.resolve()),
  };
    // @ts-ignore
  const accountNotificationRepository: AccountNotificationRepositoryInterface = {
    fetchByAccount: jest.fn(() => Promise.resolve([mockAccountNotification])),
  };

  const notification :Notification = { title: 'Title', message: 'Message' };

  it('should send a notification to the user', async () => {
    await new SendNotificationUseCase(accountNotificationRepository, pushNotificationGateway).execute({ notification, account });
    expect(pushNotificationGateway.sendNotification).toHaveBeenCalledWith(mockAccountNotification.token, 'Title', 'Message', undefined);
    expect(pushNotificationGateway.sendNotification).toHaveBeenCalledTimes(1);
  });
});
