import { getConnection, getRepository } from 'typeorm';
import { Account } from '../../database/entities/Account';
import { Role } from '../../database/entities/Role';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { IAccount } from '../../domain/entities/Account';
import { IAccountRepository, ICreateAccountPayload } from '../../domain/interface-adapters/repositories/account-repository';

export class AccountRepository implements IAccountRepository {
  findByPhoneNumber (phoneNumber: string): Promise<IAccount | undefined> {
    return getRepository(Account).findOne({ phoneNumber });
  }

  async findByIdOrFail (accountId: string): Promise<IAccount> {
    const account = await this.findById(accountId);
    if (!account) throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
    return account;
  }

  async save (account: IAccount): Promise<void> {
    const a = await getRepository(Account).findOneOrFail(account.accountId);
    if (account.password) a.password = account.password;
    getRepository(Account).save(a);
  }

  async update (account: IAccount): Promise<IAccount> {
    const a = await getRepository(Account).findOneOrFail(account.accountId);
    a.phoneNumber = account.phoneNumber ?? undefined;
    a.firstName = account.firstName;
    a.lastName = account.lastName;

    await getRepository(Account).save(a);

    return a;
  }

  async create (payload: ICreateAccountPayload): Promise<IAccount> {
    try {
      const allRoles = await getConnection().getRepository(Role).find();

      const roles = allRoles.filter(r => payload.roleNames?.includes(r.name));

      const account = new Account();
      account.email = payload.email;
      account.firstName = payload.firstName;
      account.lastName = payload.lastName;
      account.phoneNumber = payload.phoneNumber;
      account.password = payload.password;
      account.roles = roles;
      await getRepository(Account).save(account);

      return account;
    } catch (e) {
      throw new Error(ErrorCode.CONSTRAINT_VIOLATED);
    }
  }

  async findByEmail (email: string): Promise<IAccount | undefined> {
    const account = await getConnection().getRepository(Account).findOne({ where: { email }, relations: ['roles'] });
    return account;
  }

  getAll (): Promise<IAccount[]> {
    return getConnection().getRepository(Account).find({ relations: ['roles'] });
  }

  async findById (accountId: string): Promise<IAccount | undefined> {
    try {
      const account = await getConnection().getRepository(Account).findOne({ where: { accountId }, relations: ['roles'] });
      return account;
    } catch (e) {
      return undefined;
    }
  }
}
