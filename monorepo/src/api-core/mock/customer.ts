import { ICustomer } from '../src/domain/entities/Customer';
import { mockAccount } from './account';
export const mockCustomer: ICustomer = Object.freeze({
  customerId: 'e661d6f1-dec0-46fd-810c-85ae21d9f600',
  account: mockAccount,
  receiveMarketingCommunication: true,
  stripeId: 'cus_JYM0hrMB0GCGi0',
});
