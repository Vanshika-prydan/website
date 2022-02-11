import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import { AccountNotification } from '../../database/entities/AccountNotification';
import { IAccountNotification } from '../../domain/entities/AccountNotification';
import { AccountNotificationRepositoryInterface } from '../../domain/interface-adapters/repositories/account-notifiaction-repository';

@injectable()
export default class AccountNotificationRepository implements AccountNotificationRepositoryInterface {
  findByToken (token: string): Promise<IAccountNotification | undefined> {
    return getRepository(AccountNotification).findOne({ where: { token } });
  }

  findById (id: string): Promise<IAccountNotification | undefined> {
    throw new Error('Method not implemented.');
  }

  findAll (): Promise<IAccountNotification[]> {
    throw new Error('Method not implemented.');
  }

  async delete (entity: IAccountNotification): Promise<void> {
    await getRepository(AccountNotification).delete(entity.accountNotificationId);
  }

  async save (entity: IAccountNotification): Promise<IAccountNotification> {
    const an = new AccountNotification(entity);
    await getRepository(AccountNotification).save(an);
    return an;
  }

  fetchByAccount (accountId: string):Promise<IAccountNotification[]> {
    return getRepository(AccountNotification).find({ where: { account: { accountId } } });
  }
}
