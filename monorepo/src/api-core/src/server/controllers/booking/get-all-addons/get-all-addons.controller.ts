import { NextFunction, Request, Response } from 'express';
import GetAllAddonsUseCase from '../../../../domain/interactors/bookings/get-all-addons';
import AddonDTO from '../../../models/addon.model';

export const buildGetAllAddonsController = (getAllAddonsUseCase:GetAllAddonsUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allAddons = await getAllAddonsUseCase.execute();
    const responseValue = allAddons.map(a => new AddonDTO(a));
    return res.status(200).json(responseValue);
  } catch (e) {
    next(e);
  }
};
