import { NextFunction, Request, Response } from 'express';
import GetAllCardsUseCase from '../../../../domain/interactors/payment/get-all-cards';
import CreditCardDTO from '../../../models/credit-card.model';

const buildGetAllCardsController = (getAllCardsUseCase:GetAllCardsUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const cards = await getAllCardsUseCase.execute({ idOfExecutingAccount: req.accountId });
    const response:CreditCardDTO[] = cards.map(c => new CreditCardDTO(c));

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default buildGetAllCardsController;
