import { v4 } from 'uuid';
import FrameBookingAddon, { IFrameBookingAddon } from '../FrameBookingAddon';
import { Occurrence } from '../Occurrence';
import Address from '../Address';
import MockAddress from '../Address/mock-address';
import BookingType, { MockBookingType } from '../BookingType';
import { ICustomer } from '../Customer';
import MockCustomer from '../Customer/mock-customer';
import Employee from '../Employee';
import MockEmployee from '../Employee/MockEmployee';
import { FrameBookingOccurrence } from './FrameBookingOccurrence';
import { FrameBookingInterface } from './IFrameBooking';

export default class MockFrameBooking implements FrameBookingInterface {
    readonly frameBookingId: string;
    readonly startTime: Date;
    readonly endTime?: Date;
    readonly occurrence: FrameBookingOccurrence;
    readonly customer: ICustomer;
    readonly address: Address;
    readonly employee: Employee;
    readonly bookingType: BookingType;
    readonly privateNotes?: string;
    readonly specialInstructions?: string;
    readonly frameBookingAddons?: IFrameBookingAddon[];
    readonly durationInMinutes: number;

    readonly customerId: string;
    readonly addressId: string;
    readonly employeeId: string;
    readonly bookingTypeId: string;

    constructor (data:Partial<FrameBookingInterface> = {}) {
      this.frameBookingId = data.frameBookingId ?? v4();
      this.startTime = data.startTime ?? new Date('2021-09-14T10:00:00.000Z');
      this.endTime = data.endTime ?? undefined; // new Date('2021-09-14T13:00:00.000Z');
      this.occurrence = data.occurrence ?? Occurrence.BIWEEKLY;
      this.customer = data.customer ? new MockCustomer(data.customer) : new MockCustomer();
      this.customerId = data.customerId ?? this.customer.customerId;
      this.address = data.address ? new Address(data.address) : new MockAddress();
      this.addressId = data.addressId ?? this.address.addressId;
      this.employee = new MockEmployee(data.employee);
      this.employeeId = data.employeeId ?? this.employee.employeeId;
      this.bookingType = data.bookingType ? new BookingType(data.bookingType) : new MockBookingType();
      this.bookingTypeId = data.bookingTypeId ?? this.bookingType.bookingTypeId;
      this.frameBookingAddons = data.frameBookingAddons ? data.frameBookingAddons.map(f => new FrameBookingAddon(f)) : undefined;
      this.durationInMinutes = data.durationInMinutes ?? 180;
      this.privateNotes = data.privateNotes ?? '';
      this.specialInstructions = data.specialInstructions ?? '';
    }
}
