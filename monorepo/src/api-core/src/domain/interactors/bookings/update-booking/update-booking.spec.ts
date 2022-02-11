// import { mockBooking } from '../../../../../mock/booking';
import { mockBookingType } from '../../../../../mock/booking-type';
import { mockEmployee } from '../../../../../mock/employee';
import { BookingAddon } from '../../../entities/BookingAddon/BookingAddon.db';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import MockAccount from '../../../entities/Account/mock-account';
import { MockBooking } from '../../../entities/Booking/mock-booking';
import MockBookingAddon from '../../../entities/BookingAddon/mock-booking-addon';
import MockCustomer from '../../../entities/Customer/mock-customer';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { EmployeeAvailabilityService } from '../../../services/employee-availability-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { UpdateBookingPayload } from './types';
import { UpdateBookingUseCase } from './update-booking';

describe('Update booking use case', () => {
  const mockAccount = new MockAccount({ accountId: 'e661d6f1-dec0-46fd-810c-85ae21d9f600' });
  const mockCustomer = new MockCustomer({ account: mockAccount });
  const mockBooking = new MockBooking({ specialInstructions: 'Hej', customer: mockCustomer });
  const mockBookingAddon = new MockBookingAddon();
  let accountRepository: IAccountRepository;
  let bookingRepository: IBookingRepository;
  let employeeAvailabilityService: EmployeeAvailabilityService;
  let customerRepository: ICustomerRepository;
  let bookingTypeRepository: IBookingTypeRepository;
  let employeeRepository: IEmployeeRepository;
  let addonRepository: IAddonRepository;
  let setup: any;
  const payload:UpdateBookingPayload = {
    bookingId: mockBooking.bookingId,
    fieldsToUpdate: {
      specialInstructions: 'Hej',

    },
  };
  let idOfExecutingAccount:string;
  beforeEach(() => {
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_UPDATE_CUSTOMER_BOOKING);
    // @ts-ignore
    bookingRepository = {
      save: jest.fn(() => Promise.resolve(mockBooking)),
      getById: jest.fn(() => Promise.resolve({ ...mockBooking })),
      getByEmployeeId: jest.fn(() => Promise.resolve([])),
    };
    idOfExecutingAccount = mockBooking.customer.account.accountId;
    // @ts-ignore
    bookingTypeRepository = { get: jest.fn(() => Promise.resolve(mockBookingType)) };
    employeeAvailabilityService = { loadAndCheckAvailability: jest.fn(() => Promise.resolve(true)) } as unknown as EmployeeAvailabilityService;
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
    employeeRepository = {
      findByEmployeeId: jest.fn(() => Promise.resolve(mockEmployee)),
    } as unknown as IEmployeeRepository;
    // @ts-ignore
    addonRepository = { findByIds: jest.fn(() => Promise.resolve([mockBookingAddon.addon])) };

    setup = { bookingTypeRepository, accountRepository, bookingRepository, employeeAvailabilityService, customerRepository, employeeRepository, addonRepository };
  });
  it('should be possible to update the own booking', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    const usecase = new UpdateBookingUseCase({ ...setup, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount, payload })).resolves.toEqual({ ...mockBooking });
  });

  it('should be possible to update a customer booking if the account has correct access', async () => {
    idOfExecutingAccount = '3bdf30d7-b457-4443-8f41-a1b04160b76e';
    const usecase = new UpdateBookingUseCase({ ...setup });
    await expect(usecase.execute({ idOfExecutingAccount, payload })).resolves.toEqual(mockBooking);
  });
  it('should throw an error if the user is missing the access to update somone elses booking', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    idOfExecutingAccount = 'uuid';
    const usecase = new UpdateBookingUseCase({ ...setup, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount, payload })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });

  it('Should throw an error if the employee field is present but the account does not have the access to update the booking', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    const usecase = new UpdateBookingUseCase({ ...setup, accountRepository });

    await expect(usecase.execute({ idOfExecutingAccount, payload: { ...payload, fieldsToUpdate: { employeeId: 'abee662f-bd54-494f-a38e-f2b8f14d5673' } } })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });

  it('Should be possible to add a new addon', async () => {
    const usecase = new UpdateBookingUseCase({ ...setup });

    payload.fieldsToUpdate = { addonIds: ['500a12e3-dcc8-401d-a0fb-ec5a00f860a0'] };

    const result = await usecase.execute({ payload, idOfExecutingAccount });

    expect(result.addons![0]).toEqual(expect.any(BookingAddon));
  });
});
