import { CustomerModel } from 'models/customer.model';
import apiService from '../services/api-service';

export const getCustomerIdFromAccountId = async (
  accountId: string
): Promise<string> => {
  const customers = await apiService.getCustomers();
  const customer = customers.find((c) => c.account.accountId === accountId);

  if (!customer) throw new Error('Could not find the customer');
  return customer.customerId;
};

export const getCustomerFromAccountId = async (
  accountId: string
): Promise<CustomerModel> => {
  const customers = await apiService.getCustomers();
  const customer = customers.find((c) => c.account.accountId === accountId);
  if (!customer) throw new Error('Could not find the customer');
  return customer;
};
