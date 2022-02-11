import { container } from 'tsyringe';
import CancelBookingUseCase from '../../../../domain/interactors/bookings/cancel-booking';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import buildCancelBookingController from './cancel-booking.controller';

container.register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository });
const cancelBookingUseCase = container.resolve(CancelBookingUseCase);

const cancelBookingController = buildCancelBookingController(cancelBookingUseCase);

export default cancelBookingController;
