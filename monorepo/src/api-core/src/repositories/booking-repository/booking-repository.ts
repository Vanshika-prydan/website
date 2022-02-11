/* eslint-disable camelcase */
import { getManager, getRepository, In } from 'typeorm';
import { Address } from '../../database/entities/Address';
import { BookingLight } from '../../database/entities/BookingLight';
import { BookingAddon } from '../../domain/entities/BookingAddon/BookingAddon.db';
import { BookingType } from '../../database/entities/BookingType';
import { FrameBooking } from '../../database/entities/FrameBooking';
import { Customer } from '../../database/entities/Customer';
import { Employee } from '../../database/entities/Employee';
import { BookingFullyDefined, IBooking } from '../../domain/entities/Booking/IBooking';
import { GetBookingConfig, IBookingRepository } from '../../domain/interface-adapters/repositories/booking-repository';
import { ICreateBookingPayload } from '../../domain/interface-adapters/repositories/booking-repository/create-booking-payload';
import { UpdateBookingRepositoryPayload } from '../../domain/interface-adapters/repositories/booking-repository/update-booking-repository-payload';
import { MoreThanOrEqualDate } from '../../database/helpers/typeorm';
import { Addon } from '../../database/entities/Addon';
import { Booking } from '../../database/entities/Booking';
import BookingService from '../../domain/services/booking-service';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { BookingLightInterface } from '../../domain/entities/BookingLight';

interface BookingQueryResult {
booking_id: string,
start_time: Date,
end_time:Date,
private_notes:string,
special_instructions: string,
completed: boolean,
payment_completed: boolean,
stripe_payment_id: string | null,
frame_booking_id: string | null,
customer_id:string,
address_id:string,
employee_id:string,
booking_type_id:string,
cancelled_at: null | Date
}
interface bookingAddonsIds {
  booking: string;
  addon: string;
  bookingAddonId:string;
}

export class BookingRepository implements IBookingRepository {
  async saveLight (booking: BookingLightInterface): Promise<BookingLightInterface> {
    await getManager().query(`
    UPDATE booking
    SET
      frame_booking_id = $1,
      customer_id = $2,
      start_time = $3,
      end_time = $4,
      address_id = $5,
      private_notes = $6,
      special_instructions = $7,
      employee_id = $8,
      booking_type_id = $9,
      completed = $10,
      payment_completed = $11,
      stripe_payment_id = $12,
      cancelled_at = $13 
    WHERE booking_id = $14;
    `, [
      booking.frameBookingId,
      booking.customerId,
      booking.startTime,
      booking.endTime,
      booking.addressId,
      booking.privateNotes,
      booking.specialInstructions,
      booking.employeeId,
      booking.bookingTypeId,
      booking.completed,
      booking.paymentCompleted,
      booking.stripePaymentId,
      booking.cancelledAt,
      booking.bookingId,
    ]);

    return getRepository(BookingLight).findOneOrFail({ where: { bookingId: booking.bookingId } });
  }

  findBookingLightsByFrameBooking (frameBookingId: string): Promise<BookingLightInterface[]> {
    return getRepository(BookingLight).find({ where: { frameBookingId } });
  }

  findBookingLightsByEmployee (employeeId: string): Promise<BookingLightInterface[]> {
    return getRepository(BookingLight).find({ where: { employeeId } });
  }

  async delete (bookingId: string): Promise<void> {
    const booking = await getRepository(Booking).findOneOrFail(bookingId);
    getRepository(Booking).remove(booking);
  }

  async update (payload: UpdateBookingRepositoryPayload): Promise<IBooking> {
    await getRepository(Booking).createQueryBuilder().update(Booking).set(payload.filedsToUpdate).where('bookingId = :bookingId', { bookingId: payload.bookingId });
    const booking = await getRepository(Booking).findOneOrFail(payload.bookingId);
    if (!BookingService.isFullBooking(booking)) throw new Error(ErrorCode.DATABASE_ERROR);
    return booking;
  }

