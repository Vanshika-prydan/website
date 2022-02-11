import { NextFunction, Request, Response } from 'express';
import GetCustomerUseCase from '../../../../domain/interactors/customer/get-customer';
import { CustomerDTO } from '../../../models/customer.model';

export const buildGetCustomerController = (facade: GetCustomerUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const customer = await facade.execute({ customerId: req.params.customerId, idOfExecutingAccount: req.accountId });
    return res.status(200).json(new CustomerDTO(customer));
  } catch (e) {
    next(e);
  }
};
