import { NextFunction, Request, Response } from 'express';

if (!process.env.MODE) throw new Error('No environment mode is set');

export const ensureHttpsConnectionsOnly = (req: Request, res:Response, next: NextFunction) => {
  if (process.env.MODE === 'development') return next();
  if (req.secure) return next();
  else return res.redirect('https://' + req.headers.host + req.url);
};
