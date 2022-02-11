import GetCustomerUseCase from '.';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import MockCustomer from '../../../entities/Customer/mock-customer';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';

describe('Get customer', () => {
  const customer = new MockCustomer();
  // @ts-ignore
  const customerRepository: ICustomerRepository = { findById: jest.fn(() => Promise.resolve(customer)) };
  // @ts-ignore
  const accountRepository:IAccountRepository = {};
  it('should return a customer with the given id', async () => {
    const facade = new GetCustomerUseCase(customerRepository, accountRepository);
    const result = await facade.execute({ idOfExecutingAccount: customer.account.accountId, customerId: customer.customerId });
    expect(result).toBe(customer);
  });
  it('Should throw an error if the account does not have the proper access', async () => {
    const accountRepository = generateAccountRepositoryForAuthorization();
    const facade = new GetCustomerUseCase(customerRepository, accountRepository);
    await expect(facade.execute({ idOfExecutingAccount: '46694920-d47b-44bb-9c36-f64cdefe2c94', customerId: customer.customerId })).rejects.toThrow(ErrorCode.ACCESS_DENIED);
  });
  it('Should get the customer if the access is there', async () => {
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.CUSTOMER_LIST_ALL);
    const facade = new GetCustomerUseCase(customerRepository, accountRepository);
    const result = await facade.execute({ idOfExecutingAccount: '46694920-d47b-44bb-9c36-f64cdefe2c94', customerId: customer.customerId });
    expect(result).toBe(customer);
  });

  it('should throw an error if the customer does not exist', async () => {
    // @ts-ignore
    const customerRepository: ICustomerRepository = { findById: jest.fn(() => Promise.resolve(undefined)) };
    const facade = new GetCustomerUseCase(customerRepository, accountRepository);
    await expect(facade.execute({ idOfExecutingAccount: customer.account.accountId, customerId: customer.customerId })).rejects.toThrow(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
  });
});
