import { addDays, addHours, addMinutes, addWeeks } from 'date-fns';
import { checkAvailability, checkRepeatedAvailability, getAvailableEmployeesForATimeSlot, getDurationInMinutesFromBooking, getOccupiedEmployeesForATimeSlotFromBookings, selectBookingsWithinATimeSlot, startTimeIsBeforeEndTime, timeIsInConflictWithTheBooking } from '.';
import { mockBooking } from '../../../../mock/booking';
import { mockEmployee } from '../../../../mock/employee';
import { ErrorCode } from '../../entities/ErrorCode';
import { IBooking } from '../../entities/Booking';
import { IEmployee } from '../../entities/Employee';

describe('Booking utils', () => {
  describe('timeIsInConflictWithTheBooking', () => {
    let booking: IBooking;
    const referenceTime = new Date('2021-05-14T06:46:56.144Z');
    beforeEach(() => {
      const startTime = referenceTime;
      const endTime = addHours(referenceTime, 3);
      booking = Object.freeze({ ...mockBooking, startTime, endTime });
    });
    it('should be a conflict if the start time is between the end time', () => {
      const startTime = addMinutes(referenceTime, 30);
      const endTime = addMinutes(referenceTime, 120);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, booking)).toBe(true);
    });
    it('should not be a conflict if the time collisions with with the booking time but it is cancelled', () => {
      const startTime = addMinutes(referenceTime, 30);
      const endTime = addMinutes(referenceTime, 120);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, { ...booking, cancelledAt: new Date() })).toBe(false);
    });
    it('should be a conflict if the start time less than one hour before the start', () => {
      const startTime = addMinutes(referenceTime, -20);
      const endTime = addMinutes(referenceTime, 1);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, booking)).toBe(true);
    });
    it('should be a conflict if the end time is between the end time', () => {
      const startTime = addMinutes(referenceTime, -300);
      const endTime = addMinutes(referenceTime, 120);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, booking)).toBe(true);
    });
    it('should not be a conflict if the start time is one hour after the end time', () => {
      const startTime = addHours(referenceTime, 4);
      const endTime = addHours(referenceTime, 6);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, booking)).toBe(false);
    });
    it('should not be a conflict if the end time is one hour before the start time', () => {
      const startTime = addHours(referenceTime, -3);
      const endTime = addHours(referenceTime, -1);
      expect(timeIsInConflictWithTheBooking(startTime, endTime, booking)).toBe(false);
    });
  });
  describe('selectBookingsWithinATimeSlot', () => {
    it('should return one object', () => {
      const referenceTime = new Date('2021-05-14T06:46:56.144Z');
      const correct: IBooking = { ...mockBooking, startTime: referenceTime, endTime: addHours(referenceTime, 5) };
      const incorrect: IBooking = { ...mockBooking, startTime: addDays(referenceTime, 2), endTime: addDays(referenceTime, 3) };
      const bookings:IBooking[] = [correct, incorrect];
      expect(selectBookingsWithinATimeSlot(referenceTime, addHours(referenceTime, 4), bookings)).toStrictEqual([correct]);
    });
  });

  describe('getOccupiedEmployeesForATimeSlotFromBookings', () => {
    it('should return an employee', () => {
      const referenceTime = new Date('2021-05-14T06:46:56.144Z');
      const bookings: IBooking[] = [{ ...mockBooking, startTime: referenceTime, endTime: addHours(referenceTime, 5), employee: mockEmployee }];
      expect(getOccupiedEmployeesForATimeSlotFromBookings(referenceTime, addHours(referenceTime, 4), bookings)).toStrictEqual([mockEmployee]);
    });
  });
  describe('startTimeIsBeforeEndTime', () => {
    const referenceTime = new Date('2021-05-14T06:46:56.144Z');
    it('Should be true if the start time is before the end time', () => {
      expect(startTimeIsBeforeEndTime(referenceTime, addMinutes(referenceTime, 120))).toBe(true);
    });
    it('Should be false if the start end end time is the same', () => {
      expect(startTimeIsBeforeEndTime(referenceTime, referenceTime)).toBe(false);
    });
    it('Should be false if the end time is before the start time', () => {
      expect(startTimeIsBeforeEndTime(referenceTime, addMinutes(referenceTime, -120))).toBe(false);
    });
  });

  describe('getAvailableEmployeesForATimeSlot', () => {
    const referenceTime = new Date('2021-05-14T06:46:56.144Z');
    it('should  return one employee', () => {
      const allEmployees:IEmployee[] = [{ ...mockEmployee }, { ...mockEmployee, employeeId: '123' }];
      const bookings:IBooking[] = [{ ...mockBooking, startTime: referenceTime, endTime: addHours(referenceTime, 5) }];
      expect(getAvailableEmployeesForATimeSlot(referenceTime, addMinutes(referenceTime, 60), allEmployees, bookings)).toEqual([{ ...mockEmployee, employeeId: '123' }]);
    });
  });

  describe('checkAvailability', () => {
    const bookings:IBooking[] = [
      Object.freeze(
        {
          ...mockBooking,
          startTime: new Date('2021-03-29T14:38:24.681Z'),
          endTime: new Date('2021-03-29T16:38:24.681Z'),
        }),
    ];
    it('StartTime must be before the endTime, o/w throw an error', () => {
      const startTime = new Date('2021-04-29T14:38:24.681Z');
      const endTime = new Date('2021-03-29T14:38:24.681Z');
      expect(() => checkAvailability(bookings, startTime, endTime)).toThrowError(ErrorCode.DATETIME_ERROR);
    });
    it('should return true if the employee is available', async () => {
      const startTime = new Date('2021-04-29T14:38:24.681Z');
      const endTime = new Date('2021-04-29T15:38:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(true);
    });
    it('should return false if the employee is occupied the exact same time', async () => {
      const startTime = new Date('2021-03-29T14:38:24.681Z');
      const endTime = new Date('2021-03-29T16:38:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(false);
    });
    it('should return false if the employee is occupied on the wished start time but not in the end time', async () => {
      const startTime = new Date('2021-03-29T16:37:24.681Z');
      const endTime = new Date('2021-03-29T18:38:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(false);
    });
    it('should return false if the employee is available from start but then is occupied on the tme', async () => {
      const startTime = new Date('2021-03-29T13:38:24.681Z');
      const endTime = new Date('2021-03-29T15:38:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(false);
    });
    it('Should return false if the gap from the previous booking is less than 45 min', async () => {
      const startTime = new Date('2021-03-29T17:10:24.681Z');
      const endTime = new Date('2021-03-29T18:38:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(false);
    });
    it('Should return false if it is less than one hour from the end time to the next booking', async () => {
      const startTime = new Date('2021-03-29T12:00:24.681Z');
      const endTime = new Date('2021-03-29T13:55:24.681Z');
      expect(checkAvailability(bookings, startTime, endTime)).toBe(false);
    });
  });

  describe('checkRepeatedAvailability', () => {
    const referenceStartTime = new Date('2021-05-17T06:11:58.088Z');
    const referenceEndTime = addHours(referenceStartTime, 2);

    it('should return true when no bookings exists', () => {
      const bookings: IBooking[] = [];
      expect(checkRepeatedAvailability({ bookings, startTime: referenceStartTime, endTime: referenceEndTime, occurrence: 'weekly' })).toBeTruthy();
    });
    it('should return false when a booking exists', () => {
      const bookings: IBooking[] = [{ ...mockBooking, startTime: addWeeks(referenceStartTime, 5), endTime: addWeeks(referenceEndTime, 5) }];
      expect(checkRepeatedAvailability({ bookings, startTime: referenceStartTime, endTime: referenceEndTime, occurrence: 'weekly' })).toBeFalsy();
    });
  });

  describe('getDurationInMinutesFromBooking', () => {
    it('Should return 60 min for the duration', () => {
      const startTime = new Date();
      const endTime = addMinutes(startTime, 60);
      const booking = { ...mockBooking, startTime, endTime };

      expect(getDurationInMinutesFromBooking(booking)).toBe(60);
    });
  });
});
