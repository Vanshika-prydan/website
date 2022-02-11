import { container } from 'tsyringe';
import CancelFrameBookingUseCase from '../../../../domain/interactors/bookings/cancel-frame-booking';
import { buildCancelFrameBookingController } from './cancel-frame-booking.controller';

export { CancelFrameBookingRequestModel as CreateFrameBookingRequestModel } from './cancel-frame-booking-request-model';

const cancelFrameBookingUseCase = container.resolve(CancelFrameBookingUseCase);
const cancelFrameBookingController = buildCancelFrameBookingController({ cancelFrameBookingUseCase });

export default cancelFrameBookingController;
