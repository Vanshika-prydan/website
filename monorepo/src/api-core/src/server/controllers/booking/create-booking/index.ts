import { container } from 'tsyringe';
import CreateBookingUseCase from '../../../../domain/interactors/bookings/create-booking';
import { buildCreateBookingController } from './create-booking.controller';

const createBookingUseCase = container.resolve(CreateBookingUseCase);

const createBookingController = buildCreateBookingController(createBookingUseCase);

export default createBookingController;
