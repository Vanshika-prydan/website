import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { AccountService } from '../../../services/account-service';
import { BookingId, DeleteBookingUseCaseSetup } from './types';

export class DeleteBookingUseCaase implements IUseCase<BookingId, void> {
    private readonly accountRepository: IAccountRepository;
    private readonly bookingRepository: IBookingRepository;

    constructor (setup: DeleteBookingUseCaseSetup) {
      this.accountRepository = setup.accountRepository;
      this.bookingRepository = setup.bookingRepository;
    }

    async execute ({ payload, idOfExecutingAccount }: { payload: BookingId; idOfExecutingAccount: string }): Promise<void> {
      const booking = await this.bookingRepository.getById(payload);
      if (!booking) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);

      if (idOfExecutingAccount !== booking.customer.account.accountId)
        await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_DELETE_CUSTOMER_BOOKING);

      return this.bookingRepository.delete(booking.bookingId);
    }
}
