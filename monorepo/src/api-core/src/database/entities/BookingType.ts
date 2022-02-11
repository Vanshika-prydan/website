import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { IBookingType } from '../../domain/entities/BookingType';
import { Optional } from '../../types/optional';

@Entity({ name: 'booking_type' })
export class BookingType implements IBookingType {
    @PrimaryGeneratedColumn('uuid', { name: 'booking_type_id' })
    bookingTypeId!: string;

    @Column({ name: 'name', length: 100, unique: true })
    name!: string;

    @Column({ name: 'description', length: 10000, nullable: true })
    description?: string;

    constructor (data?: Optional<IBookingType, 'bookingTypeId'>) {
      if (data) {
        this.bookingTypeId = data.bookingTypeId ?? v4();
        this.name = data.name;
        this.description = data.description;
      }
    }
}
