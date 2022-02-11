import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import logger from '../../utilities/logging';

const newRequestLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = v4();
  // @ts-ignore
  req.requestId = requestId;
  const requestTime = new Date();
  logger.info('HTTP Request', { method: req.method, url: req.url, ip: req.ip, requestId, timestamp: requestTime });
  res.on('finish', () => {
    const responseTime = Date.now() - requestTime.getTime();
    // @ts-ignore
    const errorCode = res.errorCode;
    const logLevel = res.statusCode === 500 ? 'error' : responseTime > 1000 ? 'warn' : 'info';
    const logParams = { status: res.statusCode, requestId, responseTime, method: req.method, url: req.url, ip: req.ip, timestamp: requestTime, errorCode };
    logger.log(logLevel, 'HTTP Response', logParams);
  });
  next();
};

export default newRequestLoggingMiddleware;
