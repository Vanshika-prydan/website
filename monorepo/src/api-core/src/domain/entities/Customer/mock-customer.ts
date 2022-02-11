import Account, { IAccount } from '../Account';
import MockAccount from '../Account/mock-account';
import { ICustomerAddress } from '../CustomerAddress';
import { ICustomer } from './ICustomer';

export default class MockCustomer implements ICustomer {
    customerId: string;
    account: IAccount;
    addresses?: ICustomerAddress[] | undefined;
    receiveMarketingCommunication: boolean;
    stripeId?: string | undefined;
    constructor (payload: Partial<ICustomer> = {}) {
      this.customerId = payload.customerId ?? '4d55d767-3af7-4aed-9373-41b8c2b25536';
      this.account = payload.account ? new Account(payload.account) : new MockAccount();
      this.receiveMarketingCommunication = payload.receiveMarketingCommunication ?? true;
      this.stripeId = payload.stripeId ?? 'cus_Jbpk3G8dK1s1Fa';
      this.addresses = payload.addresses ?? undefined;
    }
}
