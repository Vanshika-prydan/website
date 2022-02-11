import { FrameBookingModel } from '../../models/frame-booking.model';

export interface FrameBookingState {
    frameBookings: FrameBookingModel[];
    isLoading: boolean;
}
