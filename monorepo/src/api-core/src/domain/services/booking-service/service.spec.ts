import BookingService from '.';
import { mockAddon } from '../../../../mock/addon';
import { mockAddress } from '../../../../mock/address';
import { mockBookingType } from '../../../../mock/booking-type';
import { mockCustomer } from '../../../../mock/customer';
import { mockEmployee } from '../../../../mock/employee';
import { IBookingRepository } from '../../interface-adapters/repositories/booking-repository';
import IFrameBookingRepository from '../../interface-adapters/repositories/frame-booking-repository';
import { EmployeeAvailabilityService } from '../employee-availability-service';
import { mockFrameBooking } from '../../../../mock/frame-booking';
import { CreateBookingRequestPayload, CreateFrameBookingRequestPayload } from './types';
import { ErrorCode } from '../../entities/ErrorCode';
import { IBooking } from '../../entities/Booking';
import { mockBooking } from '../../../../mock/booking';
import { addDays } from 'date-fns';
import { MockBooking } from '../../entities/Booking/mock-booking';
import { FrameBookingFullyDefined } from '../../entities/FrameBooking/IFrameBooking';
import { MockBookingLight } from '../../entities/BookingLight';

describe('Booking service', () => {
  let frameBookingRepository: IFrameBookingRepository;
  let bookingRepository: IBookingRepository;
  let employeeAvailabilityService: EmployeeAvailabilityService;
  const bookingReturnValue = {} as unknown as IBooking;

  beforeEach(() => {
    // @ts-ignore
    frameBookingRepository = { create: jest.fn(() => Promise.resolve(mockFrameBooking)) };
    // @ts-ignore
    bookingRepository = {
      create: jest.fn(() => Promise.resolve(bookingReturnValue)),
      findByFrameBookingId: jest.fn(() => Promise.resolve([])),
      getByEmployeeId: jest.fn(() => Promise.resolve([new MockBooking()])),
      findBookingLightsByEmployee: jest.fn(() => Promise.resolve([new MockBookingLight()])),
      findBookingLightsByFrameBooking: jest.fn(() => Promise.resolve([new MockBookingLight()])),
    };
    employeeAvailabilityService = {
      loadAndCheckAvailability: jest.fn(() => Promise.resolve(true)),
    } as unknown as EmployeeAvailabilityService;
  });
  describe('Create frame booking', () => {
    let payload: CreateFrameBookingRequestPayload;
    beforeEach(() => {
      payload = {
        startTime: addDays(new Date(), 20),
        endTime: undefined,
        occurrence: 'weekly',
        durationInMinutes: 120,
        customerId: mockCustomer.customerId,
        addressId: mockAddress.addressId,
        employeeId: mockEmployee.employeeId,
        bookingTypeId: mockBookingType.bookingTypeId,
        bookingAddons: [{
          addonId: mockAddon.addonId,
          numberOfUnits: 1,
        }],
      };
    });
    it('should register a frame booking', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createFrameBooking(payload)).resolves.toBe(mockFrameBooking);
    });
    it('Should throw an error if the start date already has passed', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      payload = { ...payload, startTime: new Date('2020-01-01') };
      await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.DATETIME_ERROR);
    });
    it('Should throw an error if the end time is before the start time', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      payload = { ...payload, startTime: addDays(new Date(), 10), endTime: addDays(new Date(), 9) };
      await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.DATETIME_ERROR);
    });
    describe('Duration', () => {
      let service: BookingService;
      beforeEach(() => {
        service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      });
      it('Should throw an error if the dureation is not numeric', async () => {
        // @ts-ignore
        payload = { ...payload, durationInMinutes: 'he 5' };
        await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.INVALID_INPUT);
      });
      it('Should throw an error if the dureation is negative', async () => {
        payload = { ...payload, durationInMinutes: -10 };
        await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.INVALID_INPUT);
      });
      it('Should throw an error if the dureation is zero', async () => {
        payload = { ...payload, durationInMinutes: 0 };
        await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.INVALID_INPUT);
      });
    });
    it.todo('Should throw an error if the employee is not available');/*, async () => {
      employeeAvailabilityService = {
        loadAndCheckAvailability: jest.fn(() => Promise.resolve(true)),
      } as unknown as EmployeeAvailabilityService;
      const service = new BookingService({ frameBookingRepository, bookingRepository, employeeAvailabilityService });
      await expect(service.createFrameBooking(payload)).rejects.toThrowError(ErrorCode.DATETIME_ERROR);
    }); */
  });

  describe('Create booking', () => {
    const payload: CreateBookingRequestPayload = Object.freeze({
      customerId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
      startTime: new Date(Date.now() + 60 * 1000 * 60 * 24).toJSON(),
      durationInMinutes: 120,
      addressId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
      privateNotes: 'Private',
      specialInstructions: 'speaic',
      bookingTypeId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
      employeeId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
      bookingAddons: [{ addonId: '35029a64-26f7-48dc-88e6-77d5f7ac8460', numberOfUnits: 1 }],
    });

    it('should be possible to create a booking', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createBooking(payload)).resolves.toBe(bookingReturnValue);
    });

    describe('check of the addons', () => {
      it('should throw if the addons number of units is less than zero', async () => {
        const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
        const bookingAddons = [{ addonId: '35029a64-26f7-48dc-88e6-77d5f7ac8460', numberOfUnits: -1 }];
        await expect(service.createBooking({ ...payload, bookingAddons })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
      });
      it('should throw if the addons number of units is not an int', async () => {
        const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
        const bookingAddons = [{ addonId: '35029a64-26f7-48dc-88e6-77d5f7ac8460', numberOfUnits: '3k34' }];
        // @ts-ignore
        await expect(service.createBooking({ ...payload, bookingAddons })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
      });
      it('should throw if the id format is not uuid', async () => {
        const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
        const bookingAddons = [{ addonId: '35', numberOfUnits: 1 }];
        await expect(service.createBooking({ ...payload, bookingAddons })).rejects.toThrowError(ErrorCode.INVALID_UUID_FORMAT);
      });
    });
    it('should throw if the duration in minutes is less than zero', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createBooking({ ...payload, durationInMinutes: -10 })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should throw if the duration isnt an int', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createBooking({ ...payload, durationInMinutes: 10.3 })).rejects.toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should throw if the time already passed', async () => {
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createBooking({ ...payload, startTime: new Date(Date.now() - 10000).toJSON() })).rejects.toThrowError(ErrorCode.DATETIME_ERROR);
    });
    it('should throw if the timeslot for the employee is not available', async () => {
      employeeAvailabilityService = { loadAndCheckAvailability: jest.fn(() => Promise.resolve(false)) } as unknown as EmployeeAvailabilityService;
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      await expect(service.createBooking(payload)).rejects.toThrowError(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
    });
  });

  describe('Create booking from Frame booking', () => {
    it('should create frame bookings three months (13 weeks) in advance', async () => {
      Date.now = jest.fn(() => new Date('2020-02-01T12:00:00.000Z').getTime());
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      const frameBooking: FrameBookingFullyDefined = { ...mockFrameBooking, occurrence: 'weekly', startTime: new Date('2020-01-01T14:00:00.000Z') };
      await service.createBookingsFromFrameBooking(frameBooking);
      expect(bookingRepository.create).toHaveBeenCalledTimes(13);
    });
    it('should create frame bookings one year in advance from now and dont create the bookings that already exists', async () => {
      Date.now = jest.fn(() => new Date('2020-01-01T12:00:00.000Z').getTime());

      bookingRepository = {
        create: jest.fn(() => Promise.resolve(bookingReturnValue)),
        findBookingLightsByFrameBooking: jest.fn(() => Promise.resolve([
          new MockBookingLight({ startTime: new Date('2020-01-01T12:00:00.000Z') }),
          new MockBookingLight({ startTime: new Date('2020-01-08T12:00:00.000Z') }),
        ])),
      } as unknown as IBookingRepository;
      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      const frameBooking: FrameBookingFullyDefined = { ...mockFrameBooking, occurrence: 'weekly', startTime: new Date('2020-01-01T12:00:00.000Z') };
      await service.createBookingsFromFrameBooking(frameBooking);
      expect(bookingRepository.create).toHaveBeenCalledTimes(11);
    });
    it('Should only create until the end date', async () => {
      Date.now = jest.fn(() => new Date('2020-01-01T12:00:00.000Z').getTime());

      const service = new BookingService(frameBookingRepository, bookingRepository, employeeAvailabilityService);
      const frameBooking: FrameBookingFullyDefined = { ...mockFrameBooking, occurrence: 'weekly', startTime: new Date('2020-01-01T12:00:00.000Z'), endTime: new Date('2020-01-15T12:00:00.000Z') };
      await service.createBookingsFromFrameBooking(frameBooking);
      expect(bookingRepository.create).toHaveBeenCalledTimes(2);
    });
  });
});
