import { IBookingType } from '../../../entities/BookingType';
import { IAddPayload } from './add-payload';

export interface IBookingTypeRepository {
  add(payload: IAddPayload): Promise<IBookingType>;
  getAll(): Promise<IBookingType[]>;
  update(bookingType: IBookingType): Promise<IBookingType>;
  get(bookingTypeId: string): Promise<IBookingType | undefined>;
}
