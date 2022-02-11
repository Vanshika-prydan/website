import { Optional } from '../../../types/optional';
import { RequireOne } from '../../../types/require-one';
import { IAccount } from '../Account';
import { IAddress } from '../Address';

export interface EmployeeLightInterface {
    employeeId: string;
    accountId: string;
    account?: IAccount;
    address?: IAddress;
    addressId?: string;
}

export interface EmployeeLightWithAccount extends EmployeeLightInterface {
    account: NonNullable<EmployeeLightInterface['account']>
}

export interface EmployeeLightWithAddress extends EmployeeLightInterface {
    address: NonNullable<EmployeeLightInterface['address']>
}

export type EmployeeLightWithAccountAndAddress = EmployeeLightWithAccount & EmployeeLightWithAddress;

export type Constructor = Optional<Omit<EmployeeLightInterface, 'addressId' | 'address' | 'account' | 'accountId'>, 'employeeId'> & RequireOne<EmployeeLightInterface, 'accountId', 'account'> & Partial<Pick<EmployeeLightInterface, 'address' | 'addressId'>>;