  async findByFrameBookingId (frameBookingId: string): Promise<IBooking[]> {
    try {
      const bookings = await getRepository(Booking).find({ where: { frameBooking: { frameBookingId } } });
      const validatedBookings = bookings.map(b => {
        if (!BookingService.isFullBooking(b)) throw new Error(ErrorCode.DATABASE_ERROR);
        return b;
      });
      return validatedBookings;
    } catch (e) {
      return [];
    }
  }

  async create (payload: ICreateBookingPayload): Promise<IBooking> {
    const MINUTES_TO_MILISECONDS = 60000;
    const booking = new Booking();

    const frameBooking = payload.frameBookingId ? await getRepository(FrameBooking).findOne(payload.frameBookingId) : undefined;
    const customer = await getRepository(Customer).findOneOrFail(payload.customerId);
    const address = await getRepository(Address).findOneOrFail(payload.addressId);
    const employee = await getRepository(Employee).findOneOrFail(payload.employeeId);
    const bookingType = await getRepository(BookingType).findOneOrFail(payload.bookingTypeId);

    booking.frameBooking = frameBooking;
    booking.customer = customer;
    booking.startTime = payload.startTime;
    booking.endTime = new Date(payload.startTime.getTime() + payload.durationInMinutes * MINUTES_TO_MILISECONDS);
    booking.address = address;
    booking.privateNotes = payload.privateNotes ?? '';
    booking.specialInstructions = payload.specialInstructions ?? '';
    booking.employee = employee;
    booking.bookingType = bookingType;
    await getRepository(Booking).save(booking);

    if (payload.bookingAddons) {
      const promises = payload.bookingAddons.map(async addon => {
        const bookingAddon = new BookingAddon();
        bookingAddon.addon = await getRepository(Addon).findOneOrFail({ where: { addonId: addon.addonId } });
        bookingAddon.numberOfUnits = addon.numberOfUnits;
        bookingAddon.booking = booking;
        return getRepository(BookingAddon).save(bookingAddon);
      });
      await Promise.all(promises);
    }

    const b = await getRepository(Booking).findOneOrFail({ where: { bookingId: booking.bookingId } });
    if (!BookingService.isFullBooking(b)) throw new Error(ErrorCode.DATABASE_ERROR);
    return b;
  }

