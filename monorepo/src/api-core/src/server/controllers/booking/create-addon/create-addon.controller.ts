import { NextFunction, Request, Response } from 'express';
import { CreateAddonUseCase } from '../../../../domain/interactors/bookings/create-addon/create-addon';
import AddonDTO from '../../../models/addon.model';

interface Setup {
    createAddonUseCase: CreateAddonUseCase;
}

export const buildCreateAddonController = ({ createAddonUseCase }:Setup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
  // @ts-ignore
    const createdAddon = await createAddonUseCase.execute({ payload: req.body, idOfExecutingAccount: req.accountId });
    return res.status(201).json(new AddonDTO(createdAddon));
  } catch (e) {
    next(e);
  }
};
