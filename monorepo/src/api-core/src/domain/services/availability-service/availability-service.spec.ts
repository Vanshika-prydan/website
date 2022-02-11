import AvailabilityService from '.';
import { MockFrameBooking } from '../../entities/FrameBooking';

describe('AvailabilityService', () => {
  describe('timeSlotHasNoCollisionFrameBookings', () => {
    const startTime = new Date('2021-09-20T12:30:00.000Z');
    const endTime = new Date('2021-09-20T13:30:00.000Z');
    it('Should return true if there is no collision bookings', () => {
      expect(AvailabilityService.timeSlotHasNoCollisionFrameBookings([], startTime, endTime)).toBe(true);
    });
    it('Should return false with a frame booking with the same time', () => {
      expect(AvailabilityService.timeSlotHasNoCollisionFrameBookings([new MockFrameBooking({ startTime: new Date('2021-09-20T11:30:00.000Z'), endTime: new Date('2021-09-20T13:30:00.000Z') })], startTime, endTime)).toBe(false);
    });
  });
});
