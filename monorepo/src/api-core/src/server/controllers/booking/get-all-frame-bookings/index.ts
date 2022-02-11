import getAllFrameBookingsUseCase from '../../../implementations/get-all-frame-bookings-use-case';
import { buildGetAllFrameBookingsController } from './get-all-bookings.controller';

const getAllFrameBookingsController = buildGetAllFrameBookingsController({ getAllFrameBookingsUseCase });

export default getAllFrameBookingsController;