  async getAll (config?:GetBookingConfig): Promise<IBooking[]> {
    // const time = Date.now();
    const dbBooking:BookingQueryResult[] = await getManager().query('SELECT * FROM booking;');

    if (dbBooking.length === 0) return [];

    const relatedFrameBookings = await getRepository(FrameBooking).createQueryBuilder().distinct(true).whereInIds(dbBooking.map(d => d.frame_booking_id)).getMany();
    const relatedCustomers = await getRepository(Customer).findByIds(dbBooking.map(d => d.customer_id)); // getRepository(Customer).createQueryBuilder().distinct(true).whereInIds(dbBooking.map(d => d.customer_id)).getMany();
    const relatedAddresses = await getRepository(Address).findByIds(dbBooking.map(d => d.address_id)); // getRepository(Address).createQueryBuilder().distinct(true).whereInIds(dbBooking.map(d => d.address_id)).getMany();
    const relatedEmployees = await getRepository(Employee).findByIds(dbBooking.map(d => d.employee_id)); // getRepository(Employee).createQueryBuilder().distinct(true).whereInIds(dbBooking.map(d => d.employee_id)).getMany();
    const relatedBookingTypes = await getRepository(BookingType).findByIds(dbBooking.map(d => d.booking_type_id)); // getRepository(BookingType).createQueryBuilder().distinct(true).whereInIds(dbBooking.map(d => d.booking_type_id)).getMany();

    const relatedBookingAddonsIds:bookingAddonsIds[] = (await getRepository(BookingAddon).createQueryBuilder('ba').distinct(true).loadAllRelationIds().where('ba.booking_id IN (:...booking_id)', { booking_id: dbBooking.map(d => d.booking_id).filter(a => !!a) }).getMany()) as unknown as bookingAddonsIds[];
    const relatedBookingAddons = await getRepository(BookingAddon).find({ where: { bookingAddonId: In(relatedBookingAddonsIds.map(a => a.bookingAddonId)) } });

    const bookings: IBooking[] = dbBooking.map(d => {
      const bookingAddonsIds = relatedBookingAddonsIds.filter(k => k.booking === d.booking_id).map(g => g.bookingAddonId);
      const b = new Booking() as BookingFullyDefined;
      b.bookingId = d.booking_id;
      b.frameBooking = d.frame_booking_id ? relatedFrameBookings.find(f => f.frameBookingId === d.frame_booking_id!) : undefined;
      b.customer = relatedCustomers.find(c => c.customerId === d.customer_id)!;
      b.startTime = d.start_time;
      b.endTime = d.end_time;
      b.address = relatedAddresses.find(a => a.addressId === d.address_id)!;
      b.privateNotes = d.private_notes;
      b.specialInstructions = d.special_instructions;
      b.employee = relatedEmployees.find(e => e.employeeId === d.employee_id)!;
      b.bookingType = relatedBookingTypes.find(bt => bt.bookingTypeId === d.booking_type_id)!;
      b.addons = relatedBookingAddons.filter(ba => bookingAddonsIds.includes(ba.bookingAddonId));
      b.completed = d.completed;
      b.paymentCompleted = d.payment_completed;
      b.stripePaymentId = d.stripe_payment_id ?? undefined;
      b.cancelledAt = d.cancelled_at ?? undefined;

      return b;
    });

    // console.log(`Time: ${Date.now() - time} ms`);
    return bookings;
  }

  getLightBookings (config?:GetBookingConfig):Promise<BookingLight[]> {
    const options = { where: { startTime: config?.from ? MoreThanOrEqualDate(config.from) : undefined } };
    return getManager().find(BookingLight, options);
  }

  async save (payload: IBooking): Promise<IBooking> {
    const booking = await getRepository(Booking).findOneOrFail({ where: { bookingId: payload.bookingId } });
    booking.frameBooking = payload.frameBooking ? new FrameBooking(payload.frameBooking) : undefined;
    booking.customer = new Customer(payload.customer);
    booking.startTime = payload.startTime;
    booking.endTime = payload.endTime;
    booking.address = payload.address;
    booking.privateNotes = payload.privateNotes ?? '';
    booking.specialInstructions = payload.specialInstructions ?? '';
    booking.employee = new Employee(payload.employee);
    booking.bookingType = payload.bookingType;
    booking.completed = payload.completed;
    booking.paymentCompleted = payload.paymentCompleted;
    booking.stripePaymentId = payload.stripePaymentId;
    booking.cancelledAt = payload.cancelledAt;
    booking.addons = payload.addons?.map(b => new BookingAddon(b)) ?? [];
    await getRepository(Booking).save(booking);
    return booking as BookingFullyDefined;
  }

  async getById (bookingId: string): Promise<IBooking | undefined> {
    try {
      return await getRepository(Booking).findOne({ where: { bookingId } }) as BookingFullyDefined;
    } catch (e) {
      return undefined;
    }
  }

  async getByCustomerId (customerId: string): Promise<IBooking[]> {
    try {
      return await getRepository(Booking).find({ where: { customer: { customerId } } }) as BookingFullyDefined[];
    } catch (e) {
      return [];
    }
  }

  async getByEmployeeId (employeeId: string): Promise<IBooking[]> {
    try {
      return await getRepository(Booking).find({ where: { employee: { employeeId } } }) as BookingFullyDefined[];
    } catch (e) {
      return [];
    }
  }
}
