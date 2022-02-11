import { container } from 'tsyringe';
import { PUSH_NOTIFICATION_GATEWAY } from '../../domain/interface-adapters/gateways/push-notification-gateway';
import SendNotificationUseCase from '../../domain/interactors/notifications/send-notification';
import { ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../domain/interface-adapters/repositories/account-notifiaction-repository';
import PushNotificationService from '../../services/push-notification-service';
import AccountNotificationRepository from '../../repositories/account-notification-repository';

container.register(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE, { useClass: AccountNotificationRepository })
  .register(PUSH_NOTIFICATION_GATEWAY, { useClass: PushNotificationService });

const sendNotificationUseCase = container.resolve(SendNotificationUseCase);

export default sendNotificationUseCase;
