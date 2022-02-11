import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import AccountNotification from '../../../entities/AccountNotification';
import { AccountNotificationRepositoryInterface, ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/account-notifiaction-repository';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';

@injectable()
export default class RegisterAccountDeviceUseCase implements IUseCase<string, void> {
  constructor (
      @inject(ACCOUNT_NOTIFICATION_REPOSITORY_INTERFACE) private readonly repository:AccountNotificationRepositoryInterface,
      @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: string; idOfExecutingAccount: string ; }): Promise<void> {
    const account = await this.accountRepository.findById(idOfExecutingAccount);
    if (!account) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    const token = await this.repository.findByToken(payload);
    if (token) await this.repository.delete(token);
    const entity = new AccountNotification({ token: payload, account });
    await this.repository.save(entity);
  }
}
