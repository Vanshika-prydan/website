import { RequireAtLeastOneAndModel } from '../../../types/require-at-least-one';
import Address from '../Address';
import BookingType from '../BookingType';
import Customer from '../Customer';
import Employee from '../Employee';
import FrameBookingAddon, { IFrameBookingAddon } from '../FrameBookingAddon';
import { FrameBookingOccurrence } from './FrameBookingOccurrence';
import { FrameBookingInterface } from './IFrameBooking';

export type FrameBookingConstructor = Omit<FrameBookingInterface, 'customer' | 'customerId' | 'address' |'addressId' | 'employee' | 'employeeId' | 'booking' | 'bookingId'>
& RequireAtLeastOneAndModel<FrameBookingInterface, 'customer', 'customerId'>
& RequireAtLeastOneAndModel<FrameBookingInterface, 'address', 'addressId'>
& RequireAtLeastOneAndModel<FrameBookingInterface, 'employee', 'employeeId'>
& RequireAtLeastOneAndModel<FrameBookingInterface, 'bookingType', 'bookingTypeId'>

export class FrameBooking implements FrameBookingInterface {
  readonly frameBookingId: string;
  readonly startTime: Date;
  readonly endTime?: Date;
  readonly occurrence: FrameBookingOccurrence;
  readonly customer?: Customer;
  readonly customerId: string;
  readonly address?: Address;
  readonly addressId: string;
  readonly employee?: Employee;
  readonly employeeId: string;
  readonly bookingType?: BookingType;
  readonly bookingTypeId: string;
  readonly privateNotes?: string;
  readonly specialInstructions?: string;
  readonly frameBookingAddons?: IFrameBookingAddon[];
  readonly durationInMinutes: number;

  constructor (data:FrameBookingConstructor) {
    this.frameBookingId = data.frameBookingId;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.occurrence = data.occurrence;
    this.customer = data.customer ? new Customer(data.customer) : undefined;
    this.customerId = data.customer?.customerId ?? data.customerId!;
    this.address = data.address ? new Address(data.address) : undefined;
    this.addressId = data.address?.addressId ?? data.addressId!;
    this.employee = data.employee ? new Employee(data.employee) : undefined;
    this.employeeId = data.employee?.employeeId ?? data.employeeId!;
    this.bookingType = data.bookingType ? new BookingType(data.bookingType) : undefined;
    this.bookingTypeId = data.bookingType?.bookingTypeId ?? data.bookingTypeId!;
    this.frameBookingAddons = data.frameBookingAddons ? data.frameBookingAddons.map(f => new FrameBookingAddon(f)) : undefined;
    this.durationInMinutes = data.durationInMinutes;
    this.privateNotes = data.privateNotes;
    this.specialInstructions = data.specialInstructions;
  }
}
