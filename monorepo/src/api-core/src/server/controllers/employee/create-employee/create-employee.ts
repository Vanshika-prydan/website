import { Response, Request, NextFunction } from 'express';
import { CreateEmployeeUseCase } from '../../../../domain/interactors/employee/create-employee/create-employee';
import { EmployeeDTO as EDTO } from '../../../models/employee.model';

interface BuildSetup {
  createEmployeeUseCase: CreateEmployeeUseCase,
  EmployeeDTO: typeof EDTO,
}

export function buildCreateEmployee ({ createEmployeeUseCase, EmployeeDTO }:BuildSetup) {
  return async (req:Request, res:Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const createdEmployee = await createEmployeeUseCase.execute({ payload: req.body, idOfExecutingAccount: req.accountId });
      return res.status(201).json(new EmployeeDTO(createdEmployee));
    } catch (e) {
      next(e);
    }
  };
}
