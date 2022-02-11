import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import MockAccount from '../../../entities/Account/mock-account';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import AccountService from '../../../services/account-service';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { EditAccountUseCase } from './edit-account';
import { EditAccountRequestPayload } from './types';

describe('Edit account use case', () => {
  let accountRepository: IAccountRepository;
  let accountService: AccountService;
  const payload: EditAccountRequestPayload = { accountId: '0e4d0679-1ebe-4e5f-9ca5-4dfddeb25332', fieldsToUpdate: { firstName: 'Hej' } };
  let idOfExecutingAccount: string;
  let mockAccount: MockAccount;
  beforeEach(() => {
    mockAccount = new MockAccount();
    accountRepository = { ...generateAccountRepositoryForAuthorization(Permission.ACCOUNT_EDIT), update: jest.fn(() => Promise.resolve(mockAccount)) };
    idOfExecutingAccount = mockAccount.accountId;
    accountService = { loadAccountByIdOrFail: jest.fn(() => Promise.resolve(new MockAccount())) } as unknown as AccountService;
  });

  it('should be possible to update with the correct access', async () => {
    const usecase = new EditAccountUseCase(accountRepository, accountService);
    await usecase.execute({ payload, idOfExecutingAccount });
  });

  it('should throw an error if the executing account tries to edit the role', async () => {
    const usecase = new EditAccountUseCase(accountRepository, accountService);
    payload.fieldsToUpdate.roles = ['ADMINISTRATOR'];
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
});
