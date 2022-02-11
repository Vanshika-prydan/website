import { NextFunction, Request, Response } from 'express';
import EditAccountUseCase from '../../../../domain/interactors/acccount/edit-account';
import { EditAccountRequestPayload } from '../../../../domain/interactors/acccount/edit-account/types';
import { AccountDTO } from '../../../models/account.model';

export const buildEditAccountController = (editAccountUseCase: EditAccountUseCase) => async (req: Request, res:Response, next: NextFunction) => {
  try {
    const { accountId, ...rest } = req.body;
    const payload:EditAccountRequestPayload = {
      accountId: req.body.accountId,
      fieldsToUpdate: rest,
    };
    // @ts-ignore
    const updatedAccount = await editAccountUseCase.execute({ payload, idOfExecutingAccount: req.accountId });

    return res.status(200).json(new AccountDTO(updatedAccount));
  } catch (e) {
    next(e);
  }
};
