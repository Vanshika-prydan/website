import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IBooking } from '../../../entities/Booking';
import ChargeBookingUseCase from '../charge-booking/charge-booking';
import SendNotificationUseCase from '../../notifications/send-notification';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { AccountService } from '../../../services/account-service';
import EmailService from '../../../services/email-service';

export type bookingId = string;

@injectable()
export default class CompleteBookingUseCase implements IUseCase<string, IBooking> {
  constructor (
    private readonly chargeBookingUseCase: ChargeBookingUseCase,
      @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
      @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
      private readonly emailService: EmailService,
      private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  private sendFailingEmails (booking:IBooking) {
    this.emailService.send(booking.customer.account.email, 'Din betalning för din städning misslyckades | We Clean Green Sweden AB',
      'Hej!\n Vi vill uppmärksamma dig om att din betalning för din städning misslyckades. Du kommer bli kontaktad från vårt team. \n Med vänlig hälsning,\n We Clean Green');
  }

  async execute ({ payload, idOfExecutingAccount }: { payload:bookingId; idOfExecutingAccount: string; }): Promise<IBooking> {
    await AccountService.loadFromAccountIdAndCheckPermission(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_MARK_AS_COMPLETED);
    const booking = await this.bookingRepository.getById(payload);
    if (!booking) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    if (booking.completed) throw new Error(ErrorCode.CONSTRAINT_VIOLATED);

    try {
      const updatedBooking = await this.chargeBookingUseCase.execute(booking);

      await this.sendNotificationUseCase.execute({ account: booking.customer.account, notification: { title: 'Städningen är utförd!', message: 'Hej! Din städning är nu utförd och ditt kvitto finns på din mail. Tack för att du väljer oss!' } });

      return updatedBooking;
    } catch (e) {
      this.sendFailingEmails(booking);
      await this.sendNotificationUseCase.execute({ account: booking.customer.account, notification: { title: 'Misslyckad betalning', message: 'Din betalning misslyckades. Vi kommer att försöka dra pengar vid ett senare tillfälle. Om något har förändrats, se till att uppdatera dina betlaningsmetoder' } });
      throw new Error(ErrorCode.PAYMENT_FAILED);
    }
  }
}
