import { mockBooking } from '../../../../../mock/booking';
import { mockCustomer } from '../../../../../mock/customer';
import { mockEmployee } from '../../../../../mock/employee';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { GetAllBookingsUseCase } from './get-all-bookings';

describe('Get all bookings', () => {
  let accountRepository: IAccountRepository;
  let bookingRepository: IBookingRepository;
  let customerRepository: ICustomerRepository;
  let employeeRepository: IEmployeeRepository;

  const idOfExecutingAccount = '6a680fa3-31f1-432c-b61e-1b990d38b12d';
  const successfullResponse = [mockBooking];
  beforeEach(() => {
    bookingRepository = {
      getAll: jest.fn(() => Promise.resolve(successfullResponse)),
      getByCustomerId: jest.fn(() => Promise.resolve(successfullResponse)),
      getByEmployeeId: jest.fn(() => Promise.resolve(successfullResponse)),
    } as unknown as IBookingRepository;
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as ICustomerRepository;
    employeeRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as IEmployeeRepository;
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_LIST_ALL_BOOKINGS);
  });
  it('should be possible to get all bookings with the right permission', async () => {
    const usecase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).resolves.toBe(successfullResponse);
    expect(bookingRepository.getAll).toHaveBeenCalled();
    expect(bookingRepository.getByCustomerId).not.toHaveBeenCalled();
    expect(bookingRepository.getByEmployeeId).not.toHaveBeenCalled();
  });
  it('should throw an error if the account does not have access or if it is neither is an employee nor a customer', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as ICustomerRepository;
    employeeRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as IEmployeeRepository;
    const usecase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
  it('should only receive the related employee bookings if the account is an employee', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    employeeRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockEmployee)) } as unknown as IEmployeeRepository;
    const usecase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).resolves.toEqual(successfullResponse);
  });
  it('should only receive the related customer bookings if the account is a customer', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
    const usecase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).resolves.toEqual(successfullResponse);
  });
  it('should  receive the related customer and employee bookings if the account is both a customer and an employee', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
    employeeRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockEmployee)) } as unknown as IEmployeeRepository;
    const usecase = new GetAllBookingsUseCase({ bookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).resolves.toEqual([...successfullResponse, ...successfullResponse]);
  });
});
