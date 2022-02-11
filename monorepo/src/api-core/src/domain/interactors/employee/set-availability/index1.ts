import { inject, injectable } from 'tsyringe';
import { IEmployee } from '../../../entities/Employee';
import { EmployeeDefaultAvailability, WeekDayType } from '../../../entities/EmployeeDefaultAvailability';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import EmployeeDefaultAvailabilityService from '../../../services/employee-default-availability-service';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/frame-booking-repository';
import { ErrorCode } from '../../../entities/ErrorCode';

export interface Availability {
    day: WeekDayType;
    startHour: number;
    startMinute?: number;
    endHour: number;
    endMinute?:number;
}

export interface RequestPayload {
    employee: IEmployee;
    availability: Availability[];
}

@injectable()
export default class SetDefaultEmployeeAvailabilityUseCase {
  constructor (
      @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly availabilityRepository: EmployeeDefaultAvailabilityRepositoryInterface,
      private readonly employeeDefaultAvailabilityService: EmployeeDefaultAvailabilityService,
  ) {}

  async execute (payload: RequestPayload):Promise<EmployeeDefaultAvailability[]> {
    const availability = payload.availability.map(a => new EmployeeDefaultAvailability({ day: a.day, employeeId: payload.employee.employeeId, endHour: a.endHour, endMinute: a.endMinute, startHour: a.startHour, startMinute: a.startMinute }));
    await this.validateAvailabilityOrFail(availability);

    if (!(await this.employeeDefaultAvailabilityService.hasCollisionsWithExistingBookings(payload.employee.employeeId, availability))) throw new Error(ErrorCode.CONSTRAINT_VIOLATED);

    await this.availabilityRepository.save({ employeeId: payload.employee.employeeId, availability });
    return availability;
  }

  private async validateAvailabilityOrFail (availability: EmployeeDefaultAvailability[]) {
    const promises: Promise<void>[] = [];
    availability.forEach(async (a) => promises.push(EmployeeDefaultAvailabilityService.validateOrFail(a)));
    await Promise.all(promises);
  }
}
