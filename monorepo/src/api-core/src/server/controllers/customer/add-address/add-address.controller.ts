
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import AddCustomerAddressUseCase from '../../../../domain/interactors/customer/add-customer-address';
import { IAddCustomerAddressPayload } from '../../../../domain/interactors/customer/add-customer-address/types';
import { CustomerDTO } from '../../../models/customer.model';

interface Setup {
    addCustomerAddressUseCase:AddCustomerAddressUseCase;
}

export const buildAddAddressController = ({ addCustomerAddressUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params?.customerId;
    if (!customerId) throw new Error(ErrorCode.MISSING_ID);
    const payload:IAddCustomerAddressPayload = { ...req.body as IAddCustomerAddressPayload, customerId };
    // @ts-ignore
    const updatedCustomer = await addCustomerAddressUseCase.execute({ idOfExecutingAccount: req.accountId, payload });
    return res.status(201).json(new CustomerDTO(updatedCustomer));
  } catch (e) {
    next(e);
  }
};
