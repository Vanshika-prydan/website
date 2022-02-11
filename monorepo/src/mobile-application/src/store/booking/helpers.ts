import { BookingModel } from '../../models/booking.model';
import store from '../index';

export const filterUpcomingBookings = (): BookingModel[] =>
  store
    .getState()
    .booking.bookings.filter((b) => Date.parse(b.startTime) >= Date.now());

export const filterActiveUpcomingBookings = (): BookingModel[] =>
  filterUpcomingBookings().filter((b) => !b.cancelledAt);

export const filterCompletedBookings = (): BookingModel[] =>
  store.getState().booking.bookings.filter((b) => b.completed === true);
