import { EmployeeModel } from '../../models/employee.model';

export interface EmployeeState {
  employees: EmployeeModel[];
  isLoading: boolean;
  fetched: boolean;
}
