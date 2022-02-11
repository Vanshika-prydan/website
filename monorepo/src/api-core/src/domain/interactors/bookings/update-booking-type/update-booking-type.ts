import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IBookingType } from '../../../entities/BookingType';
import BookingTypeService from '../../../services/booking-type-service';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { AccountService } from '../../../services/account-service';
import { Setup, UpdateBookingTypeRequestPayload } from './types';

export class UpdateBookingTypeUseCase implements IUseCase<UpdateBookingTypeRequestPayload, IBookingType> {
    private readonly bookingTypeRepository: IBookingTypeRepository;
    private readonly accountRepository: IAccountRepository;
    constructor ({ bookingTypeRepository, accountRepository }:Setup) {
      this.bookingTypeRepository = bookingTypeRepository;
      this.accountRepository = accountRepository;
    }

    async execute ({ payload, idOfExecutingAccount }: { payload: UpdateBookingTypeRequestPayload ; idOfExecutingAccount: string; }): Promise<IBookingType> {
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_UPDATE_BOOKING_TYPE);
      const currentBookingType = await this.bookingTypeRepository.get(payload.bookingTypeId);
      if (!currentBookingType) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
      const b = payload.fieldsToUpdate;
      const validatedPayload: IBookingType = {
        bookingTypeId: currentBookingType.bookingTypeId,
        description: b.description !== undefined ? BookingTypeService.validateAndFormatDescription(b.description) : currentBookingType.description,
        name: b.name ? BookingTypeService.validateAndFormatName(b.name) : currentBookingType.name,
      };
      return this.bookingTypeRepository.update(validatedPayload);
    }
}
