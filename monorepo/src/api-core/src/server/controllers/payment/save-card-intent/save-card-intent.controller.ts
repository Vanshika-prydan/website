import { NextFunction, Request, Response } from 'express';
import { SaveCardIntentUseCase } from '../../../../domain/interactors/payment/save-card-intent/save-card-intent';

const buildSaveCardIntentController = (addPaymentMethodUseCase: SaveCardIntentUseCase) => async (req: Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const clientSecret = await addPaymentMethodUseCase.execute({ idOfExecutingAccount: req.accountId });
    return res.status(201).json(clientSecret);
  } catch (e) {
    next(e);
  }
};
export default buildSaveCardIntentController;
