import { NextFunction, Response, Request } from 'express';
import logger from '../../utilities/logging';
import TokenService from '../../services/token-service';

export const authenticate = () => async (req:Request, res:Response, next:NextFunction) => {
  try {
    const encodedToken = TokenService.getTokenFromRequest(req);
    TokenService.verifyAccessToken(encodedToken);
    // @ts-ignore
    req.accountId = TokenService.getAccountIdFromRequest(req);
    // @ts-ignore
    logger.info(`Request ${req.requestId} belongs to account ${req.accountId}`);
    return next();
  } catch (e) {
    next(e);
  }
};
