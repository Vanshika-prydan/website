import { getConnection, getRepository } from 'typeorm';
import { BookingType } from '../../database/entities/BookingType';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { IBookingType } from '../../domain/entities/BookingType';
import { IBookingTypeRepository } from '../../domain/interface-adapters/repositories/booking-type-repository';
import { IAddPayload } from '../../domain/interface-adapters/repositories/booking-type-repository/add-payload';

export class BookingTypeRepository implements IBookingTypeRepository {
  get (bookingTypeId: string): Promise<IBookingType | undefined> {
    return getRepository(BookingType).findOne({ where: { bookingTypeId } });
  }

  async update (bookingType: IBookingType): Promise<IBookingType> {
    const updated = await getRepository(BookingType).findOneOrFail({ where: { bookingTypeId: bookingType.bookingTypeId } });
    updated.description = bookingType.description ?? undefined;
    updated.name = bookingType.name;
    await getRepository(BookingType).save(updated);
    return updated;
  }

  async add (payload: IAddPayload): Promise<IBookingType> {
    try {
      const bookingType = new BookingType();
      bookingType.name = payload.name;
      bookingType.description = payload.description;

      await getRepository(BookingType).save(bookingType);
      return bookingType;
    } catch (e) {
      throw new Error(ErrorCode.DATABASE_ERROR);
    }
  }

  getAll (): Promise<IBookingType[]> {
    return getConnection().getRepository(BookingType).find();
  }
}
