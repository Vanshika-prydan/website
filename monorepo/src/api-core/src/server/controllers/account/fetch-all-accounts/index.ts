import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import FetchAllAccountsUseCase from '../../../../domain/interactors/acccount/fetch-all-accounts';
import { AccountDTO } from '../../../models/account.model';

const buildFetchAllAccountsController = (fetchAllAccounts: FetchAllAccountsUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const accounts = await fetchAllAccounts.execute({ idOfExecutingAccount: req.accountId });
    return res.status(200).json(accounts.map(a => new AccountDTO(a)));
  } catch (e) { next(e); }
};

const fetchAllAccounts = container.resolve(FetchAllAccountsUseCase);
const fetchAllAccountsController = buildFetchAllAccountsController(fetchAllAccounts);

export default fetchAllAccountsController;
