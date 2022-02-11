import AutoCreateBookingsFromFrameBookingsUseCase from '../../domain/interactors/bookings/auto-create-bookings-from-frame-bookings';
import bookingService from './booking-service';
import frameBookingRepository from './frame-booking-repository';

const autoCreateBookingsFromFrameBookingsUseCase = new AutoCreateBookingsFromFrameBookingsUseCase({ bookingService, frameBookingRepository });
export default autoCreateBookingsFromFrameBookingsUseCase;
