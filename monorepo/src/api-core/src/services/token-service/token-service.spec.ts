import { Request } from 'express';
import { mockAccount } from '../../../mock/account';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { IAccount } from '../../domain/entities/Account';
import Permission from '../../domain/entities/Permission';
import { IRole } from '../../domain/entities/Role';
import { TokenService } from './token-service';

describe('TokenService', () => {
  describe('ACCESS TOKEN', () => {
    it('should generate a new access token and then decode it', () => {
      const roles: IRole[] = [{
        name: 'testroll1',
        description: '',
        permissions: [Permission.EMPLOYEE_CREATE, Permission.EMPLOYEE_UPDATE],
      },
      {
        name: 'testroll2',
        description: '',
        permissions: [Permission.CUSTOMER_ADD_AND_BIND_ADDRESS],
      }];
      const account: IAccount = { ...mockAccount, accountId: 'ACCID', roles };

      const signedToken = TokenService.createAndSignAccessToken(account);
      const decodedToken = TokenService.decodeAccessToken(signedToken);

      expect(decodedToken).toEqual(expect.objectContaining({
        accountId: 'ACCID',
        iat: expect.any(Number),
        exp: expect.any(Number),
        permissions: [Permission.EMPLOYEE_CREATE, Permission.EMPLOYEE_UPDATE, Permission.CUSTOMER_ADD_AND_BIND_ADDRESS],
        type: 'ACCESS_TOKEN',
      }));
    });

    it('should verify a access token', () => {
      const account: IAccount = { ...mockAccount, roles: [] };

      const signedToken = TokenService.createAndSignAccessToken(account);
      expect(TokenService.verifyAccessToken(signedToken)).toEqual(expect.objectContaining({
        accountId: mockAccount.accountId,
        permissions: [],
        iat: expect.any(Number),
        exp: expect.any(Number),
        type: 'ACCESS_TOKEN',
      }));
    });
  });

  describe('REFRESH TOKEN', () => {
    it('should generate a new refresh token with a employee and then decode it', () => {
      const account:IAccount = { ...mockAccount, accountId: 'ACCID' };
      const signedToken = TokenService.createSignedRefreshToken(account);
      const decodedToken = TokenService.decodeRefreshToken(signedToken);

      expect(decodedToken).toEqual(expect.objectContaining({
        accountId: 'ACCID',
        iat: expect.any(Number),
        exp: expect.any(Number),
        type: 'REFRESH_TOKEN',
      }));
    });

    it('should verify a refresh token', () => {
      const account:IAccount = { ...mockAccount, accountId: 'ACCID' };

      const signedToken = TokenService.createSignedRefreshToken(account);
      expect(TokenService.verifyRefreshToken(signedToken)).toEqual(expect.objectContaining({
        accountId: 'ACCID',
        iat: expect.any(Number),
        exp: expect.any(Number),
        type: 'REFRESH_TOKEN',
      }));
    });
  });

  describe('getTokenFromRequestHeader', () => {
    it('Should return a token from the header', () => {
      const request = { headers: { authorization: 'bearer token' } } as unknown as Request;
      expect(TokenService.getTokenFromRequest(request)).toBe('token');
    });
    it('Should trow MISSING_TOKEN when the tokens isnt present', () => {
      const request = { } as unknown as Request;
      expect(() => TokenService.getTokenFromRequest(request)).toThrow(ErrorCode.MISSING_TOKEN);
    });
    it('should return the token if the cookie is present', () => {
      const request = { cookies: { accessToken: 'token' } } as unknown as Request;
      expect(TokenService.getTokenFromRequest(request)).toBe('token');
    });
  });

  it('should get the account id by the request', () => {
    // file deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
    const req = { cookies: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJBQ0NJRCIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJwZXJtaXNzaW9ucyI6WyJFTVBMT1lFRV9DUkVBVEUiLCJFTVBMT1lFRV9VUERBVEUiLCJDVVNUT01FUl9BRERfQU5EX0JJTkRfQUREUkVTUyJdLCJpYXQiOjE2MTY5MTc2ODUsImV4cCI6MTYxNjkxODU4NX0.8jpKfHC1KsrZmQLURBwM7jValVytpkjtrGqlPykPOx4' } } as unknown as Request;
    expect(TokenService.getAccountIdFromRequest(req)).toBe('ACCID');
  });
});
