export { BookingLight } from './booking-light';
export { MockBookingLight } from './mock-booking-light';
export interface BookingLightInterface {
    bookingId: string;
    employeeId: string;
    startTime: Date;
    endTime: Date;
    cancelledAt?: Date;
    frameBookingId?: string;
    customerId: string;
    addressId: string;
    privateNotes?: string;
    specialInstructions?: string;
    bookingTypeId: string;
    completed: boolean;
    paymentCompleted: boolean;
    stripePaymentId?:string;
}
