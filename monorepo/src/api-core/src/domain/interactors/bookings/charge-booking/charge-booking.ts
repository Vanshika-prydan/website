import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmailService from '../../../services/email-service';
import PaymentProvider from '../../../services/payment-provider';
import PriceService from '../../../services/price-service';
import logger from '../../../../utilities/logging';
import failedPaymentEmail from './failed-payment-email';
import successfulPaymentEmail from './successful-payment-email';
import { BookingFullyDefined } from '../../../entities/Booking';

@injectable()
export default class ChargeBookingUseCase {
  constructor (
      @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
      private readonly priceService: PriceService,
      private readonly paymentProvider: PaymentProvider,
      private readonly emailService: EmailService,
  ) {}

  private async sendFailingEmails (booking:BookingFullyDefined) {
    this.emailService.send('info@cleangreen.se',
    `Payment failed from customer email ${booking.customer.account.email}`,
     `Payment failed, contact the customer ${booking.customer.account.firstName} ${booking.customer.account.lastName} 
     (${booking.customer.account.phoneNumber ?? ''} ${booking.customer.account.email}  ) `);
    this.emailService.send(booking.customer.account.email, 'Din betalning gick inte igenom | We Clean Green', await failedPaymentEmail(booking));
  }

  private sendSuccessEmail (booking:BookingFullyDefined) {
    const receiptId = Date.now().toString();
    this.emailService.send(booking.customer.account.email, `Kvitto | We Clean Green | ${receiptId}`, successfulPaymentEmail(booking, receiptId));
    this.emailService.send(process.env.EMAIL_ADDRESS_FOR_RECEIPT!, `Kvitto  ${receiptId}`, successfulPaymentEmail(booking, receiptId));
  }

  private async chargeCustomerAndUpdateModel (booking:BookingFullyDefined, amountInOre: number) {
    const updatedBooking = { ...booking };
    try {
      const paymentId = await this.paymentProvider.charge(booking.customer, amountInOre);
      updatedBooking.completed = true;
      updatedBooking.paymentCompleted = true;
      updatedBooking.stripePaymentId = paymentId;
    } catch (error) {
      logger.warn('Could not charge the customer', { error });
      updatedBooking.completed = true;
      updatedBooking.paymentCompleted = false;
    }
    return updatedBooking;
  }

  async execute (booking:BookingFullyDefined): Promise<BookingFullyDefined> {
    const bookingIsAlreadyCompletedAndCharged = booking.completed && booking.paymentCompleted;
    if (bookingIsAlreadyCompletedAndCharged) return booking;

    const chargeableAmountInOre = await this.priceService.calculateChargeableAmount(booking);
    const updatedBooking = await this.chargeCustomerAndUpdateModel(booking, chargeableAmountInOre);

    const saved = await this.bookingRepository.save(updatedBooking);
    if (!updatedBooking.paymentCompleted) {
      this.sendFailingEmails(booking);
      throw new Error(ErrorCode.PAYMENT_FAILED);
    }
    this.sendSuccessEmail(booking);
    return saved;
  }
}
