import { IAccount } from '../Account/IAccount';
import { ICustomerAddress } from '../CustomerAddress';

export interface ICustomer {
    customerId: string,
    account: IAccount,
    addresses?: ICustomerAddress[];
    receiveMarketingCommunication: boolean;
    stripeId?: string;
}
