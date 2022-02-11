import { v4 } from 'uuid';
import { IBookingType } from '.';

export default class MockBookingType implements IBookingType {
 readonly bookingTypeId: string;
 readonly name: string;
 readonly description?: string;

 constructor (data: Partial<IBookingType> = {}) {
   this.bookingTypeId = data.bookingTypeId ?? v4();
   this.name = data.name ?? 'Hemstädning';
   this.description = data.description ?? '';
 }
}
