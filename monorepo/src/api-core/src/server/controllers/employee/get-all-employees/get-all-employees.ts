import { Response, Request, NextFunction } from 'express';
import GetAllEmployeesUseCase from '../../../../domain/interactors/employee/get-all-employees';
import { EmployeeDTO as EDTO } from '../../../models/employee.model';

interface BuildSetup {
    getAllEmployeesUseCase: InstanceType<typeof GetAllEmployeesUseCase>,
    EmployeeDTO: typeof EDTO,
  }

export function buildGetAllEmployeesController ({ getAllEmployeesUseCase, EmployeeDTO }:BuildSetup) {
  return async (req:Request, res:Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const employees = await getAllEmployeesUseCase.execute({ idOfExecutingAccount: req.accountId });
      const response = employees.map(empl => new EmployeeDTO(empl));
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}
