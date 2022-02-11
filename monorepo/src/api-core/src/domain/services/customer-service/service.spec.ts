import CustomerService from '.';
import { ICustomer } from '../../entities/Customer';
import { ErrorCode } from '../../entities/ErrorCode';
import ICustomerRepository from '../../interface-adapters/repositories/customer-repository';
import MockCustomer from '../../entities/Customer/mock-customer';

describe('CustomerService', () => {
  let customerRepository: ICustomerRepository;
  let customerService:CustomerService;

  const customer = new MockCustomer();
  const payload = customer.customerId;

  beforeEach(() => {
    // @ts-ignore
    customerRepository = { findById: jest.fn(() => Promise.resolve(customer)) };
    customerService = new CustomerService(customerRepository);
  });

  describe('findByIdOrFail', () => {
    it('Should return a customer', async () => {
      await expect(customerService.findByIdOrFail(payload)).resolves.toBe(customer);
    });
  });

  describe('isCustomer', () => {
    it('should return true if an customer i provided', () => {
      const customer = { customerId: 'uuid' } as unknown as ICustomer;
      expect(CustomerService.isCustomer(customer)).toBeTruthy();
    });
    it('should return false if an customerId is provided', () => {
      const customerId = 'uuid';
      expect(CustomerService.isCustomer(customerId)).toBeFalsy();
    });
  });
  describe('loadCustomerById', () => {
    it('should return an customer', async () => {
      const result = {};
      const customerRepository = { findById: jest.fn(() => Promise.resolve(result)) } as unknown as ICustomerRepository;
      await expect(CustomerService.loadCustomerById(customerRepository, 'uuid')).resolves.toBe(result);
      expect(customerRepository.findById).toHaveBeenCalledWith('uuid');
    });
    it('should throw error if the customer does not exist', async () => {
      const customerRepository = { findById: jest.fn(() => undefined) } as unknown as ICustomerRepository;
      await expect(CustomerService.loadCustomerById(customerRepository, 'uuid')).rejects.toThrowError(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    });
  });
  describe('ensurePresentCustomer', () => {
    it('should get an customer from the repository with an uuid', async () => {
      const resultFromRepository = {};
      const empoyeeId = 'uuid';
      const customerRepository = { findById: jest.fn(() => Promise.resolve(resultFromRepository)) } as unknown as ICustomerRepository;
      await expect(CustomerService.ensurePresentCustomer(customerRepository, empoyeeId)).resolves.toBe(resultFromRepository);
    });
    it('should return the same customer if it was called with an customer', async () => {
      const empoyee = { customerId: 'uuid' } as unknown as ICustomer;
      const customerRepository = { } as unknown as ICustomerRepository;
      await expect(CustomerService.ensurePresentCustomer(customerRepository, empoyee)).resolves.toBe(empoyee);
    });
  });
  describe('loadCustomerFromAccountId', () => {
    const mockCustomer = new MockCustomer();
    it('should load a customer', async () => {
      const customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
      await expect(CustomerService.loadCustomerFromAccountId(customerRepository, 'accountId')).resolves.toBe(mockCustomer);
    });
    it('should  throw an error if the the customer does not exists withnthe account id', async () => {
      const customerRepository = { findByAccountId: jest.fn(() => Promise.resolve()) } as unknown as ICustomerRepository;
      await expect(CustomerService.loadCustomerFromAccountId(customerRepository, 'accountId')).rejects.toThrowError(ErrorCode.CUSTOMER_DOES_NOT_EXIST);
    });
    it('be possible to use the class method too', async () => {
      const customerRepository = { findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)) } as unknown as ICustomerRepository;
      const service = new CustomerService(customerRepository);
      await expect(service.loadCustomerFromAccountId('accountId')).resolves.toBe(mockCustomer);
    });
  });
});
