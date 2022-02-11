import updateBookingUseCase from '../../../implementations/update-booking-use-case';
import { buildUpdateBookingController } from './update-booking.controller';

export { UpdateBookingRequestModel } from './update-booking-request-model';

const updateBookingController = buildUpdateBookingController(updateBookingUseCase);

export default updateBookingController;
