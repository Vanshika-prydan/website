import GetAllEmployeesUseCase from '../../domain/interactors/employee/get-all-employees';
import accountRepository from './account-respository';

import employeeRepository from './employee-repository';

const getAllEmployeesUseCase = new GetAllEmployeesUseCase({ employeeRepository, accountRepository });

export default getAllEmployeesUseCase;
