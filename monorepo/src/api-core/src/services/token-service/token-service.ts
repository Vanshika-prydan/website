import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AccessTokenModel } from './access-token-model';
import { BaseTokenModel } from './base-token-model';
import { RefreshTokenModel } from './refresh-token-model';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { IAccount } from '../../domain/entities/Account';
import Permission from '../../domain/entities/Permission';

if (!process.env.JWT_SECRET) throw new Error('CONFIG_ERROR_MISSING_TOKEN_SECRET');

export class TokenService {
    public static readonly ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = 60 * 15;
    public static readonly REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 24 * 30;
    private static readonly JWT_SECRET = (process.env.JWT_SECRET || '').replace(/\\n/gm, '\n');

    private static verify <T> (encodedToken: string):T {
      try {
        return jwt.verify(encodedToken, TokenService.JWT_SECRET) as unknown as T;
      } catch (e) {
        if (e instanceof Error) {
          if (e.name === 'TokenExpiredError') throw new Error(ErrorCode.TOKEN_EXPIRED);
          if (e.name === 'JsonWebTokenError') throw new Error(ErrorCode.JWT_FORMAT_ERROR);
          if (e.name === 'NotBeforeError') throw new Error(ErrorCode.TOKEN_NOT_YET_ACTIVE);
        }
        throw new Error(ErrorCode.UNKNOWN_TOKEN_ERROR);
      }
    }

    private static sign<T extends Object> (payload: T, expiresIn:number) {
      return jwt.sign(payload, TokenService.JWT_SECRET, { expiresIn });
    };

    private static decode<T> (token:string):T {
      return jwt.decode(token) as T;
    }

    public static createAndSignAccessToken (account: IAccount):string {
      const permissions: Permission[] = [];
      account.roles?.forEach(r => r.permissions?.forEach(p => permissions.push(p)));
      const token: AccessTokenModel = {
        accountId: account.accountId,
        type: 'ACCESS_TOKEN',
        permissions,
      };

      return TokenService.sign<AccessTokenModel>(token, TokenService.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS);
    }

    public static verifyAccessToken (encodedAccessToken:string):AccessTokenModel & BaseTokenModel {
      const decodedToken = TokenService.verify<AccessTokenModel & BaseTokenModel>(encodedAccessToken);
      if (decodedToken.type !== 'ACCESS_TOKEN') throw new Error(ErrorCode.TOKEN_TYPE_ERROR);
      return decodedToken;
    }

    public static decodeAccessToken (accessToken: string): AccessTokenModel & BaseTokenModel {
      return TokenService.decode<AccessTokenModel & BaseTokenModel>(accessToken);
    }

    public static createSignedRefreshToken (account: IAccount): string {
      const token : RefreshTokenModel = {
        accountId: account.accountId,
        type: 'REFRESH_TOKEN',
      };

      return TokenService.sign<RefreshTokenModel>(token, TokenService.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS);
    }

    public static verifyRefreshToken (refreshToken:string): RefreshTokenModel & BaseTokenModel {
      const decodedToken = TokenService.verify<RefreshTokenModel & BaseTokenModel>(refreshToken);
      if (decodedToken.type !== 'REFRESH_TOKEN') throw new Error(ErrorCode.TOKEN_TYPE_ERROR);
      return decodedToken;
    }

    public static decodeRefreshToken (refreshToken: string): RefreshTokenModel & BaseTokenModel {
      return TokenService.decode<BaseTokenModel & RefreshTokenModel>(refreshToken);
    }

    public static getTokenFromRequest (req: Request):string {
      if (req.cookies?.accessToken) return req.cookies.accessToken;
      const auth = req.headers?.authorization;
      if (auth === undefined) throw new Error(ErrorCode.MISSING_TOKEN);
      return auth.split(' ')[1];
    }

    public static getAccountIdFromRequest (req: Request):string {
      const encodedToken = this.getTokenFromRequest(req);
      const token = TokenService.decodeAccessToken(encodedToken);
      if (!token.accountId) throw new Error(ErrorCode.ACCESS_DENIED);
      return token.accountId;
    }
}
