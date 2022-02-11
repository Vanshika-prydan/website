import { DeleteBookingUseCaase } from '../../domain/interactors/bookings/delete-booking/delete-booking';
import accountRepository from './account-respository';
import bookingRepository from './booking-repository';

const deleteBookingUseCaase = new DeleteBookingUseCaase({ accountRepository, bookingRepository });

export default deleteBookingUseCaase;
