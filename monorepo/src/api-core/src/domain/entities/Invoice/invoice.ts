
import { InvoiceInterface } from './index';
import Booking from '../Booking';
import { Optional } from '../../../types/optional';
import { IsDate, IsInt, IsPositive, IsUUID } from 'class-validator';
import { RequireOne } from '../../../types/require-one';

export type Constructor = Omit<InvoiceInterface, 'invoiceId' | 'createdAt' | 'bookingId' | 'booking'> & Optional<InvoiceInterface, 'invoiceId' | 'createdAt' | 'bookingId'> & RequireOne<InvoiceInterface, 'booking', 'bookingId'>;

export default class Invoice implements InvoiceInterface {
    @IsUUID('4')
    readonly invoiceId: number;

    @IsDate()
    readonly createdAt: Date;

    @IsInt()
    @IsPositive()
    readonly priceInOre: number;

    @IsPositive()
    readonly priceInOreInclVAT: number;

    readonly booking?: Booking;

    @IsUUID('4')
    readonly bookingId!: string;

    constructor (payload: Constructor) {
      this.invoiceId = payload.invoiceId!;
      this.createdAt = payload.createdAt ?? new Date();
      this.priceInOre = payload.priceInOre;
      this.priceInOreInclVAT = payload.priceInOreInclVAT;
      this.booking = payload.booking ? new Booking(payload.booking) : undefined;
      this.bookingId = payload.bookingId ?? payload.booking?.bookingId!;
    }
}
