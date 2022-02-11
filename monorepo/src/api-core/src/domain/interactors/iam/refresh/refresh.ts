import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { IAccount } from '../../../entities/Account';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IRefreshPayload } from './refresh-request-payload.interface';

interface ISetup {
    accountRepository: IAccountRepository,
}

export class RefreshUseCase implements IUseCase<IRefreshPayload, IAccount> {
    private readonly accountRepository: IAccountRepository;
    constructor ({ accountRepository }:ISetup) {
      this.accountRepository = accountRepository;
    }

    async execute ({ payload }: { payload: IRefreshPayload }): Promise<IAccount> {
      const account = await this.accountRepository.findById(payload.accountId);
      if (!account) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
      return account;
    }
}
