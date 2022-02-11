import { BookingModel } from '../../models/booking.model';

export interface BookingState {
    bookings: BookingModel[];
    isLoading: boolean;
}
