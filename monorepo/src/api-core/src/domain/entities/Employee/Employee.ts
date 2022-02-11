import { v4 } from 'uuid';
import { Optional } from '../../../types/optional';
import { IEmployee } from '.';
import Account from '../Account';
import Address from '../Address';
import { Constructor, EmployeeLightInterface } from './types';
export class Employee implements IEmployee {
  employeeId: string;
  account: Account;
  address?: Address;

  constructor (data: Optional<IEmployee, 'employeeId'>) {
    this.employeeId = data.employeeId ?? v4();
    this.account = new Account(data.account);
    this.address = data.address ? new Address(data.address) : undefined;
  }
}

export class EmployeeLight implements EmployeeLightInterface {
    employeeId!:string;
    accountId!: string;
    account?: Account;
    address?: Address;
    addressId?: string;
    constructor (data: Constructor) {
      this.employeeId = data.employeeId ?? v4();
      this.account = data.account ? new Account(data.account) : undefined;
      this.accountId = data.account?.accountId ?? data.accountId!;
      this.address = data.address ? new Address(data.address) : undefined;
      this.addressId = data.address?.addressId ?? data.addressId;
    }
}
