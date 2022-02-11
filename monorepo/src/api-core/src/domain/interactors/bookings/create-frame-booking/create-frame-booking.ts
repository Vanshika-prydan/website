import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import { AccountService } from '../../../services/account-service';
import BookingService from '../../../services/booking-service';
import {
  CreateFrameBookingRequestPayload,
} from './types';
import CustomerService from '../../../services/customer-service';
import { FrameBookingFullyDefined } from '../../../entities/FrameBooking/IFrameBooking';
import { inject, injectable } from 'tsyringe';
import BookingServiceFacade from '../../../services/booking';
import EmailService from '../../../services/email-service';

@injectable()
export class CreateFrameBookingUseCase
implements IUseCase<CreateFrameBookingRequestPayload, FrameBookingFullyDefined> {
  constructor (
   @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
   @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
    private readonly bookingService: BookingService,
    private readonly bookingServiceFacade: BookingServiceFacade,
    private readonly emailService: EmailService,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: CreateFrameBookingRequestPayload; idOfExecutingAccount: string;}): Promise<FrameBookingFullyDefined> {
    if (payload.customerId) await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_ADD_BOOKING_TO_CUSTOMER);

    const customerId = payload.customerId ?? (await CustomerService.loadCustomerFromAccountId(this.customerRepository, idOfExecutingAccount)).customerId;

    const frameBooking = await this.bookingService.createFrameBooking({ ...payload, customerId });

    await this.bookingServiceFacade.sendNewBookingNotification(frameBooking);

    await this.emailService.send(frameBooking.customer.account.email, 'Bokningsbekräftelsen | We Clean Green', '<h1>Tack för din bokning!</h1><p>Du kan hantera din bokning genom att logga in på appen.</p><p>Vi ses!</p>');

    return frameBooking;
  }
}
