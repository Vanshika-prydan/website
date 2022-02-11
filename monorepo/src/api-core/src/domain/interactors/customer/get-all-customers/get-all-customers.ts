import IUseCase from '../../IUseCase';
import { ICustomer } from '../../../entities/Customer';
import Permission from '../../../entities/Permission';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { AccountService } from '../../../services/account-service';

interface ISetup {
    customerRepository: ICustomerRepository,
    accountRepository: IAccountRepository,
}

export class GetAllCustomersUseCase implements IUseCase<undefined, ICustomer[]> {
    private readonly customerRepository: ICustomerRepository;
    private readonly accountRepository: IAccountRepository;

    constructor ({ customerRepository, accountRepository }:ISetup) {
      this.customerRepository = customerRepository;
      this.accountRepository = accountRepository;
    }

    async execute ({ idOfExecutingAccount }:{idOfExecutingAccount:string}): Promise<ICustomer[]> {
      try {
        await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.CUSTOMER_LIST_ALL);
        return this.customerRepository.getAll();
      } catch (e) {
        const customer = await this.customerRepository.findByAccountId(idOfExecutingAccount);
        return customer ? [customer] : [];
      }
    }
};
