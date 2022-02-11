import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingInterface } from '../../domain/entities/Booking';
import { Address } from './Address';
import { Customer } from './Customer';
import { BookingAddon } from '../../domain/entities/BookingAddon/BookingAddon.db';
import { BookingType } from './BookingType';
import { FrameBooking } from './FrameBooking';
import { Optional } from '../../types/optional';
import { v4 } from 'uuid';
import { Employee } from './Employee';
import { BookingConstructor } from '../../domain/entities/Booking/Booking';

@Entity()
export class Booking implements BookingInterface {
    @PrimaryGeneratedColumn('uuid', { name: 'booking_id' })
    bookingId!: string;

    @ManyToOne(() => FrameBooking, { nullable: true, eager: true })
    @JoinColumn({ name: 'frame_booking_id' })
    frameBooking?: FrameBooking;

     @Column({ name: 'frame_booking_id', nullable: true })
    frameBookingId?: string | undefined;

    @ManyToOne(() => Customer, { nullable: false, eager: true })
    @JoinColumn({ name: 'customer_id' })
    customer?: Customer;

    @Column({ name: 'customer_id' })
    customerId!: string;

    @Column({ type: 'timestamp', name: 'start_time' })
    startTime!: Date;

    @Column({ type: 'timestamp', name: 'end_time' })
    endTime!: Date;

    @ManyToOne(() => Address, { nullable: false, eager: true })
    @JoinColumn({ name: 'address_id' })
    address?: Address;

    @Column({ name: 'address_id' })
    addressId!: string;

    @Column('varchar', { name: 'private_notes', length: 1000, nullable: true })
    privateNotes!: string;

    @Column('varchar', { name: 'special_instructions', length: 1000, nullable: true })
    specialInstructions!: string;

    @ManyToOne(() => Employee, { nullable: false, eager: true })
    @JoinColumn({ name: 'employee_id' })
    employee?: Employee;

    @Column({ name: 'employee_id' })
    employeeId!: string;

    @ManyToOne(() => BookingType, { nullable: false, eager: true })
    @JoinColumn({ name: 'booking_type_id' })
    bookingType?: BookingType;

    @Column({ name: 'booking_type_id' })
    bookingTypeId!: string;

    @OneToMany(() => BookingAddon, addon => addon.booking, { eager: true, cascade: true })
    addons?: BookingAddon[];

    @Column({ type: 'boolean', name: 'completed', default: false })
    completed!: boolean;

    @Column({ type: 'boolean', name: 'payment_completed', default: false })
    paymentCompleted!: boolean;

    @Column({ name: 'stripe_payment_id', nullable: true })
    stripePaymentId?:string;

    @Column('timestamp', { name: 'cancelled_at', nullable: true, default: null })
    cancelledAt?:Date;

    constructor (data?: Optional<BookingConstructor, 'bookingId'>) {
      if (data) {
        this.bookingId = data.bookingId ?? v4();
        this.addons = data.addons ? data.addons.map(a => new BookingAddon(a)) : undefined;
        this.frameBooking = data.frameBooking ? new FrameBooking(data.frameBooking) : undefined;
        this.frameBookingId = data.frameBooking?.frameBookingId ?? data.frameBookingId;
        this.customer = data.customer ? new Customer(data.customer) : undefined;
        this.customerId = data.customer?.customerId ?? data.customerId!;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.address = data.address;
        this.addressId = data.address?.addressId ?? data.addressId!;
        this.privateNotes = data.privateNotes ?? '';
        this.specialInstructions = data.specialInstructions ?? '';
        this.employee = data.employee ? new Employee(data.employee) : undefined;
        this.employeeId = data.employee?.employeeId ?? data.employeeId!;
        this.bookingType = data.bookingType ? new BookingType(data.bookingType) : undefined;
        this.bookingTypeId = data.bookingType?.bookingTypeId ?? data.bookingTypeId!;
        this.completed = data.completed;
        this.paymentCompleted = data.paymentCompleted;
        this.stripePaymentId = data.stripePaymentId;
        this.cancelledAt = data.cancelledAt;
      }
    }
}
