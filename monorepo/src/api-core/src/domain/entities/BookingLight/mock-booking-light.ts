import { addDays } from 'date-fns';
import { v4 } from 'uuid';
import { BookingLightInterface } from '.';

export class MockBookingLight implements BookingLightInterface {
    bookingId: string;
    employeeId: string;
    startTime: Date;
    endTime: Date;
    cancelledAt?: Date;

  frameBookingId?: string;
  customerId: string;
  addressId: string;
  privateNotes?: string | undefined;
  specialInstructions?: string | undefined;
  bookingTypeId: string;
  completed: boolean;
  paymentCompleted: boolean;
  stripePaymentId?: string | undefined;

  constructor (p:Partial<BookingLightInterface> = {}) {
    this.bookingId = p.bookingId ?? 'b2a84c6c-d043-48be-9783-0ba2235fa088';
    this.employeeId = p.employeeId ?? '77c43287-60fa-4dea-853c-17576b1f258e';
    this.endTime = p.endTime ?? addDays(new Date(), 10);
    this.startTime = p.startTime ?? addDays(new Date(), 9);
    this.cancelledAt = p.cancelledAt;
    this.frameBookingId = p.frameBookingId;
    this.customerId = p.customerId ?? v4();
    this.addressId = p.addressId ?? v4();
    this.privateNotes = p.privateNotes ?? '';
    this.specialInstructions = p.specialInstructions ?? '';
    this.bookingTypeId = p.bookingTypeId ?? v4();
    this.completed = p.completed ?? false;
    this.paymentCompleted = p.paymentCompleted ?? false;
    this.stripePaymentId = p.stripePaymentId;
  }
}
