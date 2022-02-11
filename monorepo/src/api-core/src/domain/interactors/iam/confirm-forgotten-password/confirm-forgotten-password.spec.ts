import ConfirmForgottenPasswordUseCase from '.';
import MockAccount from '../../../entities/Account/mock-account';
import ResetPasswordService from '../../../services/reset-password-service';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import AccountService from '../../../services/account-service';

describe('confirm-forgotten-password-usecase', () => {
  let accountRepository: IAccountRepository;
  let resetPasswordService: ResetPasswordService;
  let usecase : ConfirmForgottenPasswordUseCase;
  let accountService: AccountService;
  const account = new MockAccount();

  const payload = {
    email: account.email,
    code: '00000000',
    password: 'thisIs_4_strong-p4SSword!',
  };
  beforeEach(async () => {
    // @ts-ignore
    accountRepository = { findByEmail: jest.fn(() => Promise.resolve(account)), save: jest.fn(() => Promise.resolve()) };
    // @ts-ignore
    resetPasswordService = {
      codeIsValid: jest.fn(() => Promise.resolve(true)),
      invalidateAllCodesForAccount: jest.fn(() => Promise.resolve()),
    };

    // @ts-ignore
    accountService = { findByEmail: jest.fn(() => Promise.resolve(account)) };

    usecase = new ConfirmForgottenPasswordUseCase(accountRepository, resetPasswordService, accountService);
    await usecase.execute({ payload });
  });

  it('Should load the account', () => {
    expect(accountRepository.findByEmail).toHaveBeenCalledWith(payload.email);
  });
  it('Should validate the code', () => {
    expect(resetPasswordService.codeIsValid).toHaveBeenCalledWith(payload.code, account.accountId);
  });
  it('Should save the account', () => {
    expect(accountRepository.save).toHaveBeenCalled();
  });
  it('Should remove the code from the database', () => {
    expect(resetPasswordService.invalidateAllCodesForAccount).toHaveBeenCalled();
  });
});
