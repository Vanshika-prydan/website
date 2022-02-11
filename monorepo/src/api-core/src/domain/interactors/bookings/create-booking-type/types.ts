import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';

export interface ICreateBookingTypeRequestPayload {
    name: string;
    description?: string;
}

export interface CreateBookingTypeSetup {
    bookingTypeRepository: IBookingTypeRepository;
    accountRepository: IAccountRepository;
}
