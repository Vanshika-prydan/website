import { mockBooking } from '../../../../../mock/booking';
import { ErrorCode } from '../../../entities/ErrorCode';
import { IBooking } from '../../../entities/Booking';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmailService from '../../../services/email-service';
import PaymentProvider from '../../../services/payment-provider';
import PriceService from '../../../services/price-service';
import ChargeBookingUseCase from './charge-booking';

describe('mark-booking-as-completed', () => {
  let useCase:ChargeBookingUseCase;
  let bookingRepository: IBookingRepository;
  let priceService: PriceService;
  let paymentProvider: PaymentProvider;

  const PRICE_IN_ORE = 150000;

  let returnValue: IBooking;
  let emailService: EmailService;

  beforeEach(async () => {
    // @ts-ignore
    bookingRepository = {
      save: jest.fn(() => Promise.resolve(mockBooking)),
    };
    // @ts-ignore
    priceService = {
      calculateChargeableAmount: jest.fn(() => Promise.resolve(PRICE_IN_ORE)),
    };
    // @ts-ignore
    paymentProvider = { charge: jest.fn(() => Promise.resolve('PAYMENT_ID')) };
    // @ts-ignore
    emailService = { send: jest.fn(() => Promise.resolve()) };
    useCase = new ChargeBookingUseCase(bookingRepository, priceService, paymentProvider, emailService);
    returnValue = await useCase.execute(mockBooking);
  });

  it('Should check that the booking has not been updated yet', () => {});

  it('Should calculate the price', () => {
    expect(priceService.calculateChargeableAmount).toHaveBeenCalledWith(mockBooking);
  });
  it('Should charge the customer', () => {
    expect(paymentProvider.charge).toHaveBeenCalledWith(mockBooking.customer, PRICE_IN_ORE);
  });
  it('Should update the booking and mark it as completed and payed', () => {
    expect(bookingRepository.save).toHaveBeenCalled();
  });
  it('Should return the updated booking', () => {
    expect(returnValue).toBe(mockBooking);
  });

  describe('Possible errors', () => {
    describe('If the payment is not competed', () => {
      beforeEach(async () => {
        // @ts-ignore
        emailService = { send: jest.fn(() => Promise.resolve()) };
        paymentProvider = { charge: jest.fn(() => Promise.reject(new Error())) } as unknown as PaymentProvider;
        useCase = new ChargeBookingUseCase(bookingRepository, priceService, paymentProvider, emailService);
      });
      it('Should Throw an error that the payment could not go throw', async () => {
        await expect(useCase.execute(mockBooking)).rejects.toThrowError(ErrorCode.PAYMENT_FAILED);
      });
      it('Should send an email to clean green and the customer', async () => {
        await expect(useCase.execute(mockBooking)).rejects.toThrowError();
        expect(emailService.send).toHaveBeenCalledTimes(2);
      });
    });
  });
});
