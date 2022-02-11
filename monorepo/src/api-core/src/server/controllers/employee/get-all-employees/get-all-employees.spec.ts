import GetAllEmployeesUseCase from '../../../../domain/interactors/employee/get-all-employees';
import { buildGetAllEmployeesController } from './get-all-employees';
import { EmployeeDTO as EDTO } from '../../../models/employee.model';
import { Request, Response } from 'express';
import { IEmployee } from '../../../../domain/entities/Employee';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import ControllerTest from '../../../../utilities/controller-test';

describe('Name of the group', () => {
  it('should return 200 when everything works', async () => {
    const employees = [] as unknown as IEmployee;
    const getAllEmployeesUseCase = {
      execute: () => Promise.resolve(employees),
    } as unknown as InstanceType<typeof GetAllEmployeesUseCase>;
    const EmployeeDTO = {} as unknown as typeof EDTO;

    const req = {} as unknown as Request;
    const res = { status: jest.fn(() => res), json: jest.fn() } as unknown as Response;

    const controller = buildGetAllEmployeesController({ getAllEmployeesUseCase, EmployeeDTO });
    const utils = new ControllerTest();

    await controller(req, res, utils.next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('should call next if an error occurs', async () => {
    const getAllEmployeesUseCase = {
      execute: () => Promise.reject(new Error(ErrorCode.ACCESS_DENIED)),
    } as unknown as InstanceType<typeof GetAllEmployeesUseCase>;
    const EmployeeDTO = {} as unknown as typeof EDTO;
    const req = {} as unknown as Request;
    const res = { status: jest.fn(() => res), json: jest.fn() } as unknown as Response;
    const utils = new ControllerTest();
    const controller = buildGetAllEmployeesController({ getAllEmployeesUseCase, EmployeeDTO });
    await controller(req, res, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
