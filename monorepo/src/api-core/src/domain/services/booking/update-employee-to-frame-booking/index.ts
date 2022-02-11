import { inject, injectable } from 'tsyringe';
import { BookingLightInterface } from '../../../entities/BookingLight';
import { EmployeeDefaultAvailabilityInterface } from '../../../entities/EmployeeDefaultAvailability';
import { ErrorCode } from '../../../entities/ErrorCode';
import { FrameBookingInterface } from '../../../entities/FrameBooking/IFrameBooking';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import { EMPLOYEE_REPOSITORY_INTERFACE, IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/frame-booking-repository';
import { checkAvailability } from '../../booking-utils';
import EmployeeDefaultAvailabilityService from '../../employee-default-availability-service';
import FrameBookingService from '../../frame-booking-service';

@injectable()
export class UpdateEmployeeToFrameBooking {
  constructor (
    private readonly frameBookingService: FrameBookingService,
    @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
    @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly employeeDefaultAvailabilityRepository: EmployeeDefaultAvailabilityRepositoryInterface,
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
    @inject(EMPLOYEE_REPOSITORY_INTERFACE) private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute (frameBookingId: string, employeeId: string) {
    const frameBooking = await this.frameBookingService.fetchByIdOrFail(frameBookingId);
    if (frameBooking.employeeId === employeeId) return frameBooking;

    const employeeDefaultAvailability = await this.employeeDefaultAvailabilityRepository.fetchByEmployee(employeeId);

    this.checkWithEmployeeDefaultAvailabilityOrFail(employeeDefaultAvailability, frameBooking);

    const affectedBookings = await this.loadAffectedBookingsFromFrameBooking(frameBookingId);

    await this.checkFrameBookingsWithEmployeeBookingsOrFail(employeeId, affectedBookings);

    await this.updateEmployeeToFrameBookingAndSave(employeeId, frameBooking);
    await this.updateEmployeeInBookingsAndSave(affectedBookings, employeeId);
  }

  private async updateEmployeeToFrameBookingAndSave (employeeId: string, frameBooking: FrameBookingInterface) {
    const employee = await this.employeeRepository.fetchByIdOrFail(employeeId);
    await this.frameBookingRepository.save({ ...frameBooking, employee, employeeId });
  }

  private async updateEmployeeInBookingsAndSave (affectedBookings: BookingLightInterface[], employeeId: string) {
    for (const b of affectedBookings)
      await this.bookingRepository.saveLight({ ...b, employeeId });
  }

  private async checkFrameBookingsWithEmployeeBookingsOrFail (employeeId: string, affectedBookings: BookingLightInterface[]) {
    const employeeBookings = await this.bookingRepository.findBookingLightsByEmployee(employeeId);

    for (const b of affectedBookings)
      if (!checkAvailability(employeeBookings, b.startTime, b.endTime))
        throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
  }

  private async loadAffectedBookingsFromFrameBooking (frameBookingId: string) {
    const bookings = await this.bookingRepository.findBookingLightsByFrameBooking(frameBookingId);
    const affectedBookings = bookings.filter(this.bookingHasNotYetStartedAndIsNotCancelled);
    return affectedBookings;
  }

  private bookingHasNotYetStartedAndIsNotCancelled (booking:BookingLightInterface):boolean {
    return (booking.startTime.getTime() > Date.now() && !booking.cancelledAt);
  };

  private checkWithEmployeeDefaultAvailabilityOrFail (employeeDefaultAvailability: EmployeeDefaultAvailabilityInterface[], frameBooking: FrameBookingInterface) {
    if (EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(employeeDefaultAvailability, [frameBooking]))
      throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
  }
}
