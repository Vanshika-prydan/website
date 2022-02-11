import { ViewColumn, ViewEntity } from 'typeorm';
import { BookingLightInterface } from '../../domain/entities/BookingLight';

@ViewEntity({
  expression: `SELECT
  "booking_id" AS "bookingId",
  "employee_id" AS "employeeId",
  "start_time" AS "startTime",
  "end_time" AS "endTime",
  "cancelled_at" AS "cancelledAt",
  "frame_booking_id" AS "frameBookingId",
  "customer_id" AS "customerId",
  "address_id" AS "addressId",
  "private_notes" AS "privateNotes",
  "special_instructions" AS "specialInstructions",
  "booking_type_id" AS "bookingTypeId",
  "completed" AS "completed",
  "payment_completed" AS "paymentCompleted",
  "stripe_payment_id" AS "stripePaymentId"
  from "booking"`,
})
export class BookingLight implements BookingLightInterface {
  @ViewColumn()
  bookingId!: string;

  @ViewColumn()
  employeeId!: string;

  @ViewColumn()
  startTime!: Date;

  @ViewColumn()
  endTime!: Date;

  @ViewColumn()
  cancelledAt?: Date;

  @ViewColumn()
  frameBookingId?: string;

  @ViewColumn()
  customerId!: string;

  @ViewColumn()
  addressId!: string;

  @ViewColumn()
  privateNotes?: string;

  @ViewColumn()
  specialInstructions?: string;

  @ViewColumn()
  bookingTypeId!: string;

  @ViewColumn()
  completed!: boolean;

  @ViewColumn()
  paymentCompleted!: boolean;

  @ViewColumn()
  stripePaymentId?: string;

  constructor (b?:BookingLightInterface) {
    if (b) {
      this.bookingId = b.bookingId;
      this.employeeId = b.employeeId;
      this.startTime = b.startTime;
      this.endTime = b.endTime;
      this.cancelledAt = b.cancelledAt;
      this.frameBookingId = b.frameBookingId;
      this.customerId = b.customerId;
      this.addressId = b.addressId;
      this.privateNotes = b.privateNotes;
      this.specialInstructions = b.specialInstructions;
      this.bookingTypeId = b.bookingTypeId;
      this.completed = b.completed;
      this.paymentCompleted = b.paymentCompleted;
      this.stripePaymentId = b.stripePaymentId;
    }
  }
}
