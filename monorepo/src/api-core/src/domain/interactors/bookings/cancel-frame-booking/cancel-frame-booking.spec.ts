import { container } from 'tsyringe';
import { mockBooking } from '../../../../../mock/booking';
import { mockFrameBooking } from '../../../../../mock/frame-booking';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/frame-booking-repository';
import FrameBookingService from '../../../services/frame-booking-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { CancelFrameBookingUseCase } from './cancel-frame-booking';

describe('Cancel frame booking use case', () => {
  let accountRepository: IAccountRepository;
  let frameBookingRepository: IFrameBookingRepository;
  let bookingRepository: IBookingRepository;
  let frameBookingService: FrameBookingService;
  const payload = '258b99a6-7ceb-4793-a82e-a668b2df6b52';

  beforeEach(() => {
    container.clearInstances();
    bookingRepository = {
      findByFrameBookingId: jest.fn(() => Promise.resolve([mockBooking])),
      delete: jest.fn(() => Promise.resolve()),
    } as unknown as IBookingRepository;
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_CANCEL_CUSTOMER_FRAME_BOOKING);
    // @ts-ignore
    frameBookingService = { fetchByIdOrFail: jest.fn(() => Promise.resolve(mockFrameBooking)) };
    frameBookingRepository = { cancel: jest.fn(() => Promise.resolve()), findById: jest.fn(() => Promise.resolve(mockFrameBooking)) } as unknown as IFrameBookingRepository;

    container.register(BOOKING_REPOSITORY_INTERFACE, { useValue: bookingRepository });
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    container.register(FRAME_BOOKING_REPOSITORY_INTERFACE, { useValue: frameBookingRepository });
    container.register(FrameBookingService, { useValue: frameBookingService });
  });
  afterAll(() => container.clearInstances());

  it('should be possible to cancel the booking for a customer', async () => {
    const usecase = container.resolve(CancelFrameBookingUseCase);
    await usecase.execute({ payload, idOfExecutingAccount: 'f9723582-c489-475f-a44f-8b7117b0c35b' });
  });

  it('should be possible to cancel the booking ', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    const fb = { ...mockFrameBooking };
    fb.customer = { ...mockFrameBooking.customer };
    fb.customer.account = { ...mockFrameBooking.customer.account };
    fb.customer.account.accountId = 'f9723582-c489-475f-a44f-8b7117b0c35b';
    frameBookingRepository = { cancel: jest.fn(() => Promise.resolve()), findById: jest.fn(() => Promise.resolve(fb)) } as unknown as IFrameBookingRepository;
    container.register(FRAME_BOOKING_REPOSITORY_INTERFACE, { useValue: frameBookingRepository });

    const usecase = container.resolve(CancelFrameBookingUseCase);
    await usecase.execute({ payload, idOfExecutingAccount: 'f9723582-c489-475f-a44f-8b7117b0c35b' });
  });

  it('should throw an error if the access is missing', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    container.register(ACCOUNT_REPOSITORY_INTERFACE, { useValue: accountRepository });
    const usecase = container.resolve(CancelFrameBookingUseCase);
    await expect(usecase.execute({ payload, idOfExecutingAccount: 'f9723582-c489-475f-a44f-8b7117b0c35b' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
});
