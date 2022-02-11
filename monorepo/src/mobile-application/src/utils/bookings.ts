import { BookingModel } from 'models/booking.model';
import { FrameBookingModel } from 'models/frame-booking.model';

export const filterBookingsByAccount = (
  accountId: string,
  bookings: BookingModel[]
): BookingModel[] => {
  return bookings.filter((b) => b.customer.account.accountId === accountId);
};

export const filterFrameBookingsByAccount = (
  accountId: string,
  frameBookings: FrameBookingModel[]
): FrameBookingModel[] =>
  frameBookings.filter((f) => f.customer.account.accountId === accountId);
