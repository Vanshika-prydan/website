import { Request, Response, NextFunction } from 'express';

export const setHeadersMiddleware = (req:Request, res:Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin ?? '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PUT POST PATCH DELETE');
    return res.status(200).json({});
  }
  next();
};
