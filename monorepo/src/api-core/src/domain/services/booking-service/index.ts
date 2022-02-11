import { addMinutes, addWeeks } from 'date-fns';

import validator from 'validator';
import { ErrorCode } from '../../entities/ErrorCode';
import { IBooking } from '../../entities/Booking';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../interface-adapters/repositories/booking-repository';
import { ICreateBookingPayload } from '../../interface-adapters/repositories/booking-repository/create-booking-payload';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/frame-booking-repository';
import { CreateFrameBookingPayload } from '../../interface-adapters/repositories/frame-booking-repository/types';
import { checkAvailability, generateNextTimeFromOccurrence } from '../booking-utils';
import { EmployeeAvailabilityService } from '../employee-availability-service';
import {
  AddAddonEntity,
  CreateBookingRequestPayload,
  CreateFrameBookingRequestPayload,
} from './types';
import { inject, injectable } from 'tsyringe';
import { BookingLightInterface } from '../../entities/BookingLight';
import FrameBookingService from '../frame-booking-service';
import { BookingInterface, BookingWithAddons, BookingWithBookingType, BookingFullyDefined } from '../../entities/Booking/IBooking';
import { FrameBookingFullyDefined } from '../../entities/FrameBooking/IFrameBooking';

export const INVALID_BOOKING_PRIVATE_NOTE = 'INVALID_BOOKING_PRIVATE_NOTE';
export const INVALID_BOOKING_SPECIAL_INSTRUCTIONS = 'INVALID_BOOKING_SPECIAL_INSTRUCTIONS';

@injectable()
export default class BookingService {
  constructor (
    @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
    private readonly employeeAvailabilityService: EmployeeAvailabilityService,
  ) {}

  public static isLightBooking (booking: BookingInterface | BookingLightInterface): booking is BookingLightInterface {
    return !(booking as BookingInterface).addressId;
  }

  private validateAddonsOrFail (bookingAddons: AddAddonEntity[] | undefined): void {
    if (bookingAddons)
      BookingService.validateAddonsOrFail(bookingAddons);
  }

  public static validateAddonsOrFail (bookingAddons: AddAddonEntity[]): void {
    bookingAddons.forEach((addon) => {
      if (
        !validator.isInt(addon.numberOfUnits.toString()) ||
          Number(addon.numberOfUnits) <= 0
      )
        throw new Error(ErrorCode.INVALID_INPUT);
      if (!validator.isUUID(addon.addonId))
        throw new Error(ErrorCode.INVALID_UUID_FORMAT);
    });
  }

  private validateStartTimeOrFail (time: Date): void {
    const startTime = time.getTime();
    const today = new Date();
    if (startTime >= addWeeks(today, 40).getTime()) throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
    if (startTime <= Date.now()) throw new Error(ErrorCode.DATETIME_ERROR);
  }

  private validateEndTimeOrFail (startTime: Date, endTime: Date | undefined): void {
    if (!endTime) return;
    if (endTime.getTime() <= startTime.getTime())
      throw new Error(ErrorCode.DATETIME_ERROR);
  }

  private validateDurationOrFail (durationInMinutes: number): void {
    if (
      !validator.isInt(durationInMinutes.toString()) ||
      durationInMinutes <= 0
    )
      throw new Error(ErrorCode.INVALID_INPUT);
  }

  private validateUuidOrFail (uuid: string): void {
    if (!validator.isUUID(uuid)) throw new Error(ErrorCode.INVALID_UUID_FORMAT);
  }

  public async createBooking (payload: CreateBookingRequestPayload): Promise<IBooking> {
    this.validateAddonsOrFail(payload.bookingAddons);
    const startTime = new Date(payload.startTime);
    this.validateStartTimeOrFail(startTime);
    this.validateDurationOrFail(payload.durationInMinutes);
    const privateNotes = BookingService.ValidateAndFormatPrivateNotes(payload.privateNotes);
    const specialInstructions = BookingService.ValidateAndFormatSpecialInstructions(payload.specialInstructions);
    const endTime = addMinutes(startTime, payload.durationInMinutes);

    const employeeIsAvailable = await this.employeeAvailabilityService.loadAndCheckAvailability({ employee: payload.employeeId, startTime, endTime });

    if (!employeeIsAvailable) throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
    const validatedPyload: ICreateBookingPayload = {
      ...payload,
      startTime,
      privateNotes,
      specialInstructions,
    };
    return this.bookingRepository.create(validatedPyload);
  }

