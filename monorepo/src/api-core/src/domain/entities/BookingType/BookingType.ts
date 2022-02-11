import { v4 } from 'uuid';
import { IBookingType } from '.';
import { Optional } from '../../../types/optional';

export class BookingType implements IBookingType {
 readonly bookingTypeId: string;
 readonly name: string;
 readonly description?: string;

 constructor (data: Optional<IBookingType, 'bookingTypeId'>) {
   this.bookingTypeId = data.bookingTypeId ?? v4();
   this.name = data.name;
   this.description = data.description;
 }
}
