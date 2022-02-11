import { NextFunction, Request, Response } from 'express';
import RegisterAccountDeviceUseCase from '../../../../domain/interactors/notifications/register-account-device';

export const buildRegisterDeviceController = (registerAccountDeviceUseCase: RegisterAccountDeviceUseCase) => async (req: Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await registerAccountDeviceUseCase.execute({ payload: req.body.token, idOfExecutingAccount: req.accountId });
    return res.status(200).json({ message: 'success' });
  } catch (e) {
    next(e);
  }
};
