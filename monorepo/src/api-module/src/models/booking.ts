import { AddonModel } from './addon';
import { AddressModel } from './address';
import { BookingTypeModel } from './booking-type';
import { CustomerModel } from './customer';
import { PublicEmployeeModel } from './public-employee';

export interface AddonEntity {
    numberOfUnits: number;
    addon: AddonModel;
  }
export interface BookingModel {
    bookingId: string;
    FrameBookingId?:string;
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
}
