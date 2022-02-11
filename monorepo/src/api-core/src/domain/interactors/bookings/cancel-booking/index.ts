import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { BookingFullyDefined } from '../../../entities/Booking';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

export type BookingId = string;

@injectable()
export default class CancelBookingUseCase implements IUseCase<BookingId, BookingFullyDefined> {
  constructor (
      @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: BookingId; idOfExecutingAccount: string; }): Promise<BookingFullyDefined> {
    const booking = await this.bookingRepository.getById(payload);
    if (!booking) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);

    if (booking.customer.account.accountId !== idOfExecutingAccount) throw new Error(ErrorCode.ACCESS_DENIED);
    if (booking.cancelledAt) return booking;
    if (booking.startTime.getTime() <= Date.now()) throw new Error(ErrorCode.DATETIME_ERROR);

    booking.cancelledAt = new Date();
    await this.bookingRepository.save(booking);
    return booking;
  }
}
