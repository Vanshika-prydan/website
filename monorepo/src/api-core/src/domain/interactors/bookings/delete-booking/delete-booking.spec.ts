import { mockBooking } from '../../../../../mock/booking';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { DeleteBookingUseCaase } from './delete-booking';

describe('Delete booking use case', () => {
  let accountRepository: IAccountRepository;
  let bookingRepository: IBookingRepository;
  let idOfExecutingAccount:string;
  const bookingId = 'f273f48c-7841-4d0f-8c60-c5331a0d1653';
  let setup:any;
  idOfExecutingAccount = 'ef3247c1-285c-499e-baec-618418a02416';
  beforeEach(() => {
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_DELETE_CUSTOMER_BOOKING);
    bookingRepository = {
      delete: jest.fn(() => Promise.resolve()),
      getById: jest.fn(() => Promise.resolve(mockBooking)),
    } as unknown as IBookingRepository;

    setup = { accountRepository, bookingRepository };
  });
  it('should be possible to cancel a booking for the own account', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    idOfExecutingAccount = mockBooking.customer.account.accountId;
    const usecase = new DeleteBookingUseCaase({ ...setup, accountRepository });
    await (usecase.execute({ payload: bookingId, idOfExecutingAccount }));
  });
  it('should be possible to cancel a booking with the correct access', async () => {
    const usecase = new DeleteBookingUseCaase({ ...setup });
    await (usecase.execute({ payload: bookingId, idOfExecutingAccount }));
  });
  it('Should throw an error if the id does not exist', async () => {
    bookingRepository = {
      getById: jest.fn(() => Promise.resolve()),
    } as unknown as IBookingRepository;
    const usecase = new DeleteBookingUseCaase({ ...setup, bookingRepository });
    await expect(usecase.execute({ payload: bookingId, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.ID_DOES_NOT_EXIST);
  });
});
