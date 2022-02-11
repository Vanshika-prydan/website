import { NextFunction, Request, Response } from 'express';
import ChangePasswordUseCase from '../../../../domain/interactors/iam/change-password';
import logger from '../../../../utilities/logging';

const buildChangePasswordController = (changePasswordUseCase: ChangePasswordUseCase) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const payload = { newPassword, oldPassword };
    // @ts-ignore
    await changePasswordUseCase.execute({ idOfExecutingAccount: req.accountId, payload });
    res.status(200).json({ message: 'seccess' });
  } catch (e) {
    // @ts-ignore
    logger.warn('Could not update password', { error: e, requestId: req.requestId });
    next(e);
  }
};

export default buildChangePasswordController;
