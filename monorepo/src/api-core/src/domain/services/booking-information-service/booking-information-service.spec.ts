import BookingInformationService from '.';
import { MockBooking } from '../../entities/Booking';
import { MockFrameBooking } from '../../entities/FrameBooking';

describe('Booking information service', () => {
  describe('getWeekDayFromFrameBooking', () => {
    it('should return FRIDAY for a friday', () => {
      const frameBooking = new MockFrameBooking({ startTime: new Date(1631879111813) });
      expect(BookingInformationService.getWeekDay(frameBooking)).toBe('FRIDAY');
    });
  });

  describe('getStartAndEndTime', () => {
    it('Should return 17:00 - 18:30 for a frame booking', () => {
      const frameBooking = new MockFrameBooking({ startTime: new Date('2021-09-17T15:00:00.000Z'), durationInMinutes: 90 });
      expect(BookingInformationService.getStartAndEndTime(frameBooking).startHour).toBe(17);
      expect(BookingInformationService.getStartAndEndTime(frameBooking).endHour).toBe(18);
      expect(BookingInformationService.getStartAndEndTime(frameBooking).startMinute).toBe(0);
      expect(BookingInformationService.getStartAndEndTime(frameBooking).endMinute).toBe(30);
    });

    it('Should return 17:00 - 18:30 for a booking', () => {
      const mockBooking = new MockBooking({ startTime: new Date('2021-09-17T15:00:00.000Z'), endTime: new Date('2021-09-17T16:30:00.000Z') });
      expect(BookingInformationService.getStartAndEndTime(mockBooking).startHour).toBe(17);
      expect(BookingInformationService.getStartAndEndTime(mockBooking).endHour).toBe(18);
      expect(BookingInformationService.getStartAndEndTime(mockBooking).startMinute).toBe(0);
      expect(BookingInformationService.getStartAndEndTime(mockBooking).endMinute).toBe(30);
    });
  });
  describe('getInformation', () => {
    it('Should return 08:00 - 12:00 Friday for a booking', () => {
      const mockBooking = new MockBooking({ startTime: new Date('2021-09-17T06:00:00.000Z'), endTime: new Date('2021-09-17T10:00:00.000Z') });
      expect(BookingInformationService.getInformation(mockBooking).startHour).toBe(8);
      expect(BookingInformationService.getInformation(mockBooking).endHour).toBe(12);
      expect(BookingInformationService.getInformation(mockBooking).startMinute).toBe(0);
      expect(BookingInformationService.getInformation(mockBooking).endMinute).toBe(0);
      expect(BookingInformationService.getInformation(mockBooking).weekDay).toBe('FRIDAY');
    });
  });
});
