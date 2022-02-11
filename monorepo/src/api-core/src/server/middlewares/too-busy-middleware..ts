import { Request, Response, NextFunction } from 'express';
import toobusy from 'toobusy-js';

export const toobusyMiddleware = (req:Request, res:Response, next:NextFunction) => {
  if (toobusy())
    return res.status(503).json({ error: 'server too busy' });
  else
    next();
};
