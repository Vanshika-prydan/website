import { format, isTomorrow } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import SendNotificationUseCase from '../../notifications/send-notification';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

@injectable()
export default class SendUpcomingBookingNotificationUseCase {
  constructor (
        @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
        private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async execute ():Promise<void> {
    const allBookings = await this.bookingRepository.getAll();
    const bookingsTomorrow = allBookings.filter(b => isTomorrow(b.startTime));

    bookingsTomorrow.forEach(b => {
      const notification = { title: 'I morgon städar vi!', message: `I morgon kl ${format(b.startTime, 'HH:mm')} kommer ${b.employee.account.firstName} ${b.employee.account.lastName.substr(0, 1)} och städar. Vill du lägga till någon extratjänst eller ändra något? Öppna appen för att se mer...` };
      const account = b.customer.account;
      this.sendNotificationUseCase.execute({ account, notification });
    });
  }
}
