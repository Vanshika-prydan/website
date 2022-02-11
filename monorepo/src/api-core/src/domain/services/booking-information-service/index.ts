import { addMinutes, getDay, getHours, getMinutes } from 'date-fns';
import { injectable } from 'tsyringe';
import { BookingInterface } from '../../entities/Booking';
import { BookingLightInterface } from '../../entities/BookingLight';
import { WeekDayType } from '../../entities/EmployeeDefaultAvailability';
import { FrameBookingInterface } from '../../entities/FrameBooking/IFrameBooking';
import { FrameBookingLightInterface } from '../../entities/FrameBookingLight';

export interface BookingTimeInformation {
    startHour: number;
    endHour:number;
    startMinute: number;
    endMinute:number;
  }

export interface BookingInformation extends BookingTimeInformation {
    weekDay: WeekDayType;
  }

export type AllFrameBookings = FrameBookingInterface | FrameBookingLightInterface;
export type AllBookings = BookingInterface | BookingLightInterface
export type AllBookingTypes = AllFrameBookings | AllBookings;

@injectable()
export default class BookingInformationService {
  public static getWeekDay (booking: AllBookingTypes): WeekDayType {
    const days: WeekDayType[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[getDay(booking.startTime)];
  }

  public static bookingIsFrameBooking (booking: AllBookingTypes): booking is AllFrameBookings {
    return !!(booking as AllFrameBookings).occurrence;
  }

  private static getStartAndEndTimeFromFrameBooking (frameBooking:AllFrameBookings): BookingTimeInformation {
    return {
      startHour: getHours(frameBooking.startTime),
      endHour: getHours(addMinutes(frameBooking.startTime, frameBooking.durationInMinutes)),
      startMinute: getMinutes(frameBooking.startTime),
      endMinute: getMinutes(addMinutes(frameBooking.startTime, frameBooking.durationInMinutes)),
    };
  }

  private static getStartAndEndTimeFromBooking (booking:AllBookings): BookingTimeInformation {
    return {
      startHour: getHours(booking.startTime),
      endHour: getHours(booking.endTime),
      startMinute: getMinutes(booking.startTime),
      endMinute: getMinutes(booking.endTime),
    };
  }

  public static getStartAndEndTime (booking: AllBookingTypes): BookingTimeInformation {
    if (BookingInformationService.bookingIsFrameBooking(booking))
      return BookingInformationService.getStartAndEndTimeFromFrameBooking(booking);
    return BookingInformationService.getStartAndEndTimeFromBooking(booking);
  }

  public static getInformation (booking: AllBookingTypes):BookingInformation {
    return { ...BookingInformationService.getStartAndEndTime(booking), weekDay: BookingInformationService.getWeekDay(booking) };
  }
}
