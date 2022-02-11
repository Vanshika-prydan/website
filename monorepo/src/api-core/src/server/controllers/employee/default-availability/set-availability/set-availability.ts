import { NextFunction, Response, Request } from 'express';
import SetDefaultEmployeeAvailabilityUseCase from '../../../../../domain/interactors/employee/set-availability';
import EmployeeDefaultAvailabilityDTO from '../../../../models/employee-default-availability.model';

const buildSetAvailabilityController = (setAvailability: SetDefaultEmployeeAvailabilityUseCase) => async (req: Request, res:Response, next:NextFunction) => {
  try {
    const payload = { ...req.body, ...req.params };
    // @ts-ignore
    const availability = await setAvailability.execute({ payload, idOfExecutingAccount: req.accountId });
    return res.status(200).json(availability.map(a => new EmployeeDefaultAvailabilityDTO(a)));
  } catch (e) {
    return next(e);
  }
};

export default buildSetAvailabilityController;
