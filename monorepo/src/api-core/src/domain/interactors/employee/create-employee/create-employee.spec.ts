import { IEmployee } from '../../../entities/Employee/IEmployee';
import Permission from '../../../entities/Permission';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { CreateEmployeeUseCase } from './create-employee';
import { ICreateEmployeePayload } from './types';
import { ErrorCode } from '../../../entities/ErrorCode';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { FIRSTNAME_IS_VIOLATED } from '../../../services/account-service';

describe('Create employee use case', () => {
  const createWithValues: ICreateEmployeePayload = Object.freeze({
    firstName: 'Anna',
    lastName: 'Larsson',
    email: 'anna@hej.se',
    password: 'EttSäkert:Lösenord123',
    roleNames: ['id1', 'id2'],
  });
  const createdEmployee = Object.freeze({}) as unknown as IEmployee;
  beforeEach(() => {});

  it('should deny access if the executing user does not have the correct access', async () => {
    const employeeRepository = {
      create: jest.fn(() => Promise.resolve(createdEmployee)),
      findByEmail: jest.fn(() => Promise.resolve(undefined)),
    } as unknown as IEmployeeRepository;

    const accountRepository = generateAccountRepositoryForAuthorization();

    const createEmployee = new CreateEmployeeUseCase(employeeRepository, accountRepository);
    await expect(createEmployee.execute({
      payload: createWithValues,
      idOfExecutingAccount: 'iiud',
    })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });

  it('Should be possible to create a new employee', async () => {
    const employeeRepository = {
      create: jest.fn(() => Promise.resolve(createdEmployee)),
      findByEmail: jest.fn(() => Promise.resolve(undefined)),
    } as unknown as IEmployeeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.EMPLOYEE_CREATE);

    const createEmployee = new CreateEmployeeUseCase(employeeRepository, accountRepository);
    await expect(createEmployee.execute({ payload: createWithValues, idOfExecutingAccount: 'uuid' })).resolves.toBe(createdEmployee);
    expect(employeeRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'Anna',
      lastName: 'Larsson',
      email: 'anna@hej.se',
      password: expect.any(String),
    }));
    // expect.assertions(1);
  });

  it('Should throw an error if the email already exists', async () => {
    const employeeRepository = {
      findByEmail: jest.fn(() => Promise.resolve(createdEmployee)),
    } as unknown as IEmployeeRepository;

    const accountRepository = generateAccountRepositoryForAuthorization(Permission.EMPLOYEE_CREATE);

    const createEmployee = new CreateEmployeeUseCase(employeeRepository, accountRepository);
    await expect(createEmployee.execute({ payload: createWithValues, idOfExecutingAccount: 'uuid' })).rejects.toThrow(ErrorCode.EMAIL_ALREADY_EXISTS);
    expect.assertions(1);
  });

  it('Should throw if any of the fields are missing', async () => {
    const employeeRepository = { } as unknown as IEmployeeRepository;

    const withUnvalidInput = { ...createWithValues, firstName: '' };
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.EMPLOYEE_CREATE);

    const createEmployee = new CreateEmployeeUseCase(employeeRepository, accountRepository);
    await expect(createEmployee.execute({ payload: withUnvalidInput, idOfExecutingAccount: 'uuid' })).rejects.toThrow(FIRSTNAME_IS_VIOLATED);
  });
});
