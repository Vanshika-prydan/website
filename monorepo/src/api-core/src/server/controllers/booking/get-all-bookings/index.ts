import getAllBookingsUseCase from '../../../implementations/get-all-bookings-use-case';
import { buildGetAllBookingsController } from './get-all-bookings.controller';

const getAllBookingsController = buildGetAllBookingsController({ getAllBookingsUseCase });

export default getAllBookingsController;
