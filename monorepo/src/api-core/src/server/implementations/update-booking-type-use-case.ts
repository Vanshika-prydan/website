import { UpdateBookingTypeUseCase } from '../../domain/interactors/bookings/update-booking-type/update-booking-type';
import accountRepository from './account-respository';
import bookingTypeRepository from './booking-type-repository';

const updateBookingTypeUseCase = new UpdateBookingTypeUseCase({ accountRepository, bookingTypeRepository });

export default updateBookingTypeUseCase;
