import { Account } from '../../database/entities/Account';
import { Customer } from '../../database/entities/Customer';
import { closeConnection, openConnection } from '../../database/test-setup';
import { IAddPayload } from '../../domain/interface-adapters/repositories/customer-address-repository/add-payload';
import { CustomerAddressRepository } from './customer-address-repository';
import { getRepository } from 'typeorm';

describe('Customer address repository', () => {
  beforeEach(async () => {
    await openConnection();
  });
  afterEach(async () => {
    await closeConnection();
  });
  describe('Add', () => {
    it('should be possible to add an address to an customer', async () => {
      const account = new Account();
      account.email = 'customer@cleangreen.se';
      account.firstName = 'Åke';
      account.lastName = 'Göransson';
      await getRepository(Account).save(account);
      const customer = new Customer();
      customer.account = account;
      await getRepository(Customer).save(customer);

      const payload:IAddPayload = {
        customerId: customer.customerId,
        information: 'info',
        street: 'Sturegatan 53, b',
        postalCity: 'Stockholm',
        postalCode: '33221',
        country: 'SE',
        code: '2233',
        addressName: 'Home',
      };

      const repo = new CustomerAddressRepository();

      const expectedValue = {
        address: {
          country: 'SE',
          addressName: 'Home',
          code: '2233',
          information: 'info',
          postalCity: 'Stockholm',
          postalCode: '33221',
          street: 'Sturegatan 53, b',
          addressId: expect.any(String),
        },
        customerAddressId: expect.any(String),
        isPrimaryAddress: true,
      };

      const address = await repo.add(payload);
      expect(address).toEqual(expect.objectContaining(expectedValue));
    });
    it('should throw an error if the customer does not exist', async () => {
      const payload:IAddPayload = {
        customerId: 'doesnotexist',
        information: 'info',
        street: 'Sturegatan 53, b',
        postalCity: 'Stockholm',
        postalCode: '33221',
        country: 'SE',
        code: '2233',
        addressName: 'Home',
      };

      const repo = new CustomerAddressRepository();

      await expect(repo.add(payload)).rejects.toThrowError();
    });
  });
});
