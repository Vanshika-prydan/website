import { NextFunction, Request, Response } from 'express';
import LoginUseCase from '../../../../domain/interactors/iam/login';
import { AccountService } from '../../../../domain/services/account-service';
import logger from '../../../../utilities/logging';
import TokenService from '../../../../services/token-service';
import { AccountDTO } from '../../../models/account.model';
import { JWTLoginResponseModel } from '../../../models/jwt-response.model';

interface ISetup {
  loginUseCase: LoginUseCase;
}

export const buildJwtLoginController = ({ loginUseCase }: ISetup) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const account = await loginUseCase.execute({ payload: req.body });
    const accessToken = TokenService.createAndSignAccessToken(account);
    const refreshToken = TokenService.createSignedRefreshToken(account);

    const response: JWTLoginResponseModel = {
      account: new AccountDTO(account),
      permissions: AccountService.getPermissionsFromAccount(account),
      accessToken,
      refreshToken,
    };
    // @ts-ignore
    logger.info(`Account ${account.email} (${account.accountId}) signed in successfully`, { response, requestId: req.requestId });
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
