import { addDays } from 'date-fns';
import SendUpcomingBookingNotificationUseCase from '.';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import SendNotificationUseCase from '../../notifications/send-notification';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

describe('Uppcoming booking nitification facade', () => {
  it('should call the notification service one time with a booking tomorrow', async () => {
    const bookingTomorrow = new MockBooking({ startTime: addDays(new Date(), 1) });
    const anotherBooking = new MockBooking({ startTime: addDays(new Date(), 3) });

    // @ts-ignore
    const bookingRepository: IBookingRepository = { getAll: jest.fn(() => Promise.resolve([anotherBooking, bookingTomorrow])) };
    // @ts-ignore
    const sendNotificationUseCase:SendNotificationUseCase = { execute: jest.fn(() => Promise.resolve()) };

    await new SendUpcomingBookingNotificationUseCase(bookingRepository, sendNotificationUseCase).execute();

    expect(sendNotificationUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
