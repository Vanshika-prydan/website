import { injectable } from 'tsyringe';
import IUseCase from '../../IUseCase';
import ResetPasswordService from '../../../services/reset-password-service';
import EmailService from '../../../services/email-service';
import forgottenPasswordEmail from './forgotten-password-email';
import AccountService from '../../../services/account-service';

interface RequestPayload {
    email: string,
}

@injectable()
export default class ForgottenPasswordUseCase implements IUseCase <RequestPayload, void> {
  constructor (
    private readonly resetPasswordService: ResetPasswordService,
    private readonly emailService: EmailService,
    private readonly accountService: AccountService,
  ) {}

  async execute ({ payload }: { payload: RequestPayload}): Promise<void> {
    const account = await this.accountService.findByEmailOrFail(payload.email);
    const { accountId, email } = account;
    const resetEntity = await this.resetPasswordService.generateNewResetPasswordEntity(accountId);
    await this.emailService.send(email, 'Återställande av lösenord | We Clean Green', forgottenPasswordEmail(account, resetEntity.code));
  }
}
