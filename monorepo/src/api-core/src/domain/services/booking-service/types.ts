import { FrameBookingOccurrence } from '../../entities/FrameBooking/FrameBookingOccurrence';
export interface AddAddonEntity {
  addonId: string;
  numberOfUnits: number;
}
export interface CreateBookingRequestPayload {
  customerId: string;
  frameBookingId?: string;
  startTime: string | Date;
  durationInMinutes: number;
  addressId: string;
  privateNotes?: string;
  specialInstructions?: string;
  bookingTypeId: string;
  employeeId: string;
  bookingAddons?: AddAddonEntity[];
}

export interface CreateFrameBookingRequestPayload {
  startTime: string | Date;
  endTime?: string | Date | null;
  occurrence: FrameBookingOccurrence;
  durationInMinutes: number;
  customerId: string;
  addressId: string;
  employeeId: string;
  bookingTypeId: string;
  bookingAddons?: AddAddonEntity[];
  privateNotes?: string;
  specialInstructions?: string;
}
