import EditCustomerAddressUseCase from '.';
import MockCustomer from '../../../entities/Customer/mock-customer';
import MockCustomerAddress from '../../../entities/CustomerAddress/mock-customer-address';
import { ICustomerAddressRepository } from '../../../interface-adapters/repositories/customer-address-repository';
import CustomerService from '../../../services/customer-service';

describe('Edit customer address facade', () => {
  const address = new MockCustomerAddress();
  const customer = new MockCustomer({ addresses: [address] });
  // @ts-ignore
  const customerAddressRepository: ICustomerAddressRepository = { save: jest.fn(() => Promise.resolve()) };

  const customerService: CustomerService = { findByIdOrFail: jest.fn(() => Promise.resolve(customer)) } as unknown as CustomerService;

  it('should save the object', async () => {
    const facade = new EditCustomerAddressUseCase(customerAddressRepository, customerService);
    const result = await facade.execute({ payload: { customerAddressId: address.customerAddressId, fieldsToUpdate: { address: { code: '1234' } } }, idOfExecutingAccount: 'uuid' });

    expect(result.address.code).toBe('1234');
  });
});
