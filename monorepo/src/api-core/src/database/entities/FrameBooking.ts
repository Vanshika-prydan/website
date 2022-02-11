import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FrameBookingConstructor } from '../../domain/entities/FrameBooking/FrameBooking';
import { FrameBookingInterface } from '../../domain/entities/FrameBooking/IFrameBooking';

import { Address } from './Address';
import { BookingType } from './BookingType';
import { Customer } from './Customer';
import { Employee } from './Employee';
import FrameBookingAddon from './FrameBookingAddon';

@Entity({ name: 'frame_booking' })
export class FrameBooking implements FrameBookingInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'frame_booking_id' })
  frameBookingId!: string;

  @Column('timestamp', { name: 'start_time' })
  startTime!: Date;

  @Column('int', { name: 'duration_in_minutes', nullable: false })
  durationInMinutes!: number;

  @Column('timestamp', { name: 'end_time', nullable: true })
  endTime?: Date;

  @Column('varchar', { name: 'occurrence' })
  occurrence: any;

  @ManyToOne(() => Customer, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  @Column({ name: 'customer_id' })
  customerId!: string;

  @ManyToOne(() => Address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address?: Address;

  @Column({ name: 'address_id' })
  addressId!: string;

  @Column('varchar', { nullable: true, name: 'private_notes' })
    privateNotes?: string;

    @Column('varchar', { name: 'special_instructions', nullable: true })
    specialInstructions?: string;

    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: 'employee_id' })
    employee?: Employee;

    @Column({ name: 'employee_id' })
    employeeId!: string;

    @ManyToOne(() => BookingType, { eager: true })
    @JoinColumn({ name: 'booking_type_id' })
    bookingType?: BookingType;

    @Column({ name: 'booking_type_id' })
    bookingTypeId!: string;

    @OneToMany(() => FrameBookingAddon, ba => ba.frameBooking, { eager: true, cascade: true })
    frameBookingAddons!: FrameBookingAddon[];

    constructor (data?:FrameBookingConstructor) {
      if (data) {
        this.frameBookingId = data.frameBookingId;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.occurrence = data.occurrence;
        this.customer = new Customer(data.customer);
        this.customerId = data.customer?.customerId ?? data.customerId!;
        this.address = new Address(data.address);
        this.addressId = data.address?.addressId ?? data.addressId!;
        this.employee = new Employee(data.employee);
        this.employeeId = data.employee?.employeeId ?? data.employeeId!;
        this.bookingType = new BookingType(data.bookingType);
        this.bookingTypeId = data.bookingType?.bookingTypeId ?? data.bookingTypeId!;
        this.frameBookingAddons = data.frameBookingAddons ? data.frameBookingAddons.map(f => new FrameBookingAddon(f)) : [];
        this.durationInMinutes = data.durationInMinutes;
        this.privateNotes = data.privateNotes;
        this.specialInstructions = data.specialInstructions;
      }
    }
}
