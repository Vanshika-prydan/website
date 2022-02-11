import Permission from '../../../entities/Permission';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { GetAllEmployeesUseCase } from './get-all-employees';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';

describe('Get all employees', () => {
  it('should throw an error if the employee has the wrong permission', async () => {
    const employeeRepository = {} as unknown as IEmployeeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.EMPLOYEE_LIST_ALL);
    const useCase = new GetAllEmployeesUseCase({ employeeRepository, accountRepository });
    await expect(useCase.execute({ idOfExecutingAccount: 'iiud' })).rejects.toThrowError();
  });

  it('Should get a list of employees', async () => {
    const employeeList:any = [];
    const employeeRepository = { getAll: () => Promise.resolve(employeeList) } as unknown as IEmployeeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.EMPLOYEE_LIST_ALL);
    const useCase = new GetAllEmployeesUseCase({ employeeRepository, accountRepository });
    await expect(useCase.execute({ idOfExecutingAccount: 'uuid' })).resolves.toBe(employeeList);
  });
});
