import { mockAccount } from '../../../../../mock/account';
import { ErrorCode } from '../../../entities/ErrorCode';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { RefreshUseCase } from './refresh';
import { IRefreshPayload } from './refresh-request-payload.interface';

describe('Refresh token use case', () => {
  it('should return a customer when the customer exists', async () => {
    const accountRepository = { findById: jest.fn(() => Promise.resolve(mockAccount)) } as unknown as IAccountRepository;

    const useCase = new RefreshUseCase({ accountRepository });
    const payload:IRefreshPayload = { accountId: mockAccount.accountId };
    await expect(useCase.execute({ payload })).resolves.toBe(mockAccount);
    expect(accountRepository.findById).toHaveBeenCalledWith(mockAccount.accountId);
  });

  it('should throw ACCOUNT_DOES_NOT_EXIST if the user is undefined', async () => {
    const accountRepository = { findById: jest.fn(() => Promise.resolve(undefined)) } as unknown as IAccountRepository;
    const useCase = new RefreshUseCase({ accountRepository });
    const payload:IRefreshPayload = { accountId: mockAccount.accountId };
    await expect(useCase.execute({ payload })).rejects.toThrowError(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
  });
});
