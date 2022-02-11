import { container } from 'tsyringe';
import RegisterAccountDeviceUseCase from '../../../../domain/interactors/notifications/register-account-device';
import { ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-notifiaction-repository';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import AccountNotificationRepository from '../../../../repositories/account-notification-repository';
import AccountRepository from '../../../../repositories/account-respository';
import { buildRegisterDeviceController } from './controller';

container.register(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE, { useClass: AccountNotificationRepository })
  .register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository });
const registerAccountDeviceUseCase = container.resolve(RegisterAccountDeviceUseCase);

const registerDeviceController = buildRegisterDeviceController(registerAccountDeviceUseCase);

export default registerDeviceController;
