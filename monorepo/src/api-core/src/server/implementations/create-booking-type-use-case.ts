import { CreateBookingTypeUseCase } from '../../domain/interactors/bookings/create-booking-type/create-booking-type';
import accountRepository from './account-respository';
import bookingTypeRepository from './booking-type-repository';

const createBookingTypeUseCase = new CreateBookingTypeUseCase({ accountRepository, bookingTypeRepository });

export default createBookingTypeUseCase;
