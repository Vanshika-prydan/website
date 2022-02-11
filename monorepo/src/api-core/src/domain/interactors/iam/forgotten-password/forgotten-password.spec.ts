import ForgottenPasswordUseCase from '.';
import MockAccount from '../../../entities/Account/mock-account';
import MockResetPasswordCode from '../../../entities/ResetPasswordCode/mock-reset-password-code';
import ResetPasswordService from '../../../services/reset-password-service';
import EmailService from '../../../services/email-service';
import AccountService from '../../../services/account-service';

describe('Forgotten password use case', () => {
  let usecase: ForgottenPasswordUseCase;
  let resetPasswordService: ResetPasswordService;
  let accountService: AccountService;
  let emailService: EmailService;
  const response = new MockResetPasswordCode();
  const mockAccount = new MockAccount();
  beforeEach(async () => {
    // @ts-ignore
    resetPasswordService = { generateNewResetPasswordEntity: jest.fn(() => Promise.resolve(response)) };
    // @ts-ignore
    accountService = { findByEmail: jest.fn(() => Promise.resolve(mockAccount)) };
    // @ts-ignore
    emailService = { send: jest.fn(() => Promise.resolve()) };
    usecase = new ForgottenPasswordUseCase(resetPasswordService, emailService, accountService);
    await usecase.execute({ payload: { email: mockAccount.email } });
  });
  it('Should fetch the account by the email', () => {
    expect(accountService.findByEmail).toHaveBeenCalledWith(mockAccount.email);
  });
  it('Should create a new forgotten password code', () => {
    expect(resetPasswordService.generateNewResetPasswordEntity).toHaveBeenCalledWith(mockAccount.accountId);
  });
  it('Should send an email with the code to the user', () => {
    expect(emailService.send).toHaveBeenCalled();
  });
});
