import { FrameBookingOccurrence } from '../../../entities/FrameBooking/FrameBookingOccurrence';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import BookingService from '../../../services/booking-service';
import { AddAddonEntity } from '../../../services/booking-service/types';

export interface CreateFrameBookingRequestPayload {
  startTime: string;
  endTime?: string | null;
  occurrence: FrameBookingOccurrence;
  durationInMinutes: number;
  customerId?: string;
  addressId: string;
  employeeId: string;
  bookingTypeId: string;
  bookingAddons: AddAddonEntity[];
  privateNotes: string;
  specialInstructions: string;
}
