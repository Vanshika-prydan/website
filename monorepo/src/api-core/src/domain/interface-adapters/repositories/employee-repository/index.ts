import { IEmployee } from '../../../entities/Employee/IEmployee';
import { ICreateEmployeePayload } from '../../../interactors/employee/create-employee/types';

export const EMPLOYEE_REPOSITORY_INTERFACE = 'IEmployeeRepository';
export interface IEmployeeRepository {
    create(employee:ICreateEmployeePayload):Promise<IEmployee>,
    findByEmail(email:string):Promise<IEmployee | undefined>,
    getAll():Promise<IEmployee[]>,
    findByEmployeeId(employeeId: string):Promise<IEmployee | undefined>,
    fetchByIdOrFail(employeeId: string): Promise<IEmployee>;
    findByAccountId(accountId:string):Promise<IEmployee | undefined>,
}
