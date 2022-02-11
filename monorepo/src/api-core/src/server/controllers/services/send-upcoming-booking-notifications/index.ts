import { container } from 'tsyringe';
import SendUpcomingBookingNotificationUseCase from '../../../../domain/interactors/services/upcoming-booking-notification';
import { PUSH_NOTIFICATION_GATEWAY } from '../../../../domain/interface-adapters/gateways/push-notification-gateway';
import { ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/account-notifiaction-repository';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import PushNotificationService from '../../../../services/push-notification-service';
import AccountNotificationRepository from '../../../../repositories/account-notification-repository';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import buildSendUpcomingBookingNotificationsController from './controller';

container
  .register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository })
  .register(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE, { useClass: AccountNotificationRepository })
  .register(PUSH_NOTIFICATION_GATEWAY, { useClass: PushNotificationService });
const upcomingBookingNotificationFacade = container.resolve(SendUpcomingBookingNotificationUseCase);

const sendUpcomingBookingNotificationsController = buildSendUpcomingBookingNotificationsController(upcomingBookingNotificationFacade);

export default sendUpcomingBookingNotificationsController;
