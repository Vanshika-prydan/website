import { NextFunction, Request, Response } from 'express';
import AppendToWaitingListUseCase from '../../../../domain/interactors/waiting-list/append-to-waiting-list';

const buildAppendToWaitingListController = (appendToWaitingListUseCase:AppendToWaitingListUseCase) => async (req: Request, res:Response, next: NextFunction) => {
  try {
    await appendToWaitingListUseCase.execute({ payload: req.body });
    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

export default buildAppendToWaitingListController;
