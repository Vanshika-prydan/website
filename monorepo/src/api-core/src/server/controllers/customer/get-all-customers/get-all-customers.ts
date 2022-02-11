import { NextFunction, Request, Response } from 'express';
import GetAllCustomersUseCase from '../../../../domain/interactors/customer/get-all-customers';
import { CustomerDTO } from '../../../models/customer.model';

interface IBuild {
    getAllCustomersUseCase: InstanceType< typeof GetAllCustomersUseCase>;
}

export const buildGetAllCosumersController = ({ getAllCustomersUseCase }: IBuild) => async (req:Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const customers = await getAllCustomersUseCase.execute({ idOfExecutingAccount: req.accountId });
    const customersDto = customers.map(c => new CustomerDTO(c));
    return res.status(200).json(customersDto);
  } catch (e) {
    next(e);
  }
};
