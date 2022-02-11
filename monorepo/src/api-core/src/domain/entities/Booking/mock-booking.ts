import { v4 } from 'uuid';
import { BookingInterface } from '.';
import { mockAddress } from '../../../../mock/address';
import { mockBookingType } from '../../../../mock/booking-type';
import { mockEmployee } from '../../../../mock/employee';
import { IAddress } from '../Address';
import { IBookingAddon } from '../BookingAddon';
import { IBookingType } from '../BookingType';
import { ICustomer } from '../Customer';
import MockCustomer from '../Customer/mock-customer';
import { IEmployee } from '../Employee';
import { FrameBookingInterface } from '../FrameBooking/IFrameBooking';

export class MockBooking implements BookingInterface {
  bookingId: string;
  frameBooking?: FrameBookingInterface | undefined;
  customer: ICustomer;
  startTime: Date;
  endTime: Date;
  address: IAddress;
  privateNotes?: string | undefined;
  specialInstructions?: string | undefined;
  employee: IEmployee;
  bookingType: IBookingType;
  addons: IBookingAddon[] ;
  completed: boolean;
  paymentCompleted: boolean;
  stripePaymentId?: string | undefined;
  cancelledAt?: Date | undefined;
  frameBookingId?: string | undefined;
  customerId: string;
  addressId: string;
  employeeId: string;
  bookingTypeId: string;

  constructor (d:Partial<BookingInterface> = {}) {
    this.bookingId = d.bookingId ?? v4();
    this.frameBooking = d.frameBooking ?? undefined;
    this.customer = d.customer ? new MockCustomer(d.customer) : new MockCustomer();
    this.startTime = d.startTime ?? new Date('2024-03-01');
    this.endTime = d.endTime ?? new Date('2024-03-02');
    this.address = d.address ?? mockAddress;
    this.privateNotes = d.privateNotes ?? '';
    this.specialInstructions = d.specialInstructions ?? '';
    this.employee = d.employee ?? mockEmployee;
    this.bookingType = d.bookingType ?? mockBookingType;
    this.addons = d.addons ?? [];
    this.completed = d.completed ?? false;
    this.paymentCompleted = d.paymentCompleted ?? false;
    this.cancelledAt = d.cancelledAt ?? undefined;
    this.customerId = d.customerId ?? this.customer.customerId;
    this.addressId = d.addressId ?? this.address.addressId;
    this.employeeId = d.employeeId ?? this.employee.employeeId;
    this.bookingTypeId = d.bookingTypeId ?? this.bookingType.bookingTypeId;
  }
}
