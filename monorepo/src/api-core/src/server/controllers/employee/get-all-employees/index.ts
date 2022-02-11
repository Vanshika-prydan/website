import getAllEmployeesUseCase from '../../../implementations/get-all-employees-use-case';
import { EmployeeDTO } from '../../../models/employee.model';
import { buildGetAllEmployeesController } from './get-all-employees';

const getAllEmployeesController = buildGetAllEmployeesController({ getAllEmployeesUseCase, EmployeeDTO });

export default getAllEmployeesController;
