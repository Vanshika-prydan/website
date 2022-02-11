import { BookingLightInterface } from '.';

export class BookingLight implements BookingLightInterface {
    bookingId: string;
    employeeId: string;
    startTime: Date;
    endTime: Date;
    cancelledAt?: Date;
    frameBookingId?: string;
    customerId: string;
    addressId: string;
    privateNotes?: string ;
    specialInstructions?: string ;
    bookingTypeId: string;
    completed: boolean;
    paymentCompleted: boolean;
    stripePaymentId?: string ;

    constructor (b:BookingLightInterface) {
      this.bookingId = b.bookingId;
      this.employeeId = b.employeeId;
      this.startTime = b.startTime;
      this.endTime = b.endTime;
      this.cancelledAt = b.cancelledAt;
      this.customerId = b.customerId;
      this.addressId = b.addressId;
      this.bookingTypeId = b.bookingTypeId;
      this.completed = b.completed;
      this.paymentCompleted = b.paymentCompleted;
      this.frameBookingId = b.frameBookingId;
      this.privateNotes = b.privateNotes;
      this.specialInstructions = b.specialInstructions;
      this.stripePaymentId = b.stripePaymentId;
    }
}
