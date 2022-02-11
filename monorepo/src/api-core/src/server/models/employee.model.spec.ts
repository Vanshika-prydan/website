import { IAccount } from '../../domain/entities/Account';
import { IEmployee } from '../../domain/entities/Employee';
import Permission from '../../domain/entities/Permission';
import { IRole } from '../../domain/entities/Role';
import { EmployeeDTO } from './employee.model';

describe('Employee response model', () => {
  const roles: IRole[] = [{
    name: 'string',
    permissions: [Permission.EMPLOYEE_CREATE],
    description: 'string',
  }];
  const account: IAccount = {
    accountId: 'uuid',
    dateCreated: new Date('2021-03-17T06:46:15.158Z'),
    dateUpdated: new Date('2021-03-17T06:46:15.158Z'),
    email: 'hej@hej.se',
    firstName: 'first',
    lastName: 'lastname',
    password: 'pass',
    phoneNumber: 'phone',
    roles,
  };

  const mockEmp:IEmployee = {
    employeeId: 'uuid',
    account,
  };

  it('Should parse an employee of the given model ', () => {
    const expectedResult = {
      employeeId: 'uuid',
      account: {
        accountId: 'uuid',
        firstName: 'first',
        lastName: 'lastname',
        email: 'hej@hej.se',
        phoneNumber: 'phone',
        dateCreated: '2021-03-17T06:46:15.158Z',
        dateUpdated: '2021-03-17T06:46:15.158Z',
        roles: [
          {
            name: 'string',
            permissions: ['EMPLOYEE_CREATE'],
            description: 'string',
          },
        ],
      },
      address: undefined,
    };
    expect(new EmployeeDTO(mockEmp)).toEqual(expectedResult);
  });
});
