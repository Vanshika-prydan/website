import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { ErrorDTO } from '../models/error.model';
import logger from '../../utilities/logging';
import { FIRSTNAME_IS_VIOLATED, INVALID_EMAIL, INVALID_PHONE_NUMBER, PASSWORD_IS_VIOLATED } from '../../domain/services/account-service';
import serverNotificationService from '../../services/server-notification-service';

const errorHandler = (error:Error, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent)
    return next(error);

  // @ts-ignore
  request.errorCode = error.message || 'UNKNOWN_ERROR';
  // @ts-ignore
  logger.info('Error code', { errorCode: error.message, requestId: request.requestId, accountId: request.accountId });

  // 400
  const error400: string[] = [ErrorCode.INVALID_INPUT, ErrorCode.DATETIME_ERROR, ErrorCode.INVALID_PASSWORD, FIRSTNAME_IS_VIOLATED, INVALID_EMAIL, INVALID_PHONE_NUMBER, PASSWORD_IS_VIOLATED];
  if (error400.includes(error.message))
    return response.status(400).json(new ErrorDTO(error));

  // 401
  const error401: string[] = [ErrorCode.ACCESS_DENIED, ErrorCode.TOKEN_EXPIRED, ErrorCode.TOKEN_NOT_YET_ACTIVE, ErrorCode.MISSING_TOKEN];
  if (error401.includes(error.message))
    return response.status(401).json(new ErrorDTO(error));

  // 403
  const error403:string[] = ['WRONG_PASSWORD', ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE, ErrorCode.INVALID_CODE, ErrorCode.CODE_EXPIRED, ErrorCode.PAYMENT_FAILED];
  if (error403.includes(error.message))
    return response.status(403).json(new ErrorDTO(error));

  // 404
  const error404:string[] = [ErrorCode.ACCOUNT_DOES_NOT_EXIST, ErrorCode.ID_DOES_NOT_EXIST, ErrorCode.MISSING_ID, ErrorCode.EMPLOYEE_DOES_NOT_EXIST, ErrorCode.CUSTOMER_DOES_NOT_EXIST];
  if (error404.includes(error.message))
    return response.status(404).json(new ErrorDTO(error));

  // 409
  const error409:string[] = [ErrorCode.EMAIL_ALREADY_EXISTS, ErrorCode.PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS, ErrorCode.PHONE_NUMBER_ALREADY_EXISTS, ErrorCode.CONSTRAINT_VIOLATED];
  if (error409.includes(error.message))
    return response.status(409).json(new ErrorDTO(error));

  // 500
  // @ts-ignore
  logger.error(`A new 500 response occurred from request ${request.requestId}`, error);
  // @ts-ignore
  serverNotificationService.send(`New 500 error with requestId: ${request.requestId}. Error: ${error.message}`);

  return response.status(500).json(new ErrorDTO(new Error('SERVER_ERROR')));
};

export default errorHandler;
