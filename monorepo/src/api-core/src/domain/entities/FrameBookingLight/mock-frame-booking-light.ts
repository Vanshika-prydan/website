import { v4 } from 'uuid';
import { FrameBookingLightInterface } from '.';
import { Occurrence, OccurrenceType } from '../Occurrence';

export default class MockFrameBookingLight implements FrameBookingLightInterface {
    frameBookingId: string;
    startTime: Date;
    durationInMinutes: number;
    endTime?: Date | undefined;
    occurrence: OccurrenceType;
    customerId: string;
    addressId: string;
    employeeId: string;
    bookingTypeId: string;

    constructor (f:Partial<FrameBookingLightInterface> = {}) {
      this.frameBookingId = f.frameBookingId ?? v4();
      this.startTime = f.startTime ?? new Date('2034-09-21T08:00:00.000Z');
      this.durationInMinutes = f.durationInMinutes ?? 90;
      this.endTime = f.endTime;
      this.occurrence = f.occurrence ?? Occurrence.BIWEEKLY;
      this.customerId = f.customerId ?? v4();
      this.addressId = f.addressId ?? v4();
      this.employeeId = f.employeeId ?? v4();
      this.bookingTypeId = f.bookingTypeId ?? v4();
    }
}
