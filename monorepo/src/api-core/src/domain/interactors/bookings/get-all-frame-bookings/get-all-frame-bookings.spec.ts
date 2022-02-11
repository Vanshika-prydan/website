import { mockBooking } from '../../../../../mock/booking';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { GetAllFrameBookingsUseCase } from './get-all-frame-bookings';

describe('Get all frame bookings', () => {
  let accountRepository: IAccountRepository;
  let frameBookingRepository: IFrameBookingRepository;
  let customerRepository: ICustomerRepository;
  let employeeRepository: IEmployeeRepository;

  const idOfExecutingAccount = '6a680fa3-31f1-432c-b61e-1b990d38b12d';
  const successfullResponse = [mockBooking];
  beforeEach(() => {
    frameBookingRepository = {
      getAll: jest.fn(() => Promise.resolve(successfullResponse)),
    } as unknown as IFrameBookingRepository;
    customerRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as ICustomerRepository;
    employeeRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as IEmployeeRepository;
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_LIST_ALL_BOOKINGS);
  });
  it('should be possible to get all bookings with the right permission', async () => {
    const usecase = new GetAllFrameBookingsUseCase({ frameBookingRepository, customerRepository, employeeRepository, accountRepository });
    await expect(usecase.execute({ idOfExecutingAccount })).resolves.toBe(successfullResponse);
    expect(frameBookingRepository.getAll).toHaveBeenCalled();
  });
});
