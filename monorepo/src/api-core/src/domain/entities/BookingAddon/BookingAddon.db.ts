import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { IBookingAddon } from '.';
import { Optional } from '../../../types/optional';
import { Booking } from '../../../database/entities/Booking';
import { Addon } from '../../../database/entities/Addon';

@Entity()
export class BookingAddon implements IBookingAddon {
    @PrimaryGeneratedColumn('uuid', { name: 'booking_addon_id' })
    bookingAddonId!: string;

    @ManyToOne(() => Addon, { eager: true })
    @JoinColumn({ name: 'addon_id' })
    addon!: Addon;

    @Column('int', { name: 'number_of_units', default: 1 })
    numberOfUnits!: number;

    @ManyToOne(() => Booking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'booking_id' })
    booking!:Booking;

    constructor (ba?:Optional<IBookingAddon, 'bookingAddonId'>) {
      if (ba) {
        this.bookingAddonId = ba.bookingAddonId ?? v4();
        this.addon = new Addon(ba.addon);
        this.numberOfUnits = ba.numberOfUnits;
      }
    }
}
