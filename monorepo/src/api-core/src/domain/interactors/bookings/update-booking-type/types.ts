import { IBookingType } from '../../../entities/BookingType';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';

export interface UpdateBookingTypeRequestPayload {
    bookingTypeId: string,
    fieldsToUpdate: Partial<Exclude<IBookingType, 'bookingTypeId'>>
}

export interface Setup {
    bookingTypeRepository: IBookingTypeRepository;
    accountRepository: IAccountRepository;
}
