import { mockCustomer } from '../../../../mock/customer';
import { mockEmployee } from '../../../../mock/employee';
import { mockAddress } from '../../../../mock/address';
import { IBooking } from '../../entities/Booking/IBooking';
import { IBookingRepository } from '../../interface-adapters/repositories/booking-repository';
import { EmployeeAvailabilityService } from '.';
import { mockBookingType } from '../../../../mock/booking-type';
import { addHours, addWeeks } from 'date-fns';
import { mockBooking } from '../../../../mock/booking';
import { EmployeeDefaultAvailabilityRepositoryInterface } from '../../interface-adapters/repositories/employee-default-availability-repository';
import { MockBooking } from '../../entities/Booking/mock-booking';
import { EmployeeDefaultAvailability } from '../../entities/EmployeeDefaultAvailability';
import MockEmployeeDefaultAvailability from '../../entities/EmployeeDefaultAvailability/MockEmployeeDefaultAvailability';
import IFrameBookingRepository from '../../interface-adapters/repositories/frame-booking-repository';
import { BookingLightInterface, MockBookingLight } from '../../entities/BookingLight';

describe('EmployeeAvailabilityService', () => {
  const employeeBookings:BookingLightInterface[] = [
    new MockBookingLight({
      customerId: mockCustomer.customerId,
      startTime: new Date('2021-03-29T14:38:24.681Z'),
      endTime: new Date('2021-03-29T16:38:24.681Z'),
      addressId: mockAddress.addressId,
      privateNotes: 'private',
      specialInstructions: 'extra',
      employeeId: mockEmployee.employeeId,
      bookingTypeId: mockBookingType.bookingTypeId,
      bookingId: '239d0835-66e5-4a48-8916-28df6a68b359',
      completed: false,
      paymentCompleted: false,
    }),
  ];

  const availability: EmployeeDefaultAvailability[] = [
    new MockEmployeeDefaultAvailability({ day: 'MONDAY' }),
    new MockEmployeeDefaultAvailability({ day: 'TUESDAY' }),
    new MockEmployeeDefaultAvailability({ day: 'WEDNESDAY' }),
    new MockEmployeeDefaultAvailability({ day: 'THURSDAY' }),
    new MockEmployeeDefaultAvailability({ day: 'FRIDAY' }),
  ];

  describe('loadAndCheckAvailability', () => {
    // @ts-ignore
    const availabilityRepository: EmployeeDefaultAvailabilityRepositoryInterface = {
      fetchByEmployee: jest.fn(() => Promise.resolve([
        new MockEmployeeDefaultAvailability({ day: 'MONDAY' }),
        new MockEmployeeDefaultAvailability({ day: 'TUESDAY' }),
        new MockEmployeeDefaultAvailability({ day: 'WEDNESDAY' }),
        new MockEmployeeDefaultAvailability({ day: 'THURSDAY' }),
        new MockEmployeeDefaultAvailability({ day: 'FRIDAY' }),
      ])),
    };
    // @ts-ignore
    const frameBookingRepository: IFrameBookingRepository = {};

    it('should return true if the employee is available', async () => {
      // @ts-ignore
      const bookingRepository: IBookingRepository = {
        findBookingLightsByEmployee: jest.fn(() => Promise.resolve(employeeBookings)),
      };
      const employee = { ...mockEmployee };

      const startTime = new Date('2021-04-29T12:00:00.000Z');
      const endTime = new Date('2021-04-29T14:00:00.000Z');

      const service = new EmployeeAvailabilityService(bookingRepository, availabilityRepository, frameBookingRepository);
      await expect(service.loadAndCheckAvailability({ employee, startTime, endTime })).resolves.toBe(true);
    });
    it('should return false if the employee is not available', async () => {
      // @ts-ignore
      const bookingRepository: IBookingRepository = {
        findBookingLightsByEmployee: jest.fn(() => Promise.resolve(employeeBookings)),
      };
      const employee = { ...mockEmployee };

      const startTime = new Date('2021-03-29T14:38:24.681Z');
      const endTime = new Date('2021-03-29T15:38:24.681Z');

      const service = new EmployeeAvailabilityService(bookingRepository, availabilityRepository, frameBookingRepository);
      await expect(service.loadAndCheckAvailability({ employee, startTime, endTime })).resolves.toBe(false);
    });
  });
  describe('checkAvailabilityForFrameBooking', () => {
    const referenceStartTime = new Date('2021-05-17T05:06:40.909Z');
    const referenceEndTime = addHours(referenceStartTime, 3);
    it('should return true when an employee has no bookings', () => {
      expect(EmployeeAvailabilityService.checkEmployeeAvailability([], mockEmployee, availability, referenceStartTime, referenceEndTime, 'weekly')).toBeTruthy();
    });
    it('should return false when a future slot is occupired by the employee', () => {
      const employeeId = 'eb80f85f-b7d7-444d-b339-be298ee701b6';
      const booking:IBooking = { ...mockBooking, employeeId, startTime: addWeeks(referenceStartTime, 5), endTime: addWeeks(referenceEndTime, 5), employee: { ...mockEmployee, employeeId } };
      const employee = { ...mockEmployee, employeeId };

      expect(EmployeeAvailabilityService.checkEmployeeAvailability([booking], employee, availability, referenceStartTime, referenceEndTime, 'weekly')).toBeFalsy();
    });
    it('should return true when a future slot is occupired but not for the given employee', () => {
      const employeeId = 'eb80f85f-b7d7-444d-b339-be298ee701b6';
      const booking:IBooking = { ...mockBooking, startTime: addWeeks(referenceStartTime, 5), endTime: addWeeks(referenceEndTime, 5), employee: { ...mockEmployee } };
      const employee = { ...mockEmployee, employeeId };

      expect(EmployeeAvailabilityService.checkEmployeeAvailability([booking], employee, availability, referenceStartTime, referenceEndTime, 'weekly')).toBeTruthy();
    });
  });

  describe('checkAvailabilityWithSchedule', () => {
    const availability: EmployeeDefaultAvailability[] = [new MockEmployeeDefaultAvailability({ day: 'MONDAY', startHour: 7 })];
    const bookings: IBooking[ ] = [];
    const startTime = new Date('2021-08-30T06:00:00.000Z');
    const endTime = new Date('2021-08-30T09:00:00.000Z');
    it('should return true for an available time slot with an available employee', () => {
      expect(EmployeeAvailabilityService.checkAvailabilityWithSchedule(availability, bookings, startTime, endTime)).toBe(true);
    });

    it('should return false when the time is available but the employee is not', () => {
      const availability: EmployeeDefaultAvailability[] = [new MockEmployeeDefaultAvailability({ day: 'TUESDAY' })];
      expect(EmployeeAvailabilityService.checkAvailabilityWithSchedule(availability, bookings, startTime, endTime)).toBe(false);
    });
    it('should return false is the time slot is not available but the employee works on that time', () => {
      const bookings:IBooking[] = [new MockBooking({ startTime: new Date('2021-08-30T08:00:00.000Z'), endTime: new Date('2021-08-30T12:00:00.000Z') })];
      expect(EmployeeAvailabilityService.checkAvailabilityWithSchedule(availability, bookings, startTime, endTime)).toBe(false);
    });
  });

  describe('hasNoCollisionFrameBookings', () => {

  });
});
