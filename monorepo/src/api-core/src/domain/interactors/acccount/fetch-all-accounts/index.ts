import { inject, injectable } from 'tsyringe';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccount } from '../../../entities/Account';
import AccountService from '../../../services/account-service';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';

@injectable()
export default class FetchAllAccountsUseCase implements IUseCase<undefined, IAccount[]> {
  constructor (@inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository) {}

  async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string ; }): Promise<IAccount[]> {
    await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.ACCOUNT_LIST_ALL);
    return this.accountRepository.getAll();
  }
}
