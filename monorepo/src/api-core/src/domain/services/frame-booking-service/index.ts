import { inject, injectable } from 'tsyringe';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/frame-booking-repository';
import { WeekDayType } from '../../entities/EmployeeDefaultAvailability';
import { FrameBookingFullyDefined, FrameBookingInterface } from '../../entities/FrameBooking/IFrameBooking';
import { Occurrence, OccurrenceType } from '../../entities/Occurrence';
import BookingInformationService, { BookingTimeInformation } from '../booking-information-service';
import { FrameBookingLightInterface } from '../../entities/FrameBookingLight';
import { addMinutes } from 'date-fns';
import { generateNextTimeFromOccurrence } from '../booking-utils';
import { ErrorCode } from '../../entities/ErrorCode';

export interface OccurrenceInformation extends BookingTimeInformation {
  occurrence: OccurrenceType;
  weekDay: WeekDayType;
  endTime?: Date;
  isActive: boolean;
}
@injectable()
export default class FrameBookingService {
  constructor (@inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository) {}
  public async fetchByIdOrFail (frameBookingId:string):Promise<FrameBookingFullyDefined> {
    const frameBooking = await this.frameBookingRepository.findById(frameBookingId);
    if (!frameBooking) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    return frameBooking;
  }

  public static validateFrameBookingOccurrence (occurrence: unknown):boolean {
    return Object.values(Occurrence).includes(occurrence as OccurrenceType);
  }

  public static getOccurrenceInformation (frameBooking: FrameBookingInterface):OccurrenceInformation {
    return {
      ...BookingInformationService.getInformation(frameBooking),
      occurrence: frameBooking.occurrence,
      endTime: frameBooking.endTime,
      isActive: frameBooking.endTime ? frameBooking.endTime.getTime() < Date.now() : true,
    };
  }

  public static isFullyDefinedFrameBooking (frameBooking: FrameBookingInterface): frameBooking is FrameBookingFullyDefined {
    if (!frameBooking.customer) return false;
    if (!frameBooking.address) return false;
    if (!frameBooking.employee) return false;
    if (!frameBooking.bookingType) return false;
    if (!frameBooking.frameBookingAddons) return false;
    return true;
  }

  public static getNextUpcomingDate (frameBooking: FrameBookingInterface | FrameBookingLightInterface):{startTime:Date; endTime:Date} {
    let currentStartTime = frameBooking.startTime;
    while (true) {
      if (currentStartTime.getTime() > Date.now()) break;
      currentStartTime = generateNextTimeFromOccurrence(currentStartTime, addMinutes(currentStartTime, frameBooking.durationInMinutes), frameBooking.occurrence).startTime;
    }
    return {
      startTime: currentStartTime,
      endTime: addMinutes(currentStartTime, frameBooking.durationInMinutes),
    };
  }
}
