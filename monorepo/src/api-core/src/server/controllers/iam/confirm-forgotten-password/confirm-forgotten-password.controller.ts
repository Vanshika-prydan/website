import { NextFunction, Request, Response } from 'express';
import ConfirmForgottenPasswordUseCase from '../../../../domain/interactors/iam/confirm-forgotten-password';
import logger from '../../../../utilities/logging';

const buildConfirmForgottenPasswordController = (confirmForgottenPasswordUseCase:ConfirmForgottenPasswordUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code, password } = req.body;
    const payload = { email, code, password };
    await confirmForgottenPasswordUseCase.execute({ payload });
    // @ts-ignore
    logger.info('The password was successfully reset', { requestId: req.requestId });
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    // @ts-ignore
    logger.warn('Error occured while confirming the password change a password change', { requestId: req.requestId, error: e });
    next(e);
  }
};

export default buildConfirmForgottenPasswordController;
