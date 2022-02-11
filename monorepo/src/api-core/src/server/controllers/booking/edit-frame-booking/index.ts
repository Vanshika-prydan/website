import { container } from 'tsyringe';
import EditFrameBookingUseCase from '../../../../domain/interactors/bookings/edit-frame-booking';
import { buildEditFrameBookingController } from './controller';

const useCase = container.resolve(EditFrameBookingUseCase);
const editFrameBookingController = buildEditFrameBookingController(useCase);

export default editFrameBookingController;
