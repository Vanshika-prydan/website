import { WeekDay, EmployeeDefaultAvailability } from '../../entities/EmployeeDefaultAvailability';
import MockEmployeeDefaultAvailability from '../../entities/EmployeeDefaultAvailability/MockEmployeeDefaultAvailability';
import EmployeeDefaultAvailabilityService from '.';
import { MockFrameBooking } from '../../entities/FrameBooking';
import { MockBooking } from '../../entities/Booking';

describe('EmployeeDefaultAvailabilityService', () => {
  describe('Validation', () => {
    it('should return true for a valid input', async () => {
      const payload = new EmployeeDefaultAvailability({ day: WeekDay.SUNDAY, employeeId: 'aa82374e-ef8a-4870-9e07-6668e8dbd6ae', startHour: 10, endHour: 12 });
      await expect(EmployeeDefaultAvailabilityService.validate(payload)).resolves.toBeTruthy();
    });
    it('should validate a correct input', async () => {
      const payload = new EmployeeDefaultAvailability({ day: WeekDay.SUNDAY, employeeId: 'aa82374e-ef8a-4870-9e07-6668e8dbd6ae', startHour: 10, endHour: 12 });
      await (EmployeeDefaultAvailabilityService.validateOrFail(payload));
    });

    it('should return false for an invalid input', async () => {
      const payload = new EmployeeDefaultAvailability({ day: WeekDay.SUNDAY, employeeId: 'aa82374e-ef8a-4870-9e07-6668e8dbd6ae', startHour: -2, endHour: 10 });
      await expect(EmployeeDefaultAvailabilityService.validate(payload)).resolves.toBeFalsy();
    });
    it('should throw an error for an invalid input', async () => {
      const payload = new EmployeeDefaultAvailability({ day: WeekDay.SUNDAY, employeeId: 'aa82374e-ef8a-4870-9e07-6668e8dbd6ae', startHour: -2, endHour: 10 });
      await expect(EmployeeDefaultAvailabilityService.validateOrFail(payload)).rejects.toThrow();
    });
    it('should be invalid if the start time ', async () => {
      const payload = new EmployeeDefaultAvailability({ day: WeekDay.SUNDAY, employeeId: 'aa82374e-ef8a-4870-9e07-6668e8dbd6ae', startHour: 12, endHour: 10 });
      await expect(EmployeeDefaultAvailabilityService.validate(payload)).resolves.toBeFalsy();
    });
  });

  describe('isAvailable', () => {
    const startTimeOnFriday = new Date('2025-02-07T11:00:00.000Z');
    const endTime = new Date('2025-02-07T14:00:00.000Z');
    const endTimeOnSaturday = new Date('2025-02-08T11:00:00.000Z');

    it('Should return false if the time is over two days', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'MONDAY' }), new MockEmployeeDefaultAvailability({ day: 'TUESDAY' })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, startTimeOnFriday, endTimeOnSaturday)).toBe(false);
    });

    it('should return false for an empty array of availability', () => {
      expect(EmployeeDefaultAvailabilityService.isAvailable([], startTimeOnFriday, endTime)).toBe(false);
    });

    it('should return false for another day', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'MONDAY' }), new MockEmployeeDefaultAvailability({ day: 'TUESDAY' })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, startTimeOnFriday, endTime)).toBe(false);
    });

    it('should return true when the day is available and the time is within the given time', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'MONDAY' }), new MockEmployeeDefaultAvailability({ day: 'FRIDAY' })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, startTimeOnFriday, endTime)).toBe(true);
    });

    it('should return false when the start time is ok but the end time is out', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'FRIDAY', startHour: 7, endHour: 12 })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, startTimeOnFriday, endTime)).toBe(false);
    });
    it('should return false when the start time is out of time but the end time is ok', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'FRIDAY', startHour: 14, endHour: 23 })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, startTimeOnFriday, endTime)).toBe(false);
    });

    it('should work with a start time om the exact same start time', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'FRIDAY', startHour: 8 })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, new Date('2025-02-07T07:00:00.000Z'), endTime)).toBe(true);
    });
    it('should return false with a start time on the hour before the start time of the employee', () => {
      const availability = [new MockEmployeeDefaultAvailability({ day: 'FRIDAY', startHour: 8 })];
      expect(EmployeeDefaultAvailabilityService.isAvailable(availability, new Date('2025-02-06T07:00:00.000Z'), endTime)).toBe(false);
    });
  });

  describe('hasCollisioningFrameBookings', () => {
    const availability = [
      new MockEmployeeDefaultAvailability({ day: 'MONDAY', startHour: 12, endHour: 17, startMinute: 30, endMinute: 30 }),
      new MockEmployeeDefaultAvailability({ day: 'TUESDAY', startHour: 8, endHour: 17 })];
    it('should return false if there is no frame framebookings available', () => {
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, [])).toBe(false);
    });
    it('Should return false if if there is no collisions', () => {
      const frameBookings = [
        new MockFrameBooking({ startTime: new Date('2021-09-20T10:30:00.000Z'), durationInMinutes: 300 }),
        new MockFrameBooking({ startTime: new Date('2021-09-21T12:30:00.000Z'), durationInMinutes: 90 }),
      ];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)).toBe(false);
    });
    it('Should return false if if the frame booking has ended', () => {
      const frameBookings = [
        new MockFrameBooking({ startTime: new Date('2021-06-24T10:30:00.000Z'), durationInMinutes: 90, endTime: new Date('2021-09-01T10:30:00.000Z') }),
      ];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)).toBe(false);
    });
    it('Should return true if the availability is not on the same day for one of the frame bookings', () => {
      const frameBookings = [
        new MockFrameBooking({ startTime: new Date('2021-09-21T12:30:00.000Z'), durationInMinutes: 90 }),
        new MockFrameBooking({ startTime: new Date('2021-09-23T12:30:00.000Z'), durationInMinutes: 90 }),
      ];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)).toBe(true);
    });
    it('Should return true if the availability is on the same day but  before the time', () => {
      const frameBookings = [new MockFrameBooking({ startTime: new Date('2021-09-21T05:00:00.000Z'), durationInMinutes: 90 })];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)).toBe(true);
    });
    it('Should return true if the availability is on the same day but  after the time', () => {
      const frameBookings = [new MockFrameBooking({ startTime: new Date('2021-09-21T14:00:00.000Z'), durationInMinutes: 150 })];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningFrameBookings(availability, frameBookings)).toBe(true);
    });
  });

  describe('hasCollisioningBookings (test with aug 2030)', () => {
    const availability = [
      new MockEmployeeDefaultAvailability({ day: 'MONDAY', startHour: 12, endHour: 17, startMinute: 30, endMinute: 30 }),
      new MockEmployeeDefaultAvailability({ day: 'TUESDAY', startHour: 8, endHour: 17 }),
    ];
    it('Should return false if there is no bookings in the list of bookings', () => {
      expect(EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, [])).toBe(false);
    });

    it('Should return false if there is an old collisioning booking', () => {
      const bookings = [new MockBooking({ startTime: new Date('2021-09-19T11:00:00.000Z'), endTime: new Date('2021-09-19T13:00:00.000Z') })];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, bookings)).toBe(false);
    });
    it('Should return false if there is a cancelled collisioning booking', () => {
      const bookings = [new MockBooking({ startTime: new Date('2030-08-22T11:00:00.000Z'), endTime: new Date('2030-08-22T13:00:00.000Z'), cancelledAt: new Date() })];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, bookings)).toBe(false);
    });
    it('Should return false if there is non collision booking in the future', () => {
      const bookings = [
        new MockBooking({ startTime: new Date('2030-08-20T11:00:00.000Z'), endTime: new Date('2030-08-20T13:00:00.000Z') }),
        new MockBooking({ startTime: new Date('2030-08-19T10:30:00.000Z'), endTime: new Date('2030-08-19T15:30:00.000Z') }),

      ];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, bookings)).toBe(false);
    });

    it('Should return true if there is a collision booking in the future but also an ok booking', () => {
      const bookings = [
        new MockBooking({ startTime: new Date('2030-08-21T11:00:00.000Z'), endTime: new Date('2030-08-20T13:00:00.000Z') }),
        new MockBooking({ startTime: new Date('2030-08-19T10:30:00.000Z'), endTime: new Date('2030-08-19T15:30:00.000Z') }),
      ];
      expect(EmployeeDefaultAvailabilityService.hasCollisioningBookings(availability, bookings)).toBe(true);
    });
  });
});
