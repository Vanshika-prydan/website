import getAllBookingTypesUseCase from '../../../implementations/get-all-booking-types-use-case';
import { buildGetAllBookingTypesController } from './get-all-booking-types.contoller';

const getAllBookingTypesController = buildGetAllBookingTypesController({ getAllBookingTypesUseCase });

export default getAllBookingTypesController;
