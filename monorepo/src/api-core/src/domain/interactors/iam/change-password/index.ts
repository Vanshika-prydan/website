import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { IAccount } from '../../../entities/Account';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import AccountService from '../../../services/account-service';

interface RequestPayload {
    oldPassword: string;
    newPassword: string;
}

@injectable()
export default class ChangePasswordUseCase implements IUseCase<RequestPayload, IAccount> {
  constructor (@inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository) {}
  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload ; idOfExecutingAccount: string }): Promise<IAccount> {
    const account = await this.accountRepository.findById(idOfExecutingAccount);
    if (!account) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    await AccountService.comparePasswordAndThrowIfWrong(payload.oldPassword, account);
    account.password = await AccountService.validateAndEncryptPassword(payload.newPassword);
    await this.accountRepository.save(account);
    return account;
  }
}
