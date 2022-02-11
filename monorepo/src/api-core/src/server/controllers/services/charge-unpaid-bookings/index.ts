import { container } from 'tsyringe';
import ChargeUnpaidBookingsUseCase from '../../../../domain/interactors/services/charge-unpayed-bookings';
import buildChargeUnpaidBookingsController from './controller';

import { PUSH_NOTIFICATION_GATEWAY } from '../../../../domain/interface-adapters/gateways/push-notification-gateway';
import { ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-notifiaction-repository';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import { EMAIL_PROVIDER_INTERFACE } from '../../../../domain/services/email-service';
import PushNotificationService from '../../../../services/push-notification-service';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import AccountNotificationRepository from '../../../../repositories/account-notification-repository';
import AWSSes from '../../../../services/email-service/aws-ses';

container
  .register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository })
  .register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes })
  .register(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE, { useClass: AccountNotificationRepository })
  .register(PUSH_NOTIFICATION_GATEWAY, { useClass: PushNotificationService });

const chargeCardFallbackFacade = container.resolve(ChargeUnpaidBookingsUseCase);

const chargeUnpaidBookingsController = buildChargeUnpaidBookingsController(chargeCardFallbackFacade);

export default chargeUnpaidBookingsController;
