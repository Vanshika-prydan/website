import { BookingTypeModel } from '../../models/booking-type.model';

export interface BookingTypeState {
    bookingTypes: BookingTypeModel[];
    isLoading: boolean;
}
