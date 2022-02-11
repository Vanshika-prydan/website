import Employee from '../Employee';
import { BookingAddon } from '../BookingAddon/BookingAddon.db';
import { v4 } from 'uuid';
import Address from '../Address';
import BookingType from '../BookingType';
import Customer from '../Customer';
import FrameBooking from '../FrameBooking';
import { BookingInterface } from './IBooking';
import { RequireOne } from '../../../types/require-one';

export type BookingConstructor = Omit<BookingInterface,
'customer' | 'customerId' |
'address' | 'addressId' |
'employee' | 'employeeId' |
'bookingType' | 'bookingTypeId'>
& RequireOne<BookingInterface, 'customer', 'customerId'>
& RequireOne<BookingInterface, 'address', 'addressId'>
& RequireOne<BookingInterface, 'employee', 'employeeId'>
& RequireOne<BookingInterface, 'bookingType', 'bookingTypeId'>
export class Booking implements BookingInterface {
 readonly bookingId: string;
 readonly frameBooking?: FrameBooking;
 readonly frameBookingId?: string;

 readonly customer?: Customer;
 readonly customerId: string;

 readonly startTime: Date;
 readonly endTime: Date;
 readonly address?: Address;
 readonly addressId: string;

 readonly privateNotes?: string;
 readonly specialInstructions?: string;
 readonly employee?: Employee;
 readonly employeeId: string;

 readonly bookingType?: BookingType;
 readonly bookingTypeId: string;

 readonly addons?: BookingAddon[];
 readonly completed: boolean;
 readonly paymentCompleted: boolean;
 readonly stripePaymentId?: string;
 readonly cancelledAt?: Date;

 constructor (data: BookingConstructor) {
   this.bookingId = data.bookingId ?? v4();
   this.addons = data.addons ? data.addons.map(a => new BookingAddon(a)) : undefined;
   this.frameBooking = data.frameBooking ? new FrameBooking(data.frameBooking) : undefined;
   this.frameBookingId = data.frameBooking?.frameBookingId ?? data.frameBookingId ?? undefined;
   this.customer = data.customer ? new Customer(data.customer) : undefined;
   this.customerId = data.customer?.customerId ?? data.customerId!;
   this.startTime = data.startTime;
   this.endTime = data.endTime;
   this.address = data.address ? new Address(data.address) : undefined;
   this.addressId = data.address?.addressId ?? data.addressId!;
   this.privateNotes = data.privateNotes ?? '';
   this.specialInstructions = data.specialInstructions ?? '';
   this.employee = data.employee ? new Employee(data.employee) : undefined;
   this.employeeId = data.employee?.employeeId ?? data.employeeId!;
   this.bookingType = data.bookingType ? new BookingType(data.bookingType) : undefined;
   this.bookingTypeId = data.bookingType?.bookingTypeId ?? data.bookingTypeId!;
   this.completed = data.completed;
   this.paymentCompleted = data.paymentCompleted;
   this.stripePaymentId = data.stripePaymentId;
   this.cancelledAt = data.cancelledAt;
 }
}
