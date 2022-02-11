import { NextFunction, Response, Request } from 'express';
import GetEmployeeDefaultAvailability from '../../../../../domain/interactors/employee/get-availability';
import EmployeeDefaultAvailabilityDTO from '../../../../models/employee-default-availability.model';

const buildGetAvailabilityController = (getAvailability: GetEmployeeDefaultAvailability) => async (req: Request, res:Response, next:NextFunction) => {
  try {
    const payload = { employeeId: req.params.employeeId };
    // @ts-ignore
    const availability = await getAvailability.execute({ payload, idOfExecutingAccount: req.accountId });
    return res.status(200).json(availability.map(a => new EmployeeDefaultAvailabilityDTO(a)));
  } catch (e) {
    return next(e);
  }
};

export default buildGetAvailabilityController;
