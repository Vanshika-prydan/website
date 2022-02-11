import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import logger from '../../utilities/logging';

type ReqType = 'body' | 'params';

export const validateRequest = (model: any, type:ReqType = 'body') => async (req:Request, res:Response, next:NextFunction) => {
  const schema = yup.object().shape(model);
  try {
    await schema.validate(req[type]);
    next();
  } catch (e) {
    // @ts-ignore
    logger.warn(`Invalid request input on request ${req.requestId}`, { error: { ...e, value: undefined } });
    next(new Error(ErrorCode.INVALID_INPUT));
  }
};
