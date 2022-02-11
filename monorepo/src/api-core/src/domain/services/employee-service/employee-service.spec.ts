import { ErrorCode } from '../../entities/ErrorCode';
import { IEmployee } from '../../entities/Employee';
import { IEmployeeRepository } from '../../interface-adapters/repositories/employee-repository';
import { EmployeeService } from '.';

describe('Employee service', () => {
  describe('isEmployee', () => {
    it('should return true if an employee i provided', () => {
      const employee = { employeeId: 'uuid' } as unknown as IEmployee;
      expect(EmployeeService.isEmployee(employee)).toBeTruthy();
    });
    it('should return false if an employeeId is provided', () => {
      const employeeId = 'uuid';
      expect(EmployeeService.isEmployee(employeeId)).toBeFalsy();
    });
  });
  describe('loadEmployeeById', () => {
    it('should return an employee', async () => {
      const result = {};
      const employeeRepository = { findByEmployeeId: jest.fn(() => Promise.resolve(result)) } as unknown as IEmployeeRepository;
      await expect(EmployeeService.loadEmployeeById(employeeRepository, 'uuid')).resolves.toBe(result);
      expect(employeeRepository.findByEmployeeId).toHaveBeenCalledWith('uuid');
    });
    it('should throw error if the employee does not exist', async () => {
      const employeeRepository = { findByEmployeeId: jest.fn(() => undefined) } as unknown as IEmployeeRepository;
      await expect(EmployeeService.loadEmployeeById(employeeRepository, 'uuid')).rejects.toThrowError(ErrorCode.EMPLOYEE_DOES_NOT_EXIST);
    });
  });
  describe('ensurePresentEmployee', () => {
    it('should get an employee from the repository with an uuid', async () => {
      const resultFromRepository = {};
      const employeeId = 'uuid';
      const employeeRepository = { findByEmployeeId: jest.fn(() => Promise.resolve(resultFromRepository)) } as unknown as IEmployeeRepository;
      await expect(EmployeeService.ensurePresentEmployee(employeeRepository, employeeId)).resolves.toBe(resultFromRepository);
    });
    it('should return the same employee if it was called with an employee', async () => {
      const employee = { employeeId: 'uuid' } as unknown as IEmployee;
      const employeeRepository = { } as unknown as IEmployeeRepository;
      await expect(EmployeeService.ensurePresentEmployee(employeeRepository, employee)).resolves.toBe(employee);
    });
  });
});
