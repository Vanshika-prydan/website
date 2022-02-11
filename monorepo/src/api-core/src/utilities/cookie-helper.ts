import { CookieOptions } from 'express';

if (!process.env.NODE_ENV || !process.env.DOMAIN) throw new Error('ENV NOT DEFINED');

export const cookieSettings:CookieOptions = {
  secure: true,
  domain: (process.env.NODE_ENV === 'production') ? process.env.DOMAIN : undefined,
  httpOnly: true,
  sameSite: (process.env.NODE_ENV === 'production') ? 'strict' : 'none',
  maxAge: 60 * 60 * 60 * 60,
};
