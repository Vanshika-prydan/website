import { IEmployeeRepository } from '../../domain/interface-adapters/repositories/employee-repository';
import EmployeeRepository from '../../repositories/employee-repository';

const employeeRepository: IEmployeeRepository = new EmployeeRepository();
export default employeeRepository;
