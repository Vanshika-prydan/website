import { mockCustomer } from '../../../../../mock/customer';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IBooking } from '../../../entities/Booking';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import BookingService from '../../../services/booking-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { CreateFrameBookingUseCase } from './create-frame-booking';
import { CreateFrameBookingRequestPayload } from './types';
import { container } from 'tsyringe';
import BookingServiceFacade from '../../../services/booking';
import EmailService from '../../../services/email-service';

describe('Create frame booking', () => {
  const returnValue = {} as unknown as IBooking;
  let accountRepository: IAccountRepository;
  let customerRepository: ICustomerRepository;
  let bookingService: BookingService;
  let bookingServiceFacade: BookingServiceFacade;
  let emailService: EmailService;

  const payload: CreateFrameBookingRequestPayload = Object.freeze({
    customerId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
    startTime: new Date(Date.now() + 60 * 1000 * 60 * 24).toJSON(),
    durationInMinutes: 120,
    addressId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
    occurrence: 'weekly',
    privateNotes: 'Private',
    specialInstructions: 'speaic',
    bookingTypeId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
    employeeId: '35029a64-26f7-48dc-88e6-77d5f7ac8460',
    bookingAddons: [{ addonId: '35029a64-26f7-48dc-88e6-77d5f7ac8460', numberOfUnits: 1 }],
  });

  beforeEach(() => {
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_ADD_BOOKING_TO_CUSTOMER);
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
    bookingService = { createFrameBooking: jest.fn(() => Promise.resolve(returnValue)) } as unknown as BookingService;
    // @ts-ignore
    bookingServiceFacade = { sendNewBookingNotification: jest.fn(() => Promise.resolve()) };
    // @ts-ignore
    emailService = { send: Promise.resolve() };

    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    container.register(BookingService, { useValue: bookingService });
    container.register(BookingServiceFacade, { useValue: bookingServiceFacade });
    container.register(EmailService, { useValue: emailService });
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('should be possible to create a booking for a given customer', async () => {
    const usecase = container.resolve(CreateFrameBookingUseCase);
    await expect(usecase.execute({ payload, idOfExecutingAccount: 'uuid' })).resolves.toBe(returnValue);
  });

  it('should be possible to create a booking if I am a customer', async () => {
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: generateAccountRepositoryForAuthorization() });
    const usecase = container.resolve(CreateFrameBookingUseCase);
    await expect(usecase.execute({ payload: { ...payload, customerId: undefined }, idOfExecutingAccount: 'uuid' })).resolves.toBe(returnValue);
    expect(customerRepository.findByAccountId).toBeCalledTimes(1);
  });
  it('should throw if the customer id is set but the account does not have access to book for a customer', async () => {
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: generateAccountRepositoryForAuthorization() });
    const usecase = container.resolve(CreateFrameBookingUseCase);
    await expect(usecase.execute({ payload, idOfExecutingAccount: 'uuid' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
});
