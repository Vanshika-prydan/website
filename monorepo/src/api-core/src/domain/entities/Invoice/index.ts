import { BookingInterface } from '../Booking';
import Invoice from './invoice';

export interface InvoiceInterface {
    invoiceId: number;
    createdAt: Date;
    priceInOre: number;
    priceInOreInclVAT: number;
    booking?: BookingInterface;
    bookingId: string;
}

export type InvoiceWithoutId = Omit<InvoiceInterface, 'invoiceId'>

export interface InvoiceWithBooking extends InvoiceInterface {
    booking: NonNullable<InvoiceInterface['booking']>
}

export default Invoice;
export enum PaymentMethodEnum {"STRIPE"="STRIPE","MANUAL"="MANUAL"};
export const PaymentMethod = {STRIPE:"STRIPE", MANUAL:"MANUAL"} as const;
export type PaymentMethodType = typeof PaymentMethod[keyof typeof  PaymentMethod];
