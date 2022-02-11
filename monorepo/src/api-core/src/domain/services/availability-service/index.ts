import { addMinutes } from 'date-fns';
import { injectable } from 'tsyringe';
import { ErrorCode } from '../../entities/ErrorCode';
import { FrameBookingInterface } from '../../entities/FrameBooking/IFrameBooking';
import { FrameBookingLightInterface } from '../../entities/FrameBookingLight';
import { startTimeIsBeforeEndTime } from '../booking-utils';
import { MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES } from '../../config/MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES';

@injectable()
export default class AvailabilityService {
  public static timeSlotHasNoCollisionFrameBookings (frameBookings: FrameBookingInterface[] | FrameBookingLightInterface[], startTime: Date, endTime: Date):boolean {
    if (!startTimeIsBeforeEndTime(startTime, endTime)) throw new Error(ErrorCode.CONSTRAINT_VIOLATED);

    let timeIsAvailable = true;
    for (const fb of frameBookings) {
      const occupiedStartTime = addMinutes(fb.startTime, -MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES);
      const occupiedEndTime = addMinutes(fb.startTime, fb.durationInMinutes + MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES);

      const occupiedStartTimeMS = occupiedStartTime.getTime();
      const occupiedEndTimeMS = occupiedEndTime.getTime();
      const startTimeMS = startTime.getTime();
      const endTimeMS = endTime.getTime();

      const startTimeIsOccipied = occupiedStartTimeMS < startTimeMS && startTimeMS < occupiedEndTimeMS;
      const endTimeIsOccupied = occupiedStartTimeMS < endTimeMS && endTimeMS < occupiedEndTimeMS;
      if (startTimeIsOccipied || endTimeIsOccupied) {
        timeIsAvailable = false;
        break;
      }
    }
    return timeIsAvailable;
  }
}
