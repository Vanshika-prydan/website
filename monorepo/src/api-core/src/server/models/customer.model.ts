import { ICustomer } from '../../domain/entities/Customer';
import { AccountDTO, AccountModel } from './account.model';
import { CustomerAddressDto, CustomerAddressModel } from './customer-address.model';

export interface CustomerModel {
    customerId: string,
    account: AccountModel,
    addresses?: CustomerAddressModel[],
    receiveMarketingCommunication: boolean;
}

export class CustomerDTO implements CustomerModel {
    customerId: string;
    account: AccountModel;
    addresses?: CustomerAddressModel[];
    receiveMarketingCommunication: boolean;

    constructor ({ customerId, account, addresses, receiveMarketingCommunication }:ICustomer) {
      this.customerId = customerId;
      this.account = new AccountDTO(account);
      this.addresses = addresses ? addresses.map(a => new CustomerAddressDto(a)) : undefined;
      this.receiveMarketingCommunication = receiveMarketingCommunication;
    }
}
