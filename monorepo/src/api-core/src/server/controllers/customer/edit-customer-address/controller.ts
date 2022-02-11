
import { NextFunction, Request, Response } from 'express';
import EditCustomerAddressUseCase, { RequestPayload } from '../../../../domain/interactors/customer/edit-customer-address';

export const buildEditCustomerAddress = (editCustomerAddressFacade: EditCustomerAddressUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload:RequestPayload = { fieldsToUpdate: req.body, customerAddressId: req.params.customerAddressId };
    // @ts-ignore
    await editCustomerAddressFacade.execute({ idOfExecutingAccount: req.accountId, payload });
    return res.status(201).json({ message: 'success' });
  } catch (e) {
    next(e);
  }
};
