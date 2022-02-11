import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import ResetPasswordService from '../../../services/reset-password-service';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import AccountService from '../../../services/account-service';

interface RequestPayload {
    email: string;
    code: string;
    password: string;
}

@injectable()
export default class ConfirmForgottenPasswordUseCase implements IUseCase<RequestPayload, void> {
  constructor (
        @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
        private readonly resetPasswordService: ResetPasswordService,
        private readonly accountService: AccountService,
  ) {}

  async execute ({ payload }: { payload: RequestPayload }): Promise<void> {
    const account = await this.accountService.findByEmailOrFail(payload.email);
    if (!await this.resetPasswordService.codeIsValid(payload.code, account.accountId)) throw new Error(ErrorCode.INVALID_CODE);
    const password = await AccountService.validateAndEncryptPassword(payload.password);
    account.password = password;
    await this.accountRepository.save(account);
    await this.resetPasswordService.invalidateAllCodesForAccount(account.accountId);
  }
}
