import { ICustomer } from '../../../entities/Customer';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { GetAllCustomersUseCase } from './get-all-customers';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import Permission from '../../../entities/Permission';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import MockCustomer from '../../../entities/Customer/mock-customer';

describe('Get all customers use case', () => {
  it('should only return a list with one or zero customers (is customer or not) if the account does not have correct access.', async () => {
    const customer = new MockCustomer();
    // @ts-ignore
    const customerRepository: ICustomerRepository = { findByAccountId: jest.fn(() => Promise.resolve(customer)) };
    // @ts-ignore
    const accountRepository: IAccountRepository = {};
    const useCase = new GetAllCustomersUseCase({ customerRepository, accountRepository });
    await expect(useCase.execute({ idOfExecutingAccount: customer.account.accountId })).resolves.toEqual([customer]);
  });

  it('should return the list with all customers', async () => {
    const customerList = [] as unknown as ICustomer[];
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.CUSTOMER_LIST_ALL);

    const customerRepository = { getAll: jest.fn(() => Promise.resolve(customerList)) } as unknown as ICustomerRepository;

    const useCase = new GetAllCustomersUseCase({ customerRepository, accountRepository });

    await expect(useCase.execute({ idOfExecutingAccount: 'uuuid' })).resolves.toBe(customerList);
  });
});
