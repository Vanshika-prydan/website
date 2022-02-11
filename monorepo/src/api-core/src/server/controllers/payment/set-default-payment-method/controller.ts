import { NextFunction, Request, Response } from 'express';
import SetDefaultPaymentMethodUseCase from '../../../../domain/interactors/customer/payments/set-default-payment-method';

const buildSetDefaultPaymentMethodController = (setDefaultPaymentMethodFacade: SetDefaultPaymentMethodUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await setDefaultPaymentMethodFacade.execute({ payload: req.params.cardId, idOfExecutingAccount: req.accountId });
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};

export default buildSetDefaultPaymentMethodController;
