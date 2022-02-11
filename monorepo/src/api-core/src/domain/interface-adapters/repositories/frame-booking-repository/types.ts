import { FrameBookingOccurrence } from '../../../entities/FrameBooking/FrameBookingOccurrence';
import { AddAddonEntity } from '../../../services/booking-service/types';

export interface CreateFrameBookingPayload {
  startTime: Date;
  endTime?: Date | null;
  durationInMinutes: number;
  occurrence: FrameBookingOccurrence;
  specialInstructions?: string;
  privateNotes?: string;
  customerId: string;
  addressId: string;
  employeeId: string;
  bookingTypeId: string;
  bookingAddons?: AddAddonEntity[];
}