  public async createFrameBooking (payload: CreateFrameBookingRequestPayload): Promise<FrameBookingFullyDefined> {
    if (!FrameBookingService.validateFrameBookingOccurrence(payload.occurrence))
      throw new Error(ErrorCode.INVALID_INPUT);
    this.validateUuidOrFail(payload.customerId);
    this.validateUuidOrFail(payload.addressId);
    this.validateUuidOrFail(payload.employeeId);
    this.validateUuidOrFail(payload.bookingTypeId);
    this.validateAddonsOrFail(payload.bookingAddons);

    const startTime = new Date(payload.startTime);
    this.validateStartTimeOrFail(startTime);
    const endTime = payload.endTime ? new Date(payload.endTime) : undefined;
    this.validateEndTimeOrFail(startTime, endTime);
    this.validateDurationOrFail(payload.durationInMinutes);

    const employeeBookings = await this.bookingRepository.findBookingLightsByEmployee(payload.employeeId);

    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    const TIME_LIMIT_FOR_CREATING_BOOKINGS = addWeeks(today, 52);

    let nextBooking = new Date(startTime);

    const employeeIsAvailable = await this.employeeAvailabilityService.loadAndCheckAvailability({ employee: payload.employeeId, startTime, endTime: addMinutes(startTime, payload.durationInMinutes) });

    if (!employeeIsAvailable) throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);

    while (nextBooking.getTime() < TIME_LIMIT_FOR_CREATING_BOOKINGS.getTime()) {
      if (endTime && nextBooking.getTime() >= endTime.getTime())
        break;
      const endTimeOnSession = addMinutes(startTime, payload.durationInMinutes);

      if (!checkAvailability(employeeBookings, startTime, endTimeOnSession)) throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);

      nextBooking = generateNextTimeFromOccurrence(nextBooking, endTimeOnSession, payload.occurrence).startTime;
    }

    const validatedPayload: CreateFrameBookingPayload = {
      startTime,
      endTime,
      durationInMinutes: payload.durationInMinutes,
      occurrence: payload.occurrence,
      customerId: payload.customerId,
      addressId: payload.addressId,
      employeeId: payload.employeeId,
      bookingTypeId: payload.bookingTypeId,
      bookingAddons: payload.bookingAddons,
      specialInstructions: BookingService.ValidateAndFormatSpecialInstructions(
        payload.specialInstructions,
      ),
      privateNotes: BookingService.ValidateAndFormatPrivateNotes(payload.privateNotes),
    };

    const frameBooking = await this.frameBookingRepository.create(validatedPayload);

    await this.createBookingsFromFrameBooking(frameBooking);

    return frameBooking;
  }

  public async createBookingsFromFrameBooking (frameBooking: FrameBookingFullyDefined): Promise<void> {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    const TIME_LIMIT_FOR_CREATING_BOOKINGS = addWeeks(today, 13);
    const existingBookings = await this.bookingRepository.findBookingLightsByFrameBooking(frameBooking.frameBookingId);
    const newBookings: Promise<IBooking>[] = [];
    let nextBooking = frameBooking.startTime;
    while (nextBooking.getTime() < TIME_LIMIT_FOR_CREATING_BOOKINGS.getTime()) {
      if (frameBooking.endTime && nextBooking.getTime() >= frameBooking.endTime.getTime()) break;
      if (nextBooking.getTime() >= today.getTime()) {
        const bookingAlreadyExists = existingBookings.map(b => b.startTime.getTime()).includes(nextBooking.getTime());
        const payload: ICreateBookingPayload = {
          customerId: frameBooking.customer.customerId,
          frameBookingId: frameBooking.frameBookingId,
          startTime: new Date(nextBooking.getTime()),
          durationInMinutes: frameBooking.durationInMinutes,
          addressId: frameBooking.address.addressId,
          privateNotes: frameBooking.privateNotes ?? undefined,
          specialInstructions: frameBooking.specialInstructions ?? undefined,
          bookingTypeId: frameBooking.bookingType.bookingTypeId,
          employeeId: frameBooking.employee.employeeId,
          bookingAddons: frameBooking.frameBookingAddons?.map((addon) => ({
            addonId: addon.addon.addonId,
            numberOfUnits: addon.numberOfUnits,
          })),
        };
        if (!bookingAlreadyExists) newBookings.push(this.bookingRepository.create(payload));
      }
      nextBooking = generateNextTimeFromOccurrence(nextBooking, addMinutes(nextBooking, frameBooking.durationInMinutes), frameBooking.occurrence).startTime;
    }
    await Promise.all(newBookings);
  }

  public static ValidateAndFormatPrivateNotes (note: string | undefined | null): string | undefined {
    if (note === undefined || note === null) return undefined;
    const formatted = note.trim();
    if (!validator.isLength(formatted, { max: 1000 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }

  public static ValidateAndFormatSpecialInstructions (instructions: string | undefined): string | undefined {
    if (instructions === undefined || instructions === null) return undefined;
    const formatted = instructions.trim();
    if (!validator.isLength(formatted, { max: 1000 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }

  public static isBookingWithBookingType (booking: BookingInterface): booking is BookingWithBookingType {
    return !!booking.bookingType;
  }

  public static isBookingWithAddons (booking: BookingInterface): booking is BookingWithAddons {
    return !!booking.addons;
  }

  public static isFullBooking (booking: BookingInterface): booking is BookingFullyDefined {
    if (!booking.customer) return false;
    if (!booking.address) return false;
    if (!booking.employee) return false;
    if (!booking.bookingType) return false;
    if (!booking.addons) return false;
    return true;
  }

  public async fetchByIdOrFail (bookingId: string):Promise<BookingFullyDefined> {
    const booking = await this.bookingRepository.getById(bookingId);
    if (!booking) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    return booking;
  }
}
