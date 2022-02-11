import { AddonModel } from './addon.model';
import { AddressModel } from './address.model';
import { BookingTypeModel } from './booking-type.model';
import { CustomerModel } from './customer.model';
import { PublicEmployeeModel } from './public-employee.model';

export interface AddonEntity {
  numberOfUnits: number;
  addon: AddonModel;
}
export interface BookingModel {
  bookingId: string;
  FrameBookingId?: string;
  customer: CustomerModel;
  startTime: string;
  endTime: string;
  address: AddressModel;
  specialInstructions?: string;
  employee: PublicEmployeeModel;
  bookingType: BookingTypeModel;
  completed: boolean;
  paymentCompleted: boolean;
  cancelledAt?: string;
  addons?: AddonEntity[];
}
