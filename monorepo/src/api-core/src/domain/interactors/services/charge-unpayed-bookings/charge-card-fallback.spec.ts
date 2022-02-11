import ChargeUnpaidBookingsUseCase from '.';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import ChargeBookingUseCase from '../../bookings/charge-booking/charge-booking';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

describe('ChargeUnpayedBookings', () => {
  it('should charge one card of the list', async () => {
    const unpayedBooking = new MockBooking({ paymentCompleted: false, completed: true });
    const unfinishedBooking = new MockBooking();
    const completedBooking = new MockBooking({ paymentCompleted: true, completed: true });

    const bookings = [completedBooking, unfinishedBooking, unpayedBooking];

    // @ts-ignore
    const bookingRepository: IBookingRepository = { getAll: jest.fn(() => Promise.resolve(bookings)) };

    // @ts-ignore
    const chargeBookingUseCase: ChargeBookingUseCase = { execute: jest.fn(() => Promise.resolve(completedBooking)) };

    await new ChargeUnpaidBookingsUseCase(bookingRepository, chargeBookingUseCase).execute();

    expect(chargeBookingUseCase.execute).toBeCalledWith(unpayedBooking);
  });
});
