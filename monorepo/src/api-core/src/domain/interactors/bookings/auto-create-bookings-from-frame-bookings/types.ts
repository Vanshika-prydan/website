import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';
import BookingService from '../../../services/booking-service';

export interface AutoCreateBookingsFromFrameBookingsSetup {
    bookingService: BookingService;
    frameBookingRepository: IFrameBookingRepository;
}
