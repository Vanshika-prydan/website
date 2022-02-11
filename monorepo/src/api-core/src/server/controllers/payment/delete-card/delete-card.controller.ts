import { NextFunction, Request, Response } from 'express';
import DeletePaymentMethodUseCase from '../../../../domain/interactors/payment/delete-payment-method';

const buildDeleteCardController = (deletePaymentMethodUseCase: DeletePaymentMethodUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await deletePaymentMethodUseCase.execute({ payload: { paymentMethodId: req.params.cardId }, idOfExecutingAccount: req.accountId });
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};

export default buildDeleteCardController;
