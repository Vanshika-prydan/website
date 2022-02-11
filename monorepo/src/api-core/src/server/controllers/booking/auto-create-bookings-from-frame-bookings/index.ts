import autoCreateBookingsFromFrameBookingsUseCase from '../../../implementations/auto-create-bookings-from-frame-bookings-use-case';
import { buildAutoCreateBookingsFromFrameBookingsController } from './auto-create-bookings-from-frame-bookings.controller';

const autoCreateBookingsFromFrameBookingsController = buildAutoCreateBookingsFromFrameBookingsController(
  autoCreateBookingsFromFrameBookingsUseCase,
);
export default autoCreateBookingsFromFrameBookingsController;
