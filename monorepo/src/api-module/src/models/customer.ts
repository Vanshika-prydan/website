import { AccountModel } from './account';
import { CustomerAddressModel } from './customer-address';

export interface CustomerModel {
    customerId: string;
    account: AccountModel;
    addresses?: CustomerAddressModel[];
    receiveMarketingCommunication: boolean;
}
