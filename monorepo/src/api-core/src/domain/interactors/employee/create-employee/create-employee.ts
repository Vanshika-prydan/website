import IUseCase from '../../IUseCase';
import { IEmployee } from '../../../entities/Employee/IEmployee';
import Permission from '../../../entities/Permission';
import { EMPLOYEE_REPOSITORY_INTERFACE, IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { ICreateEmployeePayload } from './types';
import { ErrorCode } from '../../../entities/ErrorCode';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { AccountService } from '../../../services/account-service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateEmployeeUseCase implements IUseCase<ICreateEmployeePayload, IEmployee> {
  constructor (
  @inject(EMPLOYEE_REPOSITORY_INTERFACE) private readonly employeeRepository:IEmployeeRepository,
  @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
  ) {}

  private async validateAndFormatAllFields (payload:ICreateEmployeePayload): Promise<ICreateEmployeePayload> {
    const validatedAndFormated:ICreateEmployeePayload = {
      firstName: AccountService.validateAndFormatFirstName(payload.firstName),
      lastName: AccountService.validateAndFormatLastName(payload.lastName),
      email: AccountService.validateAndFormatEmail(payload.email),
      phoneNumber: payload.phoneNumber ? AccountService.validateAndFormatPhoneNumber(payload.phoneNumber) : undefined,
      password: await AccountService.validateAndEncryptPassword(payload.password),
    };
    return Object.freeze(validatedAndFormated);
  }

  async execute ({ payload, idOfExecutingAccount }:{payload: ICreateEmployeePayload, idOfExecutingAccount: string}): Promise<IEmployee> {
    const validatedPayload = await this.validateAndFormatAllFields(payload);
    await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.EMPLOYEE_CREATE);
    await this.checkThatEmailDoesNotExist(validatedPayload);
    await this.checkThatPhoneNumberDoesNotExist(validatedPayload);
    return this.employeeRepository.create(validatedPayload);
  }

  private async checkThatEmailDoesNotExist (validatedPayload: ICreateEmployeePayload) {
    const emailExists = await this.employeeRepository.findByEmail(validatedPayload.email) !== undefined;
    if (emailExists)
      throw new Error(ErrorCode.EMAIL_ALREADY_EXISTS);
  }

  private async checkThatPhoneNumberDoesNotExist (validatedPayload: ICreateEmployeePayload) {
    const phoneNumber = validatedPayload.phoneNumber;
    if (phoneNumber) {
      const phoneNumberExists = await this.accountRepository.findByPhoneNumber(phoneNumber);
      if (phoneNumberExists)
        throw new Error(ErrorCode.PHONE_NUMBER_ALREADY_EXISTS);
    }
  }
}
