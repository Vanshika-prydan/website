import { ICustomer } from './ICustomer';
import CustomerAddress from '../CustomerAddress';
import { Optional } from '../../../types/optional';
import Account from '../Account';
import { v4 } from 'uuid';

export class Customer implements ICustomer {
    readonly customerId: string;
    readonly account: Account;
    readonly addresses?: CustomerAddress[];
    readonly receiveMarketingCommunication: boolean;
    readonly stripeId?: string;

    constructor (c:Optional<ICustomer, 'customerId'>) {
      this.customerId = c.customerId ?? v4();
      this.account = new Account(c.account);
      this.addresses = c.addresses?.map(address => new CustomerAddress(address)) ?? undefined;
      this.receiveMarketingCommunication = c.receiveMarketingCommunication;
      this.stripeId = c.stripeId;
    }
}
