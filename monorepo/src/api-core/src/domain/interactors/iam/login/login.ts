import IUseCase from '../../IUseCase';
import { ILoginRequestPayload } from './login-request-payload.interface';
import { IAccount } from '../../../entities/Account';
import AccountService from '../../../services/account-service';
import { injectable } from 'tsyringe';

@injectable()
export class LoginUseCase implements IUseCase<ILoginRequestPayload, IAccount> {
  constructor (private readonly accountService: AccountService) {}

  async execute ({ payload }: { payload: ILoginRequestPayload }): Promise<IAccount> {
    const account = await this.accountService.findByEmailOrFail(payload.email);
    await AccountService.comparePasswordAndThrowIfWrong(payload.password, account);
    return account;
  }
}
