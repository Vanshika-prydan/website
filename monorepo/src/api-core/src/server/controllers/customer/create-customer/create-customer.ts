import { NextFunction, Response, Request } from 'express';
import CreateCustomer from '../../../../domain/interactors/customer/create-customer';
import { CustomerDTO } from '../../../models/customer.model';

export const buildCreateCustomerController = (createCustomer: CreateCustomer) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    const createdCustomer = await createCustomer.execute({ payload: req.body });
    return res.status(201).json(new CustomerDTO(createdCustomer));
  } catch (e) {
    next(e);
  }
};
