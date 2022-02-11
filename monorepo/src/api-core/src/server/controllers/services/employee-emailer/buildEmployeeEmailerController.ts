import { NextFunction, Request, Response } from 'express';
import EmployeeEmailerFacade from '../../../../domain/interactors/services/employee-emailer';

const buildEmployeeEmailerController = (employeeEmailerFacade: EmployeeEmailerFacade) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await employeeEmailerFacade.execute();
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};

export default buildEmployeeEmailerController;
