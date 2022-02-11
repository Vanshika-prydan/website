import { Occurrence, OccurrenceType } from '../../entities/Occurrence';
import { IBooking } from '../../entities/Booking/IBooking';
import { IEmployee } from '../../entities/Employee';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../interface-adapters/repositories/booking-repository';
import { checkAvailability, checkRepeatedAvailability } from '../booking-utils';
import EmployeeService from '../employee-service';
import { inject, injectable } from 'tsyringe';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/employee-default-availability-repository';
import { EmployeeDefaultAvailabilityInterface } from '../../entities/EmployeeDefaultAvailability';
import EmployeeDefaultAvailabilityService from '../employee-default-availability-service';
import { BookingLightInterface } from '../../entities/BookingLight';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/frame-booking-repository';

@injectable()
export class EmployeeAvailabilityService {
  constructor (
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
    @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly availabilityRepository: EmployeeDefaultAvailabilityRepositoryInterface,
    @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
  ) {}

  public async loadAndCheckAvailability ({ employee, startTime, endTime }:{ employee: IEmployee | string, startTime:Date, endTime:Date }):Promise<boolean> {
    const employeeId = EmployeeService.isEmployee(employee) ? employee.employeeId : employee;
    const employeeBookings = await this.bookingRepository.findBookingLightsByEmployee(employeeId);
    const availability = await this.availabilityRepository.fetchByEmployee(employeeId);
    return EmployeeAvailabilityService.checkAvailabilityWithSchedule(availability, employeeBookings, startTime, endTime);
  }

  public static checkAvailabilityWithSchedule (employeeDefaultAvailability:EmployeeDefaultAvailabilityInterface[], employeeBookings: IBooking[] | BookingLightInterface[], startTime: Date, endTime: Date):boolean {
    if (!EmployeeDefaultAvailabilityService.isAvailable(employeeDefaultAvailability, startTime, endTime)) return false;
    return checkAvailability(employeeBookings, startTime, endTime);
  }

  public static checkEmployeeAvailability (allBookings: IBooking[] | BookingLightInterface[], employee: IEmployee, employeeDefaultAvailability: EmployeeDefaultAvailabilityInterface[], startTime: Date, endTime: Date, occurrence :OccurrenceType):boolean {
    if (!EmployeeDefaultAvailabilityService.isAvailable(employeeDefaultAvailability, startTime, endTime)) return false;
    const employeeBookings: IBooking[] | BookingLightInterface[] = EmployeeAvailabilityService.filterBookingsByEmployee(allBookings, employee);
    if (occurrence === Occurrence.ONETIME) return checkAvailability(employeeBookings, startTime, endTime);
    else return checkRepeatedAvailability({ bookings: employeeBookings, startTime, endTime, occurrence });
  }

  private static filterBookingsByEmployee (allBookings: IBooking[] | BookingLightInterface[], employee: IEmployee): IBooking[] | BookingLightInterface[] {
    // @ts-ignore
    return allBookings.filter((b: IBooking | BookingLightInterface) =>
      b.employeeId === employee.employeeId,
    );
  }

  public static hasNoCollisionFrameBookings () {}
}

export default EmployeeAvailabilityService;
