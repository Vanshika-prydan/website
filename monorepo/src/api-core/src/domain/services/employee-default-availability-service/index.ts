import { validateOrReject } from 'class-validator';
import { getDay, set } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../interface-adapters/repositories/booking-repository';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/employee-default-availability-repository';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/frame-booking-repository';
import { BookingInterface } from '../../entities/Booking';
import { BookingLightInterface } from '../../entities/BookingLight';
import { EmployeeDefaultAvailability, EmployeeDefaultAvailabilityInterface, WeekDayType } from '../../entities/EmployeeDefaultAvailability';
import { ErrorCode } from '../../entities/ErrorCode';
import { FrameBookingInterface } from '../../entities/FrameBooking/IFrameBooking';
import { FrameBookingLightInterface } from '../../entities/FrameBookingLight';
import BookingInformationService, { BookingInformation } from '../booking-information-service';

@injectable()
export default class EmployeeDefaultAvailabilityService {
  constructor (
    @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly repository: EmployeeDefaultAvailabilityRepositoryInterface,
    @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
  ) {}

  public static async validateOrFail (payload:EmployeeDefaultAvailabilityInterface):Promise<void> {
    if (!(await this.validate(payload))) throw new Error(ErrorCode.INVALID_INPUT);
  }

  private static startTimeIsBeforeEndTime (payload:EmployeeDefaultAvailability): boolean {
    return payload.startHour < payload.endHour;
  }

  public static async validate (payload:EmployeeDefaultAvailabilityInterface):Promise<boolean> {
    const obj = new EmployeeDefaultAvailability(payload);
    if (!this.startTimeIsBeforeEndTime(obj)) return false;
    try {
      await validateOrReject(obj);
      return true;
    } catch (e) {
      return false;
    }
  }

  public static isAvailable (availability: EmployeeDefaultAvailabilityInterface[], startTime: Date, endTime: Date):boolean {
    if (availability.length === 0) return false;
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const startDay: WeekDayType = days[getDay(startTime)] as WeekDayType;
    const endDay:WeekDayType = days[getDay(endTime)] as WeekDayType;
    if (startDay !== endDay) return false;
    const avail = availability.find(a => a.day === startDay);
    if (!avail) return false;
    const empStartTime = set(startTime, { hours: avail.startHour, minutes: avail.endMinute, milliseconds: 0, seconds: 0 });
    const empEndTime = set(endTime, { hours: avail.endHour, minutes: avail.endMinute, milliseconds: 0, seconds: 0 });
    if (startTime.getTime() < empStartTime.getTime()) return false;
    if (endTime.getTime() > empEndTime.getTime()) return false;
    return true;
  }

  public static hasCollisioningFrameBookings (availability: EmployeeDefaultAvailabilityInterface[], frameBookings: FrameBookingInterface[] | FrameBookingLightInterface[]): boolean {
    if (frameBookings.length === 0) return false;

    for (const fb of frameBookings) {
      if (fb.endTime && fb.endTime.getTime() < Date.now()) continue;
      const info = BookingInformationService.getInformation(fb);
      if (EmployeeDefaultAvailabilityService.timeHasCollisionWithAvailability(availability, info)) return true;
    }
    return false;
  }

  private static timeHasCollisionWithAvailability (availability: EmployeeDefaultAvailabilityInterface[], info: BookingInformation) {
    return availability.filter(a => {
      if (a.day !== info.weekDay) return false;
      if (info.startHour < a.startHour) return false;
      if (info.endHour > a.endHour) return false;
      if (info.startHour === a.startHour && info.startMinute < a.startMinute) return false;
      if (info.endHour === a.endHour && info.endMinute > a.endMinute) return false;
      return true;
    }).length === 0;
  }

  public static hasCollisioningBookings (availability: EmployeeDefaultAvailabilityInterface[], bookings: BookingInterface[] | BookingLightInterface[]): boolean {
    if (bookings.length === 0) return false;

    for (const b of bookings) {
      if (b.endTime.getTime() < Date.now()) continue;
      if (b.cancelledAt) continue;
      const info = BookingInformationService.getInformation(b);
      if (EmployeeDefaultAvailabilityService.timeHasCollisionWithAvailability(availability, info)) return true;
    }
    return false;
  }

  public async hasCollisionsWithExistingBookings (employeeId:string, availability:EmployeeDefaultAvailabilityInterface[]) {
    const frameBookings = await this.frameBookingRepository.findFrameBookingLightByEmployeeId(employeeId);
    if (EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)) return false;
    const bookings = await this.bookingRepository.findBookingLightsByEmployee(employeeId);
    if (EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, bookings)) return false;

    return true;
  }
}
