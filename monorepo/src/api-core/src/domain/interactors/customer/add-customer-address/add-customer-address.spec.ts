import { mockCustomer } from '../../../../../mock/customer';
import { ICustomer } from '../../../entities/Customer';
import Permission from '../../../entities/Permission';
import { ICustomerAddressRepository } from '../../../interface-adapters/repositories/customer-address-repository';
import ICustomerRepository from '../../../interface-adapters/repositories/customer-repository';
import { AddCustomerAddressUseCase } from './add-customer-address';
import { IAddCustomerAddressPayload } from './types';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { ErrorCode } from '../../../entities/ErrorCode';
import { mockAccount } from '../../../../../mock/account';

const payload: IAddCustomerAddressPayload = {
  customerId: mockCustomer.customerId,
  information: 'hemma',
  street: 'Erksdalsgatan 41',
  postalCity: 'Stockholm',
  postalCode: '11122',
  country: 'SE',
  code: '9942',
  numberOfBathrooms: 1,
  homeAreaInM2: 100,
};

describe('add-and-bind-address-to-customer-use case', () => {
  it('should throw an error if the employee does not have the right access', async () => {
    const customer = { ...mockCustomer };
    const customerAddressRepository = {} as unknown as ICustomerAddressRepository;
    const customerRepository = { findById: jest.fn(() => Promise.resolve(customer)) } as unknown as ICustomerRepository;
    const accountRepository = generateAccountRepositoryForAuthorization();
    const useCase = new AddCustomerAddressUseCase(customerAddressRepository, customerRepository, accountRepository);
    const payload = {} as unknown as IAddCustomerAddressPayload;
    await expect(useCase.execute({ payload, idOfExecutingAccount: 'uuid' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
  it('should  be possible to create an address to the own account', async () => {
    const customer:ICustomer = { ...mockCustomer, account: { ...mockAccount } };
    customer.account.accountId = '853f32a3-1c3b-46bb-8b38-c752fa4e041c';
    const customerAddressRepository = { add: jest.fn(() => Promise.resolve()) } as unknown as ICustomerAddressRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.CUSTOMER_ADD_AND_BIND_ADDRESS);
    const customerRepository = { findById: jest.fn(() => Promise.resolve(customer)) } as unknown as ICustomerRepository;
    const useCase = new AddCustomerAddressUseCase(customerAddressRepository, customerRepository, accountRepository);

    await expect(useCase.execute({ payload, idOfExecutingAccount: '853f32a3-1c3b-46bb-8b38-c752fa4e041c' })).resolves.toEqual(customer);
  });
  it('should be possible to add a customer address', async () => {
    const customer:ICustomer = { ...mockCustomer };
    const customerAddressRepository = { add: jest.fn(() => Promise.resolve()) } as unknown as ICustomerAddressRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.CUSTOMER_ADD_AND_BIND_ADDRESS);
    const customerRepository = { findById: jest.fn(() => Promise.resolve(customer)) } as unknown as ICustomerRepository;
    const useCase = new AddCustomerAddressUseCase(customerAddressRepository, customerRepository, accountRepository);

    await expect(useCase.execute({ payload, idOfExecutingAccount: 'uuid' })).resolves.toEqual(customer);
  });
});
