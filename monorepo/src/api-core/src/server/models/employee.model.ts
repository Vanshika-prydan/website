import { IEmployee } from '../../domain/entities/Employee';
import { AccountDTO, AccountModel } from './account.model';
import { AddressDTO, AddressModel } from './address.model';

export interface EmployeeModel {
     employeeId: string;
     account: AccountModel;
     address?: AddressModel | null;
}

export class EmployeeDTO implements EmployeeModel {
    employeeId: string;
    account: AccountModel;
    address?: AddressModel | null;

    constructor ({ employeeId, account, address }: IEmployee,
    ) {
      this.employeeId = employeeId;
      this.account = new AccountDTO(account);
      this.address = address ? new AddressDTO(address) : undefined;
    }
}
