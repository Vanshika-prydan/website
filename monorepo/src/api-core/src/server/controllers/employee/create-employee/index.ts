import { container } from 'tsyringe';
import CreateEmployeeUseCase from '../../../../domain/interactors/employee/create-employee';
import { EmployeeDTO } from '../../../models/employee.model';
import { buildCreateEmployee } from './create-employee';

export { CreateEmployeeRequestModel } from './create-employee-request-model';

const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

const createEmployeeController = buildCreateEmployee({ createEmployeeUseCase, EmployeeDTO });

export default createEmployeeController;
