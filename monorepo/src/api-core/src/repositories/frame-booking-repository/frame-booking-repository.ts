import { getRepository, MoreThan } from 'typeorm';
import { Address } from '../../database/entities/Address';
import { BookingType } from '../../database/entities/BookingType';
import { FrameBooking } from '../../database/entities/FrameBooking';
import { Customer } from '../../database/entities/Customer';
import IFrameBookingRepository from '../../domain/interface-adapters/repositories/frame-booking-repository';
import { CreateFrameBookingPayload } from '../../domain/interface-adapters/repositories/frame-booking-repository/types';
import { Addon } from '../../database/entities/Addon';
import FrameBookingAddon from '../../database/entities/FrameBookingAddon';
import { Employee } from '../../database/entities/Employee';
import { FrameBookingFullyDefined, FrameBookingInterface } from '../../domain/entities/FrameBooking/IFrameBooking';
import FrameBookingService from '../../domain/services/frame-booking-service';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { FrameBookingLightInterface } from '../../domain/entities/FrameBookingLight';
import { FrameBookingLight } from '../../database/entities/FrameBookingLight';

export class FrameBookingRepository implements IFrameBookingRepository {
  save (frameBooking: FrameBookingInterface): Promise<FrameBookingInterface> {
    const fb = new FrameBooking(frameBooking);
    return getRepository(FrameBooking).save(fb);
  }

  findFrameBookingLightByEmployeeId (employeeId: string): Promise<FrameBookingLightInterface[]> {
    return getRepository(FrameBookingLight).find({ where: { employeeId } });
  }

  findActiveByEmployee (employeeId: string): Promise<FrameBookingInterface[]> {
    throw new Error('Method not implemented.');
  }

  async findAllActive (): Promise<FrameBookingFullyDefined[]> {
    const frameBookings = await getRepository(FrameBooking).find({
      where: [{ endTime: MoreThan(new Date()) }, { endTime: undefined }, { endTime: null }],
      // relations: ['customer', 'customer.account', 'employee', 'employee.account', 'booking_type', 'address'],
    });
    const validatedBookings: FrameBookingFullyDefined[] = frameBookings.map(f => {
      if (!FrameBookingService.isFullyDefinedFrameBooking(f)) throw new Error(ErrorCode.DATABASE_ERROR);
      return f;
    });
    return validatedBookings;
  }

  async cancel (frameBookingId: string): Promise<void> {
    const frameBooking = await getRepository(FrameBooking).findOneOrFail(frameBookingId);
    frameBooking.endTime = new Date();
    await getRepository(FrameBooking).save(frameBooking);
  }

  async create (payload: CreateFrameBookingPayload): Promise<FrameBookingFullyDefined> {
    const frameBooking = new FrameBooking();
    frameBooking.address = await getRepository(Address).findOneOrFail(payload.addressId);
    frameBooking.addressId = frameBooking.address.addressId;
    frameBooking.frameBookingAddons = payload.bookingAddons ? await getRepository(FrameBookingAddon).findByIds(payload.bookingAddons) : [];
    frameBooking.bookingType = await getRepository(BookingType).findOneOrFail(payload.bookingTypeId);
    frameBooking.bookingTypeId = frameBooking.bookingType.bookingTypeId;
    frameBooking.customer = await getRepository(Customer).findOneOrFail(payload.customerId);
    frameBooking.customerId = frameBooking.customer.customerId;
    frameBooking.employee = await getRepository(Employee).findOneOrFail(payload.employeeId);
    frameBooking.employeeId = frameBooking.employee.employeeId;
    frameBooking.endTime = payload.endTime ?? undefined;
    frameBooking.occurrence = payload.occurrence;
    frameBooking.startTime = payload.startTime;
    frameBooking.durationInMinutes = payload.durationInMinutes;
    frameBooking.specialInstructions = (payload.specialInstructions);
    frameBooking.privateNotes = (payload.privateNotes);
    await getRepository(FrameBooking).save(frameBooking);
    if (payload.bookingAddons) {
      const promises = payload.bookingAddons.map(async addon => {
        const bookingAddon = new FrameBookingAddon();
        bookingAddon.addon = await getRepository(Addon).findOneOrFail({ where: { addonId: addon.addonId } });
        bookingAddon.numberOfUnits = addon.numberOfUnits;
        bookingAddon.frameBooking = frameBooking;
        return getRepository(FrameBookingAddon).save(bookingAddon);
      });
      await Promise.all(promises);
    }
    const reload = await getRepository(FrameBooking).findOneOrFail(frameBooking.frameBookingId);

    if (!FrameBookingService.isFullyDefinedFrameBooking(reload)) throw new Error(ErrorCode.DATABASE_ERROR);
    return reload;
  }

  async getAll (): Promise<FrameBookingFullyDefined[]> {
    const frameBookings = await getRepository(FrameBooking).find();
    const validatedBookings: FrameBookingFullyDefined[] = frameBookings.map(f => {
      if (!FrameBookingService.isFullyDefinedFrameBooking(f)) throw new Error(ErrorCode.DATABASE_ERROR);
      return f;
    });
    return validatedBookings;
  }

  async findById (frameBookingId: string): Promise<FrameBookingFullyDefined | undefined> {
    const frameBooking = await getRepository(FrameBooking).findOne(frameBookingId);
    if (!frameBooking) return undefined;
    if (!FrameBookingService.isFullyDefinedFrameBooking(frameBooking)) throw new Error(ErrorCode.DATABASE_ERROR);
    return frameBooking;
  }

  async findByCustomerId (customerId: string): Promise<FrameBookingFullyDefined[]> {
    const customer = await getRepository(Customer).findOne(customerId);
    const frameBookings = await getRepository(FrameBooking).find({ where: { customer } });
    const validatedBookings: FrameBookingFullyDefined[] = frameBookings.map(f => {
      if (!FrameBookingService.isFullyDefinedFrameBooking(f)) throw new Error(ErrorCode.DATABASE_ERROR);
      return f;
    });
    return validatedBookings;
  }

  async findByEmployeeId (employeeId: string): Promise<FrameBookingFullyDefined[]> {
    const frameBookings = await getRepository(FrameBooking).find({ where: { employee: { employeeId } } });
    const validatedBookings: FrameBookingFullyDefined[] = frameBookings.map(f => {
      if (!FrameBookingService.isFullyDefinedFrameBooking(f)) throw new Error(ErrorCode.DATABASE_ERROR);
      return f;
    });
    return validatedBookings;
  }
}
