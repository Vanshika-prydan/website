import { OccurrenceType } from 'services/api-service/types';
import { AddressModel } from './address.model';
import { BookingTypeModel } from './booking-type.model';
import { CustomerModel } from './customer.model';
import { PublicEmployeeModel } from './public-employee.model';

export interface FrameBookingModel {
  frameBookingId: string;
  customer: CustomerModel;
  startTime: string;
  endTime?: string;
  occurrence: Exclude<'onetime', OccurrenceType>;
  address: AddressModel;
  specialInstructions?: string;
  employee: PublicEmployeeModel;
  bookingType: BookingTypeModel;
  durationInMinutes: number;
  // addons?: IBookingAddon[];
}
