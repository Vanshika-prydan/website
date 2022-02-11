import { AccountModel } from './account.model';
import { CustomerAddressModel } from './customer-address.model';

export interface CustomerModel {
  customerId: string;
  account: AccountModel;
  addresses?: CustomerAddressModel[];
  receiveMarketingCommunication: boolean;
}
