import GetAllBookingTypesUseCase from '../../domain/interactors/bookings/get-all-booking-types';
import bookingTypeRepository from './booking-type-repository';

const getAllBookingTypesUseCase = new GetAllBookingTypesUseCase({ bookingTypeRepository });

export default getAllBookingTypesUseCase;
