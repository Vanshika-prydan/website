import { ViewColumn, ViewEntity } from 'typeorm';
import { FrameBookingLightInterface } from '../../domain/entities/FrameBookingLight';
import { OccurrenceType } from '../../domain/entities/Occurrence';

@ViewEntity({
  expression: `SELECT
    "frame_booking_id" as "frameBookingId",
    "start_time" as "startTime",
    "duration_in_minutes" as "durationInMinutes",
     "end_time" as "endTime",
     "occurrence" as "occurrence",
    "customer_id" as "customerId",
    "address_id" as "addressId",
    "employee_id" as "employeeId",
    "booking_type_id" as "bookingTypeId"
    FROM frame_booking;
    `,
})
export class FrameBookingLight implements FrameBookingLightInterface {
    @ViewColumn()
    frameBookingId!: string;

    @ViewColumn()
    startTime!: Date;

    @ViewColumn()
    durationInMinutes!: number;

    @ViewColumn()
    endTime?: Date | undefined;

    @ViewColumn()
    occurrence!: OccurrenceType;

    @ViewColumn()
    customerId!: string;

    @ViewColumn()
    addressId!: string;

    @ViewColumn()
    employeeId!: string;

    @ViewColumn()
    bookingTypeId!: string;

    constructor (data?: FrameBookingLightInterface) {
      if (data) {
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
}
