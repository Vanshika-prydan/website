import { addMinutes } from 'date-fns';
import AddAddonToBookingUseCase, { RequestPayload } from '.';
import { ErrorCode } from '../../../entities/ErrorCode';
import MockAddon from '../../../entities/Addon/mock-addon';
import { BookingFullyDefined } from '../../../entities/Booking';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import MockCustomer from '../../../entities/Customer/mock-customer';
import { ADDON_REPOSITORY_INTERFACE, IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { container } from 'tsyringe';
import BookingService from '../../../services/booking-service';

describe('Add addon to booking use case', () => {
  const customer = new MockCustomer();
  const bookingToEdit = new MockBooking({ customer, addons: [] });
  const addon = new MockAddon({ defaultTimeInMinutes: 60 });
  const crashBooking = new MockBooking({ startTime: addMinutes(bookingToEdit.endTime, 90), endTime: addMinutes(bookingToEdit.endTime, 190) });

  let usecase: AddAddonToBookingUseCase;
  let bookingRepository: IBookingRepository;
  let addonRepository: IAddonRepository;
  let result: BookingFullyDefined;
  let bookingService: BookingService;

  const payload: RequestPayload = {
    bookingId: bookingToEdit.bookingId,
    addonIds: [addon.addonId],
  };

  beforeEach(async () => {
    // @ts-ignore
    bookingRepository = {
      getById: jest.fn(() => Promise.resolve(bookingToEdit)),
      getByEmployeeId: jest.fn(() => Promise.resolve([])),
      save: jest.fn((booking:BookingFullyDefined) => Promise.resolve(booking)),
    };
    // @ts-ignore
    addonRepository = { findByIds: jest.fn(() => Promise.resolve([addon])) };
    // @ts-ignore
    bookingService = { fetchByIdOrFail: jest.fn(() => Promise.resolve(new MockBooking())) };

    container.register(BOOKING_REPOSITORY_INTERFACE, { useValue: bookingRepository });
    container.register(ADDON_REPOSITORY_INTERFACE, { useValue: addonRepository });
    container.register(BookingService, { useValue: bookingService });

    usecase = container.resolve(AddAddonToBookingUseCase);
    result = await usecase.execute({ payload, idOfExecutingAccount: customer.account.accountId });
  });

  it('Should load the booking', async () => {
    expect(bookingRepository.getById).toHaveBeenCalledWith(payload.bookingId);
  });
  it('Should throw if the booking does not belong to the customers account', async () => {
    await expect(usecase.execute({ payload, idOfExecutingAccount: '864394a2-c01a-4fe8-9dec-92cb1f7f6c0a' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
  it('Should load the addon', () => {
    expect(addonRepository.findByIds).toHaveBeenCalledWith([addon.addonId]);
  });

  it('should throw an error if the employee is occupied', async () => {
    bookingRepository = { ...bookingRepository, getByEmployeeId: jest.fn(() => Promise.resolve([bookingToEdit, crashBooking])) };
    container.register(BOOKING_REPOSITORY_INTERFACE, { useValue: bookingRepository });
    usecase = container.resolve(AddAddonToBookingUseCase);

    await expect(usecase.execute({ payload, idOfExecutingAccount: customer.account.accountId })).rejects.toThrowError(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
    expect(bookingRepository.getByEmployeeId).toHaveBeenCalledWith(bookingToEdit.employee.employeeId);
  });

  it('Should add the addon to the booking and return the updated booking with correct values', () => {
    expect(result.addons![0].addon).toEqual(addon);
    expect(result.endTime).toEqual(addMinutes(bookingToEdit.endTime, 60));
  });
  it('Should save the booking', () => {
    expect(bookingRepository.save).toHaveBeenCalled();
  });
});
