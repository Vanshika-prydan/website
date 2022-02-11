import { v4 } from 'uuid';
import Employee, { IEmployee } from '.';
import MockAccount from '../Account/mock-account';

export default class MockEmployee extends Employee {
  constructor (values:Partial<IEmployee> = {}) {
    super({
      account: values.account ?? new MockAccount(),
      address: values.address,
      employeeId: values.employeeId ?? v4(),
    });
  }
}
