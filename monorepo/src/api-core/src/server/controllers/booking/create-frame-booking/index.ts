import { container } from 'tsyringe';
import { CreateFrameBookingUseCase } from '../../../../domain/interactors/bookings/create-frame-booking/create-frame-booking';
import { buildCreateFrameBookingController } from './create-frame-booking.controller';

export { CreateFrameBookingRequestModel } from './create-frame-booking-request-model';

const createFrameBookingUseCase = container.resolve(CreateFrameBookingUseCase);

const createFrameBookingController = buildCreateFrameBookingController({ createFrameBookingUseCase });

export default createFrameBookingController;
