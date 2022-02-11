import { AccountModel } from './account.model';

export interface EmployeeModel {
    account: AccountModel;
    employeeId: string;
}
