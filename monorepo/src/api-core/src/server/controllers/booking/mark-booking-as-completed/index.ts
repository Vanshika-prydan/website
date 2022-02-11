import { container } from 'tsyringe';
import CompleteBookingUseCase from '../../../../domain/interactors/bookings/complete-booking';
import { PUSH_NOTIFICATION_GATEWAY } from '../../../../domain/interface-adapters/gateways/push-notification-gateway';
import { ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-notifiaction-repository';
import { ACCOUNT_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-repository';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import { EMAIL_PROVIDER_INTERFACE } from '../../../../domain/services/email-service';
import PushNotificationService from '../../../../services/push-notification-service';
import AccountNotificationRepository from '../../../../repositories/account-notification-repository';
import AccountRepository from '../../../../repositories/account-respository';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import { buildMarkBookingAsCompletedController } from './mark-booking-as-completed.controller';
import AWSSes from '../../../../services/email-service/aws-ses';

container.register(ACCOUNT_REPOSITORY_INTERFACE, { useClass: AccountRepository })
  .register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository })
  .register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes })
  .register(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE, { useClass: AccountNotificationRepository })
  .register(PUSH_NOTIFICATION_GATEWAY, { useClass: PushNotificationService });

const completeBookingFacade = container.resolve(CompleteBookingUseCase);

const markBookingAsCompletedController = buildMarkBookingAsCompletedController(completeBookingFacade);
export default markBookingAsCompletedController;
