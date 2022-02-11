
import { InvoiceInterface } from '../../domain/entities/Invoice/index';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '../../types/optional';
import { IsDate, IsInt, IsPositive, IsUUID } from 'class-validator';
import { RequireOne } from '../../types/require-one';
import { Booking } from './Booking';

export type Constructor = Omit<InvoiceInterface, 'invoiceId' | 'createdAt' | 'bookingId' | 'booking'> & Optional<InvoiceInterface, 'invoiceId' | 'createdAt' | 'bookingId'> & RequireOne<InvoiceInterface, 'booking', 'bookingId'>;

@Entity({ name: 'invoice' })
export default class Invoice implements InvoiceInterface {
    @IsUUID('4')
    @PrimaryGeneratedColumn('increment', { name: 'invoice_id' })
    invoiceId!: number;

    @IsDate()
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt!: Date;

    @IsInt()
    @IsPositive()
    @Column('integer', { name: 'price_in_ore' })
    priceInOre!: number;

    @IsPositive()
    @Column('integer', { name: 'price_in_ore_inc_vat' })
    priceInOreInclVAT!: number;

    @OneToOne(() => Booking, b => b.bookingId)
    @JoinColumn({ name: 'booking_id' })
    booking?: Booking;

    @IsUUID('4')
    @Column('uuid', { name: 'booking_id', nullable: false })
    bookingId!: string;

    constructor (payload?: Constructor) {
      if (payload) {
        this.invoiceId = payload.invoiceId!;
        this.createdAt = payload.createdAt ?? new Date();
        this.priceInOre = payload.priceInOre;
        this.priceInOreInclVAT = payload.priceInOreInclVAT;
        this.booking = payload.booking ? new Booking(payload.booking) : undefined;
        this.bookingId = payload.bookingId ?? payload.booking?.bookingId!;
      }
    }
}
