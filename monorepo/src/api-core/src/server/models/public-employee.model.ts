import validator from 'validator';
import { IEmployee } from '../../domain/entities/Employee';

export interface PublicEmployeeModel {
    employeeId: string,
    firstName: string,
    lastName: string,
}

export class PublicEmployeeDTO implements PublicEmployeeModel {
    public readonly employeeId: string;
    public readonly firstName: string;
    public readonly lastName: string;
    constructor (employee: IEmployee) {
      this.employeeId = employee.employeeId;
      this.firstName = validator.escape(employee.account.firstName);
      this.lastName = validator.escape(employee.account.lastName);
    }
}
