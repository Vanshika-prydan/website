import { Request, Response, NextFunction } from 'express';
import contentType from 'content-type';
import getRawBody from 'raw-body';

export const bufferSizeMiddleware = (req:Request, res:Response, next:NextFunction) => {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method))
    return next();

  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1kb',
    encoding: contentType.parse(req).parameters.charset,
  }, (err, string) => {
    if (err) return next(err);
    // @ts-ignore
    req.text = string;
    next();
  });
};
