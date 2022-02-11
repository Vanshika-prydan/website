
import validator from 'validator';
import { IBookingType } from '../../domain/entities/BookingType';

export interface BookingTypeModel {
  bookingTypeId: string,
  name: string,
  description?: string,
}

export class BookingTypeDTO implements BookingTypeModel {
    bookingTypeId: string;
    name: string;
    description?: string | undefined;

    constructor (payload: IBookingType) {
      this.bookingTypeId = payload.bookingTypeId;
      this.name = validator.escape(payload.name);
      this.description = payload.description ? validator.escape(payload.description) : undefined;
    }
}
