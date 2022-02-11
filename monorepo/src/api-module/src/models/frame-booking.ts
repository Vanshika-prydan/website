import { AddressModel } from './address';
import { BookingTypeModel } from './booking-type';
import { CustomerModel } from './customer';
import { PublicEmployeeModel } from './public-employee';

export interface FrameBookingModel {
  frameBookingId: string;
  customer: CustomerModel;
  startTime: string;
  endTime?: string;
  occurrence: string;
  address: AddressModel;
  specialInstructions?: string;
  employee: PublicEmployeeModel;
  bookingType: BookingTypeModel;
  durationInMinutes: number;
  // addons?: IBookingAddon[];
}
