import { mockCustomer } from '../../../../../mock/customer';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IBooking } from '../../../entities/Booking/IBooking';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import BookingService from '../../../services/booking-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { CreateBookingUseCase } from './create-booking-use-case';
import { CreateBookingPayload } from './types';
import { container } from 'tsyringe';
import BookingServiceFacade from '../../../services/booking';

describe('create-booking-use-case', () => {
  const returnValue = {} as unknown as IBooking;
  let accountRepository: IAccountRepository;
  let customerRepository: ICustomerRepository;
  let bookingService: BookingService;
  let bookingServiceFacade: BookingServiceFacade;

  const payload: CreateBookingPayload = Object.freeze({
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

  beforeEach(() => {
    container.clearInstances();
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_ADD_BOOKING_TO_CUSTOMER);
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
    bookingService = { createBooking: jest.fn(() => Promise.resolve(returnValue)) } as unknown as BookingService;
    // @ts-ignore
    bookingServiceFacade = { sendNewBookingNotification: jest.fn(() => Promise.resolve()) };

    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    container.register(BookingService, { useValue: bookingService });
    container.register(BookingServiceFacade, { useValue: bookingServiceFacade });
  });

  afterAll(() => {
    container.clearInstances();
  });

  it('should be possible to create a booking for a given customer', async () => {
    const usecase = container.resolve(CreateBookingUseCase);
    await expect(usecase.execute({ payload, idOfExecutingAccount: 'uuid' })).resolves.toBe(returnValue);
    expect(customerRepository.findByAccountId).toBeCalledTimes(0);
  });
  it('should be possible to create a booking for a given customer, without a addon', async () => {
    const usecase = container.resolve(CreateBookingUseCase);
    await expect(usecase.execute({ payload: { ...payload, bookingAddons: undefined }, idOfExecutingAccount: 'uuid' })).resolves.toBe(returnValue);
    expect(customerRepository.findByAccountId).toBeCalledTimes(0);
  });
  it('should be possible to create a booking if I am a customer', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    const usecase = container.resolve(CreateBookingUseCase);
    await expect(usecase.execute({ payload: { ...payload, customerId: undefined }, idOfExecutingAccount: 'uuid' })).resolves.toBe(returnValue);
    expect(customerRepository.findByAccountId).toBeCalledTimes(1);
  });
  it('should throw if the customer id is set but the account does not have access to book for a customer', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    const usecase = container.resolve(CreateBookingUseCase);
    await expect(usecase.execute({ payload, idOfExecutingAccount: 'uuid' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
});
