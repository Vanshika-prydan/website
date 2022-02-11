import { ErrorCode } from '../../entities/ErrorCode';
import { IEmployee } from '../../entities/Employee';
import { IEmployeeRepository } from '../../interface-adapters/repositories/employee-repository';
import { injectable } from 'tsyringe';
import { EmployeeLightInterface, EmployeeLightWithAccount, EmployeeLightWithAccountAndAddress, EmployeeLightWithAddress } from '../../entities/Employee/types';

@injectable()
export class EmployeeService {
  public static isEmployee (employeeOrEmployeeId:IEmployee | string): employeeOrEmployeeId is IEmployee {
    return (employeeOrEmployeeId as IEmployee).employeeId !== undefined;
  }

  public static async loadEmployeeById (employeeRepository: IEmployeeRepository, employeeId:string): Promise<IEmployee> {
    const foundEmployee = await employeeRepository.findByEmployeeId(employeeId);
    if (!foundEmployee) throw new Error(ErrorCode.EMPLOYEE_DOES_NOT_EXIST);
    return foundEmployee;
  }

  public static async ensurePresentEmployee (employeeRepository: IEmployeeRepository, employeeOrEmployeeId: IEmployee|string): Promise<IEmployee> {
    if (EmployeeService.isEmployee(employeeOrEmployeeId)) return employeeOrEmployeeId;
    return EmployeeService.loadEmployeeById(employeeRepository, employeeOrEmployeeId);
  }

  public static isEmployeeWithAccount (employee: EmployeeLightInterface): employee is EmployeeLightWithAccount {
    return !!employee.account;
  }

  public static isEmployeeWithAddress (employee: EmployeeLightInterface): employee is EmployeeLightWithAddress {
    return !!employee.address;
  }

  public static isEmployeeWithAccountAndAddress (employee: EmployeeLightInterface): employee is EmployeeLightWithAccountAndAddress {
    return !!employee.address && !!employee.account;
  }
}

export default EmployeeService;
