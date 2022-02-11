import { mockAccount } from '../../../../../mock/account';
import { mockBooking } from '../../../../../mock/booking';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IBooking } from '../../../entities/Booking';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmailService from '../../../services/email-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import CompleteBookingUseCase from '.';
import SendNotificationUseCase from '../../notifications/send-notification';
import ChargeBookingUseCase from '../charge-booking/charge-booking';

describe('complete-booking', () => {
  let useCase:CompleteBookingUseCase;
  const payload = {
    payload: mockBooking.bookingId,
    idOfExecutingAccount: mockAccount.accountId,
  };
  let accountRepository: IAccountRepository;
  let bookingRepository: IBookingRepository;

  let chargeBookingUseCase : ChargeBookingUseCase;

  let returnValue: IBooking;
  let emailService: EmailService;

  // @ts-ignore
  const sendNotificationUseCase: SendNotificationUseCase = { execute: jest.fn(() => Promise.resolve()) };

  beforeEach(async () => {
    accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_MARK_AS_COMPLETED);
    bookingRepository = {
      getById: jest.fn(() => Promise.resolve(mockBooking)),
      save: jest.fn(() => Promise.resolve(mockBooking)),
    } as unknown as IBookingRepository;

    // @ts-ignore
    emailService = { send: jest.fn(() => Promise.resolve()) };
    // @ts-ignore
    chargeBookingUseCase = { execute: jest.fn(() => Promise.resolve(mockBooking)) };
    useCase = new CompleteBookingUseCase(chargeBookingUseCase, accountRepository, bookingRepository, emailService, sendNotificationUseCase);
    returnValue = await useCase.execute(payload);
  });

  it('Should check the access of the user', async () => {
    expect(accountRepository.findById).toHaveBeenCalled();
  });

  it('Should load the current booking from the booking repository', async () => {
    expect(bookingRepository.getById).toHaveBeenCalledWith(mockBooking.bookingId);
  });

  it('Should check that the booking has not been updated yet', () => {});

  it('Should return the updated booking', () => {
    expect(returnValue).toBe(mockBooking);
  });
  it('Should call the ChargeBookingUseCase', () => {
    expect(chargeBookingUseCase.execute).toHaveBeenCalled();
  });

  describe('Possible errors', () => {
    it('Should throw an error if the booking does not exist', async () => {
      bookingRepository = { getById: jest.fn(() => Promise.resolve()) } as unknown as IBookingRepository;
      useCase = new CompleteBookingUseCase(chargeBookingUseCase, accountRepository, bookingRepository, emailService, sendNotificationUseCase);
      await expect(useCase.execute(payload)).rejects.toThrowError(ErrorCode.ID_DOES_NOT_EXIST);
    });
    it('Should throw an error if the booking already has been competed', async () => {
      bookingRepository = { getById: jest.fn(() => Promise.resolve({ ...mockBooking, completed: true })) } as unknown as IBookingRepository;
      useCase = new CompleteBookingUseCase(chargeBookingUseCase, accountRepository, bookingRepository, emailService, sendNotificationUseCase);
      await expect(useCase.execute(payload)).rejects.toThrowError(ErrorCode.CONSTRAINT_VIOLATED);
    });
  });
});
