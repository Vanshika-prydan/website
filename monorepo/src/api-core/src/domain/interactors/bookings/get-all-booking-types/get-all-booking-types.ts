import IUseCase from '../../IUseCase';
import { IBookingType } from '../../../entities/BookingType';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { GetAllBookingTypesUseCaseSetup } from './types';

export class GetAllBookingTypesUseCase implements IUseCase<undefined, IBookingType[]> {
    private readonly bookingTypeRepository: IBookingTypeRepository;
    constructor (setup:GetAllBookingTypesUseCaseSetup) {
      this.bookingTypeRepository = setup.bookingTypeRepository;
    }

    async execute (): Promise<IBookingType[]> {
      return this.bookingTypeRepository.getAll();
    }
}
