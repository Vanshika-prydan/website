
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { IFrameBookingAddon } from '../../domain/entities/FrameBookingAddon';
import { Addon } from './Addon';
import { FrameBooking } from './FrameBooking';

@Entity()
export default class FrameBookingAddon implements IFrameBookingAddon {
    @PrimaryGeneratedColumn('uuid', { name: 'frame_booking_addon_id' })
    frameBookingAddonId!: string;

    @ManyToOne(() => Addon, { nullable: false, eager: true })
    @JoinColumn({ name: 'addon_id' })
    addon!: Addon;

    @Column('int', { name: 'number_of_units', default: 1 })
    numberOfUnits!: number;

    @ManyToOne(() => FrameBooking, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'frame_booking_id' })
    frameBooking!:FrameBooking;

    constructor (data?:IFrameBookingAddon) {
      if (data) {
        this.frameBookingAddonId = data.frameBookingAddonId ?? v4();
        this.addon = new Addon(data.addon);
        this.numberOfUnits = data.numberOfUnits;
      }
    }
}
