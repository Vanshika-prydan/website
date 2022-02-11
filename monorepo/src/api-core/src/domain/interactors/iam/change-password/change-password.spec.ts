import ChangePasswordUseCase from '.';
import MockAccount from '../../../entities/Account/mock-account';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';

import bcrypt from 'bcrypt';
import { IAccount } from '../../../entities/Account';

describe('Change password usecase', () => {
  let accountRepository: IAccountRepository;
  let usecase: ChangePasswordUseCase;

  const oldPassword = 'DetHär_ar333!_fDH#';
  const newPassword = 'Eets€%346.3_12sr';
  let mockAccount: IAccount;
  let returnValue: IAccount;

  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash(oldPassword, 10);
    mockAccount = new MockAccount({ password: encryptedPassword });

    // @ts-ignore
    accountRepository = { findById: jest.fn(() => Promise.resolve(mockAccount)), save: jest.fn(() => Promise.resolve()) };
    usecase = new ChangePasswordUseCase(accountRepository);
    const payload = { oldPassword, newPassword };
    returnValue = await usecase.execute({ payload, idOfExecutingAccount: mockAccount.accountId });
  });

  it('should load the account', () => {
    expect(accountRepository.findById).toHaveBeenCalledWith(mockAccount.accountId);
  });

  it('should save the account', () => {
    expect(accountRepository.save).toHaveBeenCalled();
  });

  it('should return a password that matches the updated', () => {
    expect(bcrypt.compareSync(newPassword, returnValue.password!)).toBe(true);
  });
});
