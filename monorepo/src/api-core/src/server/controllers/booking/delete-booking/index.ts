import deleteBookingUseCaase from '../../../implementations/delete-booking-use-case';
import { buildDeleteBookingController } from './delete-booking.controller';

const deleteBookingController = buildDeleteBookingController(deleteBookingUseCaase);

export default deleteBookingController;
