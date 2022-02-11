import updateBookingTypeUseCase from '../../../implementations/update-booking-type-use-case';
import { buildUpdateBookingTypeController } from './update-booking-type.controller';

const updateBookingTypeController = buildUpdateBookingTypeController(updateBookingTypeUseCase);

export default updateBookingTypeController;
