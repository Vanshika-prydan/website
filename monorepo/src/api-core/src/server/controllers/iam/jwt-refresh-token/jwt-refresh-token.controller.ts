import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import { RefreshUseCase } from '../../../../domain/interactors/iam/refresh/refresh';
import { AccountService } from '../../../../domain/services/account-service';
import TokenService from '../../../../services/token-service';
import { AccountDTO } from '../../../models/account.model';
import { ErrorDTO } from '../../../models/error.model';
import { JWTLoginResponseModel } from '../../../models/jwt-response.model';

export const buildJwtRefreshTokenController = (
  refreshUseCase: RefreshUseCase,
) => async (req: Request, res: Response, next:NextFunction) => {
  try {
    const refreshToken = req.body?.refreshToken;
    if (!refreshToken)
      return res
        .status(403)
        .json(new ErrorDTO(new Error(ErrorCode.MISSING_TOKEN)));
    const { accountId } = TokenService.verifyRefreshToken(refreshToken);
    const account = await refreshUseCase.execute({ payload: { accountId } });
    const accessToken = TokenService.createAndSignAccessToken(account);

    const response: JWTLoginResponseModel = {
      account: new AccountDTO(account),
      permissions: AccountService.getPermissionsFromAccount(account),
      accessToken,
      refreshToken,
    };

    return res
      .status(200)
      .json(response);
  } catch (e) {
    next(e);
  }
};
