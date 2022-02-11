import { NextFunction, Request, Response } from 'express';
import LoginUseCase from '../../../../domain/interactors/iam/login';
import { AccountService } from '../../../../domain/services/account-service';
import logger from '../../../../utilities/logging';
import { cookieSettings } from '../../../../utilities/cookie-helper';
import TokenService from '../../../../services/token-service';
import { AccountDTO } from '../../../models/account.model';
import { LoginResponseModel } from '../../../models/login-response.model';

interface ISetup {
  loginUseCase: LoginUseCase;
}

export const buildLoginController = ({ loginUseCase }: ISetup) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const account = await loginUseCase.execute({ payload: req.body });
    const accessToken = TokenService.createAndSignAccessToken(account);
    const refreshToken = TokenService.createSignedRefreshToken(account);

    const FACTORS_S_TO_MS = 1000;

    const response: LoginResponseModel = {
      account: new AccountDTO(account),
      permissions: AccountService.getPermissionsFromAccount(account),
    };
    // @ts-ignore
    logger.info(`Account ${account.email} (${account.accountId}) signed in successfully`, { response, requestId: req.requestId });

    return res
      .cookie('accessToken', accessToken, {
        ...cookieSettings,
        expires: new Date(
          Date.now() +
            TokenService.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS *
              FACTORS_S_TO_MS,
        ),
      })
      .cookie('refreshToken', refreshToken, {
        ...cookieSettings,
        expires: new Date(
          Date.now() +
            TokenService.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS *
              FACTORS_S_TO_MS,
        ),
      })
      .status(200)
      .json(response);
  } catch (e) {
    next(e);
  }
};
