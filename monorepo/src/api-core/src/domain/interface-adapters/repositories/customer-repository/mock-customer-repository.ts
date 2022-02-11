import ICustomerRepository from '.';
import { mockCustomer } from '../../../../../mock/customer';

export const mockCustomerRepository: ICustomerRepository = {
  create: jest.fn(() => Promise.resolve(mockCustomer)),
  update: jest.fn(() => Promise.resolve(mockCustomer)),
  findByEmail: jest.fn(() => Promise.resolve(mockCustomer)),
  findByPersonalIdentityNumber: jest.fn(() => Promise.resolve(mockCustomer)),
  findByPhoneNumber: jest.fn(() => Promise.resolve(mockCustomer)),
  getAll: jest.fn(() => Promise.resolve([mockCustomer])),
  findById: jest.fn(() => Promise.resolve(mockCustomer)),
  findByAccountId: jest.fn(() => Promise.resolve(mockCustomer)),
};
