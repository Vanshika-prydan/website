import { addMinutes } from 'date-fns';
import EmployeeEmailerFacade from '.';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmailService from '../../../services/email-service';

describe('Employee emailer facade', () => {
  it('Should call the send function one time', async () => {
    const bookingToday = new MockBooking({ startTime: new Date(), endTime: addMinutes(new Date(), 120) });
    const anotherBooking = new MockBooking();
    const bookings = [bookingToday, anotherBooking];
    // @ts-ignore
    const emailService: EmailService = { send: jest.fn(() => Promise.resolve()) };
    // @ts-ignore
    const bookingRepository: IBookingRepository = { getAll: jest.fn(() => Promise.resolve(bookings)) };

    await new EmployeeEmailerFacade(emailService, bookingRepository).execute();

    expect(emailService.send).toHaveBeenCalledTimes(1);

    expect(emailService.send).toHaveBeenCalledWith(bookingToday.employee.account.email, expect.any(String), expect.any(String));
  });
});
