import { addMinutes, addWeeks } from 'date-fns';
import { ErrorCode } from '../../entities/ErrorCode';
import { Occurrence, OccurrenceType } from '../../entities/Occurrence';
import { IBooking } from '../../entities/Booking';
import { BookingLightInterface } from '../../entities/BookingLight';
import { IEmployee } from '../../entities/Employee';
import { MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES } from '../../config/MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES';

type Bookings = IBooking[] | BookingLightInterface[];

export function timeIsInConflictWithTheBooking (startTime: Date, endTime: Date, booking: IBooking | BookingLightInterface):boolean {
  if (booking.cancelledAt) return false;

  const occupiedStartTime = addMinutes(booking.startTime, -MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES);
  const occupiedEndTime = addMinutes(booking.endTime, MINIMUM_TIME_BETWEEN_BOOKINGS_IN_MINUTES);

  const occupiedStartTimeMS = occupiedStartTime.getTime();
  const occupiedEndTimeMS = occupiedEndTime.getTime();
  const startTimeMS = startTime.getTime();
  const endTimeMS = endTime.getTime();

  const startTimeIsOccipied = occupiedStartTimeMS < startTimeMS && startTimeMS < occupiedEndTimeMS;
  const endTimeIsOccupied = occupiedStartTimeMS < endTimeMS && endTimeMS < occupiedEndTimeMS;
  return startTimeIsOccipied || endTimeIsOccupied;
}

export function selectBookingsWithinATimeSlot (startTime: Date, endTime: Date, bookings: IBooking[]): IBooking[] {
  return bookings.filter(b => timeIsInConflictWithTheBooking(startTime, endTime, b));
}

export function getOccupiedEmployeesForATimeSlotFromBookings (startTime: Date, endTime: Date, bookings: IBooking[]):IEmployee[] {
  return selectBookingsWithinATimeSlot(startTime, endTime, bookings).map(b => b.employee);
}
export function getAvailableEmployeesForATimeSlot (startTime: Date, endTime: Date, employees: IEmployee[], bookings: IBooking[]): IEmployee[] {
  const occupiedEmployees = getOccupiedEmployeesForATimeSlotFromBookings(startTime, endTime, bookings);
  return employees.filter(e => !occupiedEmployees.map(b => b.employeeId).includes(e.employeeId));
}

export function startTimeIsBeforeEndTime (startTime: Date, endTime: Date): boolean {
  return startTime.getTime() < endTime.getTime();
}

export function generateNextTimeFromOccurrence (startTime: Date, endTime:Date, occurrence: OccurrenceType) {
  let newStartTime: Date;
  let newEndTime: Date;
  switch (occurrence) {
    case Occurrence.WEEKLY:
      newStartTime = addWeeks(startTime, 1);
      newEndTime = addWeeks(endTime, 1);
      break;

    case Occurrence.BIWEEKLY:
      newStartTime = addWeeks(startTime, 2);
      newEndTime = addWeeks(endTime, 2);
      break;

    case Occurrence.FOURWEEKLY:
      newStartTime = addWeeks(startTime, 4);
      newEndTime = addWeeks(endTime, 4);
      break;
    default:
      throw new Error('Not defined');
  }

  return {
    startTime: newStartTime,
    endTime: newEndTime,
  };
}

export function checkAvailability (bookings: Bookings, startTime:Date, endTime:Date):boolean {
  if (!startTimeIsBeforeEndTime(startTime, endTime)) throw new Error(ErrorCode.DATETIME_ERROR);
  let isAvailable = true;
  let i:number;
  for (i = 0; i < bookings.length; i++) {
    const b = bookings[i];
    if (timeIsInConflictWithTheBooking(startTime, endTime, b)) {
      isAvailable = false;
      break;
    }
  }
  return isAvailable;
}

export function checkRepeatedAvailability ({ bookings, startTime, endTime, occurrence }:{bookings: Bookings, startTime: Date, endTime: Date, occurrence :OccurrenceType}): boolean {
  if (occurrence === Occurrence.ONETIME) throw new Error('Cannot assign no frame booking');
  let isAvailable = true;
  const LOOP_END_TIME_IN_WEEKS = 13;
  let currentStartTime = new Date(startTime);
  let currentEndTime = new Date(endTime);
  while (currentStartTime < addWeeks(new Date(), LOOP_END_TIME_IN_WEEKS)) {
    isAvailable = checkAvailability(bookings, currentStartTime, currentEndTime);
    if (!isAvailable) break;
    const n = generateNextTimeFromOccurrence(currentStartTime, currentEndTime, occurrence);
    currentStartTime = n.startTime;
    currentEndTime = n.endTime;
  }
  return isAvailable;
}

export function getDurationInMinutesFromBooking (booking:IBooking):number {
  return ((booking.endTime.getTime() - booking.startTime.getTime()) / (60 * 1000));
}
