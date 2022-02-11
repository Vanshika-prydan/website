import { mockAccount } from '../../../../../mock/account';
import { ErrorCode } from '../../../entities/ErrorCode';
import AccountService from '../../../services/account-service';
import { LoginUseCase } from './login';
import { ILoginRequestPayload } from './login-request-payload.interface';

describe('Login use case', () => {
  it('should login and return an account', async () => {
    // @ts-ignore
    const accountService: AccountService = { findByEmail: jest.fn(() => Promise.resolve(mockAccount)) };
    const loginUseCase = new LoginUseCase(accountService);
    const payload:ILoginRequestPayload = { email: 'niklas@cleangreen.se', password: 'thiIsNotMyPass' };

    await expect(loginUseCase.execute({ payload })).resolves.toBe(mockAccount);
  });

  it('should throw an error if the email does not exist', async () => {
    // @ts-ignore
    const accountService: AccountService = { findByEmail: jest.fn(() => Promise.resolve(undefined)) };
    const loginUseCase = new LoginUseCase(accountService);
    const payload:ILoginRequestPayload = { email: 'niklas@cleangreen.se', password: 'thiIsNotMyPass' };
    await expect(loginUseCase.execute({ payload })).rejects.toThrowError(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
  });

  it('should throw an error if the password is not correct', async () => {
    // @ts-ignore
    const accountService:AccountService = { findByEmail: jest.fn(() => Promise.resolve(mockAccount)) };
    const loginUseCase = new LoginUseCase(accountService);
    const payload:ILoginRequestPayload = { email: 'niklas@cleangreen.se', password: 'wrongPass' };
    await expect(loginUseCase.execute({ payload })).rejects.toThrowError();
  });
});
