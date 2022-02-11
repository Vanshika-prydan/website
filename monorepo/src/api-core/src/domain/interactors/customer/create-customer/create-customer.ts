import * as Sentry from '@sentry/node';
import { container, inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { ICustomer } from '../../../entities/Customer';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import EmailService from '../../../services/email-service';
import { ICreateCustomerPayload } from './types';
import PaymentProvider from '../../../services/payment-provider';

import newCustomerEmail from './new-customer-email';
import AccountService from '../../../services/account-service';
import { ServerNotificationService, SERVER_NOTIFICATION_SERVICE } from '../../../interface-adapters/gateways/server-notification-service';

@injectable()
export class CreateCustomerUseCase implements IUseCase<ICreateCustomerPayload, ICustomer> {
  constructor (
    @inject(CUSTOMER_REPOSITORY_INTERFACE) private customerRepository:ICustomerRepository,
    private readonly emailService:EmailService,
    @inject(SERVER_NOTIFICATION_SERVICE) private readonly serverNotificationService: ServerNotificationService,
  ) {
  }

  private async validateAndFormatAllFields (payload:ICreateCustomerPayload): Promise<ICreateCustomerPayload> {
    const validatedAndFormated: ICreateCustomerPayload = {
      firstName: AccountService.validateAndFormatFirstName(payload.firstName),
      lastName: AccountService.validateAndFormatLastName(payload.lastName),
      email: AccountService.validateAndFormatEmail(payload.email),
      personalIdentityNumber: AccountService.ValidateAndFormatPersonalIdentityNumber(payload.personalIdentityNumber) ?? '',
      password: payload.password ? await AccountService.validateAndEncryptPassword(payload.password) : undefined,
      phoneNumber: payload.phoneNumber ? AccountService.validateAndFormatPhoneNumber(payload.phoneNumber) : undefined,
      receiveMarketingCommunication: payload.receiveMarketingCommunication ?? false,
    };
    return Object.freeze(validatedAndFormated);
  }

  async execute ({ payload }:{payload:ICreateCustomerPayload}): Promise<ICustomer> {
    const validatedPayload = await this.validateAndFormatAllFields(payload);
    if (!validatedPayload.personalIdentityNumber) throw new Error(ErrorCode.MISSING_PERSONAL_IDENTITY_NUMBER);

    await this.ensureThatEmailDoesNotExistInDB(validatedPayload);
    await this.ensureThatSSNDoesNotExistInDB(validatedPayload);
    await this.ensureThatPhoneNumberDoesNotExistInDB(validatedPayload);

    const password = await AccountService.generatePassword();
    const createdCustomer = await this.registerCustomerInRepository(validatedPayload, password);
    await this.sendWelcomeEmailToCustomer(createdCustomer, validatedPayload, password);
    await this.serverNotificationService.send('New customer registered!');

    return createdCustomer;
  }

  private async registerCustomerInRepository (validatedPayload: ICreateCustomerPayload, password: { rawPassword: string; encryptedPassword: string; }) {
    const createdCustomer = await this.customerRepository.create({ ...validatedPayload, password: password.encryptedPassword });
    const stripe = await container.resolve(PaymentProvider).registerCustomer(createdCustomer);
    await this.customerRepository.update({ ...createdCustomer, stripeId: stripe.id });
    return createdCustomer;
  }

  private async ensureThatPhoneNumberDoesNotExistInDB (validatedPayload: ICreateCustomerPayload) {
    if (validatedPayload.phoneNumber) {
      const phoneNumberExists = await this.customerRepository.findByPhoneNumber(validatedPayload.phoneNumber) !== undefined;
      if (phoneNumberExists)
        throw new Error(ErrorCode.PHONE_NUMBER_ALREADY_EXISTS);
    }
  }

  private async ensureThatSSNDoesNotExistInDB (validatedPayload: ICreateCustomerPayload) {
    const personalIdentityNumberExists = await (this.customerRepository.findByPersonalIdentityNumber(validatedPayload.personalIdentityNumber)) !== undefined;
    if (personalIdentityNumberExists)
      throw new Error(ErrorCode.PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS);
  }

  private async ensureThatEmailDoesNotExistInDB (validatedPayload: ICreateCustomerPayload) {
    const emailExists = await this.customerRepository.findByEmail(validatedPayload.email) !== undefined;
    if (emailExists)
      throw new Error(ErrorCode.EMAIL_ALREADY_EXISTS);
  }

  private async sendWelcomeEmailToCustomer (createdCustomer: ICustomer, validatedPayload: ICreateCustomerPayload, password: { rawPassword: string; encryptedPassword: string; }) {
    if (process.env.NODE_ENV !== 'local')
      try {
        await this.emailService.send(createdCustomer.account.email, 'Välkommen till We Clean Green!', newCustomerEmail(validatedPayload.email, password.rawPassword), `Välkommen som kund!\nDitt användarnamn är: ${validatedPayload.email} och du har tilldelats lösenordet: ${password.rawPassword}\n.`);
      } catch (e) {
        Sentry.captureException(e);
      }
  }
}
