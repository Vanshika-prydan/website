import { addDays } from 'date-fns';
import CancelBookingUseCase from '.';
import { ErrorCode } from '../../../entities/ErrorCode';
import { IBooking } from '../../../entities/Booking';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

describe('Cancel booking', () => {
  let usecase :CancelBookingUseCase;
  let bookingRepository: IBookingRepository;

  let mockBooking: IBooking;
  let idOfExecutingAccount:string;
  let payload:string;
  let result: IBooking;

  beforeEach(async () => {
    mockBooking = new MockBooking({ startTime: addDays(new Date(), 3), cancelledAt: undefined });
    idOfExecutingAccount = mockBooking.customer.account.accountId;
    payload = mockBooking.bookingId;
    // @ts-ignore
    bookingRepository = { getById: jest.fn(() => Promise.resolve(mockBooking)), save: jest.fn(() => Promise.resolve(mockBooking)) };
    usecase = new CancelBookingUseCase(bookingRepository);
    result = await usecase.execute({ payload, idOfExecutingAccount });
  });
  it('Should load the booking', async () => {
    expect(bookingRepository.getById).toHaveBeenCalledWith(payload);
  });
  it('should save the booking', () => {
    expect(bookingRepository.save).toHaveBeenCalled();
  });
  it('should return the booking with a timestamp ', () => {
    expect(result.cancelledAt).toEqual(expect.any(Date));
  });

  it('should throw an error if the booking have passed', async () => {
    mockBooking = new MockBooking({ startTime: addDays(new Date(), -10) });
    // @ts-ignore
    bookingRepository = { getById: jest.fn(() => Promise.resolve(mockBooking)), save: jest.fn(() => Promise.resolve(mockBooking)) };
    usecase = new CancelBookingUseCase(bookingRepository);
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.DATETIME_ERROR);
  });
});
