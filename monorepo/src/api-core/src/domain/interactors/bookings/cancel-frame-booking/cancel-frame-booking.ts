import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/frame-booking-repository';
import { AccountService } from '../../../services/account-service';
import { inject, injectable } from 'tsyringe';
import FrameBookingService from '../../../services/frame-booking-service';

@injectable()
export class CancelFrameBookingUseCase implements IUseCase<string, void> {
  constructor (
   @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
   @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
   @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
   private readonly frameBookingService: FrameBookingService,
  ) {}

  private async deleteComingBookings (frameBookingId: string):Promise<void> {
    if (!frameBookingId) throw new Error('NOT FRAME BOOKING');
    const bookings = await this.bookingRepository.findByFrameBookingId(frameBookingId);
    const deletedBookings: Promise<void>[] = [];
    const now = Date.now();
    bookings.forEach((booking) => {
      if (booking.startTime.getTime() > now)
        deletedBookings.push(this.bookingRepository.delete(booking.bookingId));
    });
    await Promise.all(deletedBookings);
  }

  async execute ({ payload, idOfExecutingAccount }: { payload: string; idOfExecutingAccount: string; }): Promise<void> {
    const frameBooking = await this.frameBookingService.fetchByIdOrFail(payload);

    if (frameBooking.customer.account.accountId !== idOfExecutingAccount) await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_CANCEL_CUSTOMER_FRAME_BOOKING);
    await this.deleteComingBookings(payload);

    await this.frameBookingRepository.cancel(payload);
  }
}
