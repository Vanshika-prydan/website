import IUseCase from '../../IUseCase';
import { IBookingType } from '../../../entities/BookingType';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { IAddPayload } from '../../../interface-adapters/repositories/booking-type-repository/add-payload';
import { AccountService } from '../../../services/account-service';
import { CreateBookingTypeSetup, ICreateBookingTypeRequestPayload } from './types';
import BookingTypeService from '../../../services/booking-type-service';

export class CreateBookingTypeUseCase implements IUseCase <ICreateBookingTypeRequestPayload, IBookingType> {
 private readonly bookingTypeRepository: IBookingTypeRepository;
 private readonly accountRepository: IAccountRepository;

 constructor ({ bookingTypeRepository, accountRepository }:CreateBookingTypeSetup) {
   this.bookingTypeRepository = bookingTypeRepository;
   this.accountRepository = accountRepository;
 }

 private validateInputAndGenerateRepositoryPayload (payload: ICreateBookingTypeRequestPayload):IAddPayload {
   return {
     name: BookingTypeService.validateAndFormatName(payload.name),
     description: BookingTypeService.validateAndFormatDescription(payload.description) ?? '',
   };
 }

 async execute ({ payload, idOfExecutingAccount }: { payload: ICreateBookingTypeRequestPayload; idOfExecutingAccount: string }): Promise<IBookingType> {
   const validatedPayload = this.validateInputAndGenerateRepositoryPayload(payload);
   await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_CREATE_BOOKING_TYPE);
   return this.bookingTypeRepository.add(validatedPayload);
 }
}
