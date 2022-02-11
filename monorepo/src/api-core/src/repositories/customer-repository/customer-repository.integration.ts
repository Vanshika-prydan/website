import { CustomerRepository } from './customer-repository';
import { closeConnection, openConnection } from '../../database/test-setup';
import { Customer } from '../../database/entities/Customer';
import { setupDatabase } from '../../database/seeds';

describe('CustomerRepository', () => {
  beforeEach(async () => {
    await openConnection();
    await setupDatabase();
  });
  afterEach(async () => {
    await closeConnection();
  });
  describe('create', () => {
    it('should create a new record in the database', async () => {
      const params = {
        firstName: 'Förstanamn',
        lastName: 'Efternamn',
        email: 'niklas@sluh.se',
        password: 'pass',
        personalIdentityNumber: '770929-8553',

      };
      const resolveValue = {
        account: {
          email: 'niklas@sluh.se',
          firstName: 'Förstanamn',
          lastName: 'Efternamn',
          phoneNumber: null,
          password: 'pass',
          accountId: expect.any(String),
          dateCreated: expect.any(Date),
          dateUpdated: expect.any(Date),
          roles: [{ name: 'CUSTOMER', description: expect.any(String), permissions: expect.anything() }],
        },
        customerId: expect.any(String),
      };
      const customer = await CustomerRepository.initiate().create(params);
      expect(customer).toEqual(expect.objectContaining(resolveValue));
    });
  });

  describe('findByEmail', () => {
    it('should get undefined if the email does not exists', async () => {
      const email = 'niklas@sluh.se';
      await expect(CustomerRepository.initiate().findByEmail(email)).resolves.toBeUndefined();
    });
    it('should return a customer if the user exists', async () => {
      const email = 'niklas@sluh.se';
      const params = {
        firstName: 'Förstanamn',
        lastName: 'Efternamn',
        email,
        personalIdentityNumber: '770929-8553',

      };
      const resolveValue = {
        account: {
          email: 'niklas@sluh.se',
          firstName: 'Förstanamn',
          lastName: 'Efternamn',
          phoneNumber: null,
          password: null,
          accountId: expect.any(String),
          dateCreated: expect.any(Date),
          dateUpdated: expect.any(Date),
          roles: [{ name: 'CUSTOMER', description: expect.any(String), permissions: expect.anything() }],
        },
        customerId: expect.any(String),
      };
      await CustomerRepository.initiate().create(params);
      await expect(CustomerRepository.initiate().findByEmail(email)).resolves.toEqual(expect.objectContaining(resolveValue));
    });
  });
  describe('getAllCustomers', () => {
    it('should get an empty list of customers', async () => {
      await expect(CustomerRepository.initiate().getAll()).resolves.toEqual([]);
    });
  });
  describe('findById', () => {
    it('should get undefined if the id does not exists', async () => {
      const customer = new Customer();
      await expect(CustomerRepository.initiate().findById(customer.customerId)).resolves.toBeUndefined();
    });
    it('should return a customer if the user exists', async () => {
      const params = {
        firstName: 'Förstanamn',
        lastName: 'Efternamn',
        email: 'niklas@sluh.se',
        personalIdentityNumber: '770929-8553',
      };

      const user = await CustomerRepository.initiate().create(params);
      await expect(CustomerRepository.initiate().findById(user.customerId)).resolves.toEqual({ ...user, addresses: [] });
    });
  });
  describe('findByAccountId', () => {
    it('should get undefined if the id does not exists', async () => {
      await expect(CustomerRepository.initiate().findByAccountId('0593cfcb-c2a1-4c7d-8881-b6ef74feb229')).resolves.toBeUndefined();
    });
    it('should return a customer if the user exists', async () => {
      const params = {
        firstName: 'Förstanamn',
        lastName: 'Efternamn',
        email: 'niklas@sluh.se',
        personalIdentityNumber: '770929-8553',
      };
      const user = await CustomerRepository.initiate().create(params);
      await expect(CustomerRepository.initiate().findByAccountId(user.account.accountId)).resolves.toEqual({ ...user, addresses: [] });
    });
  });
});
