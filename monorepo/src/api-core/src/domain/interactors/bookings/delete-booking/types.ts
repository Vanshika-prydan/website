import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';

export type BookingId = string;

export interface DeleteBookingUseCaseSetup {
    accountRepository: IAccountRepository;
    bookingRepository: IBookingRepository;
}
