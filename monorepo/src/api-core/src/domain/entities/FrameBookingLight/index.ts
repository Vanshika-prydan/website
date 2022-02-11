import { OccurrenceType } from '../Occurrence';

export interface FrameBookingLightInterface {
    frameBookingId: string;
    startTime: Date;
    durationInMinutes: number;
    endTime?: Date;
    occurrence: OccurrenceType;
    customerId: string;
    addressId: string;
    employeeId: string;
    bookingTypeId: string;
}

export class FrameBookingLight implements FrameBookingLightInterface {
    readonly frameBookingId: string;
    readonly startTime: Date;
    readonly durationInMinutes: number;
    readonly endTime?: Date ;
    readonly occurrence: OccurrenceType;
    readonly customerId: string;
    readonly addressId: string;
    readonly employeeId: string;
    readonly bookingTypeId: string;

    constructor (data: FrameBookingLightInterface) {
      this.frameBookingId = data.frameBookingId;
      this.startTime = data.startTime;
      this.durationInMinutes = data.durationInMinutes;
      this.endTime = data.endTime;
      this.occurrence = data.occurrence;
      this.customerId = data.customerId;
      this.addressId = data.addressId;
      this.employeeId = data.employeeId;
      this.bookingTypeId = data.bookingTypeId;
    }
}
