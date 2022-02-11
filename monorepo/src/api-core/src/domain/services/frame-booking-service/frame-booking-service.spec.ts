import FrameBookingService from '.';
import { MockFrameBooking } from '../../entities/FrameBooking';
import MockFrameBookingLight from '../../entities/FrameBookingLight/mock-frame-booking-light';

describe('Frame booking service', () => {
  beforeEach(() => { });

  describe('getOccurrenceInformation', () => {
    it('Should give correct information', () => {
      const frameBooking = new MockFrameBooking({ startTime: new Date('2021-09-17T15:00:00.000Z'), durationInMinutes: 90, occurrence: 'weekly' });
      expect(FrameBookingService.getOccurrenceInformation(frameBooking)).toEqual({ weekDay: 'FRIDAY', startHour: 17, endHour: 18, startMinute: 0, endMinute: 30, occurrence: 'weekly', isActive: true });
    });
  });

  describe('getNextUpcomingDate', () => {
    let day: any;
    beforeAll(() => {
      day = jest.spyOn(Date, 'now').mockImplementation(() => 1632920400000);
    });
    it('should generate this weeks tuesday 12:30', () => {
      const fb = new MockFrameBookingLight({ startTime: new Date('2021-09-28T13:00:00.000Z'), occurrence: 'weekly', durationInMinutes: 60 });
      expect(FrameBookingService.getNextUpcomingDate(fb)).toEqual({ startTime: new Date('2021-10-05T13:00:00.000Z'), endTime: new Date('2021-10-05T14:00:00.000Z') });
    });
    afterAll(() => {
      day.mockRestore();
    });
  });
})
;
