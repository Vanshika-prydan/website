
import { IAccount } from '../Account';
import { IAddress } from '../Address';

export interface IEmployee {
    employeeId: string;
    account: IAccount;
    address?: IAddress;
}
