import { injectable } from 'tsyringe';
import { BookingFullyDefined } from '../../entities/Booking';
import { FrameBookingFullyDefined } from '../../entities/FrameBooking/IFrameBooking';
import NewBookingNotificationService from './new-booking-notification-service';
import { UpdateEmployeeToFrameBooking } from './update-employee-to-frame-booking';

@injectable()
export default class BookingServiceFacade {
  constructor (
    private readonly updateEmployeeToFrameBookingService: UpdateEmployeeToFrameBooking,
    private readonly newBookingNotificationService: NewBookingNotificationService,
  ) { }

  public updateEmployeeToFrameBooking (frameBookingId: string, employeeId: string) {
    return this.updateEmployeeToFrameBookingService.execute(frameBookingId, employeeId);
  }

  public sendNewBookingNotification (booking: FrameBookingFullyDefined | BookingFullyDefined):Promise<void> {
    return this.newBookingNotificationService.execute(booking);
  }
}
