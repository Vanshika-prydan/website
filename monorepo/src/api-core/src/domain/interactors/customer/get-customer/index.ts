import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { ICustomer } from '../../../entities/Customer';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import { AccountService } from '../../../services/account-service';

@injectable()
export default class GetCustomerUseCase {
  constructor (
      @inject(CUSTOMER_REPOSITORY_INTERFACE) private readonly customerRepository: ICustomerRepository,
      @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
  ) {}

  async execute ({ customerId, idOfExecutingAccount }: { customerId: string; idOfExecutingAccount: string; }): Promise<ICustomer> {
    const customer = await this.loadCustomerOrFail(customerId);
    await this.checkPermissionsOrFail(customer, idOfExecutingAccount);
    return customer;
  }

  private async checkPermissionsOrFail (customer: ICustomer, idOfExecutingAccount: string) {
    if (customer.account.accountId !== idOfExecutingAccount)
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.CUSTOMER_LIST_ALL);
  }

  private async loadCustomerOrFail (customerId: string) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer)
      throw new Error(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    return customer;
  }
}
