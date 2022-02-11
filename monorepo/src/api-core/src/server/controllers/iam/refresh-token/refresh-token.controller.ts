import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import { RefreshUseCase } from '../../../../domain/interactors/iam/refresh/refresh';
import { AccountService } from '../../../../domain/services/account-service';
import { cookieSettings } from '../../../../utilities/cookie-helper';
import TokenService from '../../../../services/token-service';
import { AccountDTO } from '../../../models/account.model';
import { ErrorDTO } from '../../../models/error.model';
import { LoginResponseModel } from '../../../models/login-response.model';

export const ABSENT_ACCESS_TOKEN = 'ABSENT_ACCESS_TOKEN';

export const buildRefreshTokenController = (
  refreshUseCase: RefreshUseCase,
) => async (req: Request, res: Response, next:NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      return res
        .status(403)
        .json(new ErrorDTO(new Error(ErrorCode.MISSING_TOKEN)));
    const { accountId } = TokenService.verifyRefreshToken(refreshToken);
    const account = await refreshUseCase.execute({ payload: { accountId } });
    const accessToken = TokenService.createAndSignAccessToken(account);

    const FACTOR_S_TO_MS = 1000;

    const response: LoginResponseModel = {
      account: new AccountDTO(account),
      permissions: AccountService.getPermissionsFromAccount(account),
    };

    return res
      .cookie('accessToken', accessToken, {
        ...cookieSettings,
        expires: new Date(
          Date.now() +
            TokenService.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS *
              FACTOR_S_TO_MS,
        ),
      })
      .cookie('refreshToken', refreshToken, {
        ...cookieSettings,
        expires: new Date(
          Date.now() +
            TokenService.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS *
              FACTOR_S_TO_MS,
        ),
      })
      .status(200)
      .json(response);
  } catch (e) {
    next(e);
  }
};
