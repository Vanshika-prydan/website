import { NextFunction, Request, Response } from 'express';
import ForgottenPasswordUseCase from '../../../../domain/interactors/iam/forgotten-password';
import logger from '../../../../utilities/logging';

const buildForgottenPasswordController = (forgottenPasswordUseCase:ForgottenPasswordUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await forgottenPasswordUseCase.execute({ payload: { email: req.body.email } });
    // @ts-ignore
    logger.info('New password was requested ', { requestBody: req.body, requestId: req.requestId });
  } catch (e) {
    // @ts-ignore
    logger.warn('Error occured while requesting a password change', { requestBody: req.body, requestId: req.requestId, error: e });
  }
  return res.status(201).json({ status: 'success' });
};

export default buildForgottenPasswordController;
