import { getConnection, getRepository } from 'typeorm';
import validator from 'validator';
import { Account } from '../../database/entities/Account';
import { Role } from '../../database/entities/Role';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { ICreateEmployeePayload } from '../../domain/interactors/employee/create-employee/types';
import { IEmployeeRepository } from '../../domain/interface-adapters/repositories/employee-repository';
import { Employee } from '../../database/entities/Employee';
import { IEmployee } from '../../domain/entities/Employee';

export class EmployeeRepository implements IEmployeeRepository {
  async fetchByIdOrFail (employeeId: string): Promise<IEmployee> {
    const employee = await this.findByEmployeeId(employeeId);
    if (!employee) throw new Error(ErrorCode.EMPLOYEE_DOES_NOT_EXIST);
    return employee;
  }

  findByAccountId (accountId: string): Promise<IEmployee | undefined> {
    if (!validator.isUUID(accountId)) throw new Error(ErrorCode.INVALID_UUID_FORMAT);
    return getRepository(Employee).findOne({ where: { account: { accountId } } });
  }

  async findByEmployeeId (employeeId:string): Promise<IEmployee | undefined> {
    if (!validator.isUUID(employeeId)) throw new Error(ErrorCode.INVALID_UUID_FORMAT);
    return getRepository(Employee).findOne({ where: { employeeId }, relations: ['account', 'account.roles', 'address'] });
  }

  async create (payload: ICreateEmployeePayload): Promise<IEmployee> {
    const employeeRole = await getRepository(Role).findOneOrFail('EMPLOYEE');
    try {
      const account = new Account();
      account.email = payload.email;
      account.firstName = payload.firstName;
      account.lastName = payload.lastName;
      account.password = payload.password;
      account.phoneNumber = payload.phoneNumber;
      account.roles = [employeeRole];
      await getRepository(Account).save(account);

      const employee = new Employee();
      employee.account = account;
      await getRepository(Employee).save(employee);
      return employee;
    } catch (e) {
      throw new Error(ErrorCode.CONSTRAINT_VIOLATED);
    }
  }

  async findByEmail (email: string): Promise<IEmployee | undefined> {
    const account = await getConnection().getRepository(Account).findOne({ where: { email } });
    if (!account) return undefined;
    return getRepository(Employee).findOne({ where: { account }, relations: ['account', 'account.roles', 'address'] });
  }

  async getAll (): Promise<IEmployee[]> {
    return getConnection().getRepository(Employee).find({ relations: ['account', 'account.roles', 'address'] });
  }

  static initiate () {
    const repo = new EmployeeRepository();
    return repo;
  }
}
