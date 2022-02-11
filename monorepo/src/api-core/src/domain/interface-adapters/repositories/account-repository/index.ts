import { IAccount } from '../../../entities/Account';

export interface ICreateAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  roleNames?: string[];
}

export const ACCOUNT_REPOSITORY_INTERFACE = 'IAccountRepository';

export interface IAccountRepository {
  create(payload: ICreateAccountPayload): Promise<IAccount>;
  findById(accountId: string): Promise<IAccount | undefined>;
  findByIdOrFail(accountId:string):Promise<IAccount>;
  findByEmail(email: string): Promise<IAccount | undefined>;
  findByPhoneNumber(phoneNumber: string):Promise<IAccount | undefined>;
  getAll(): Promise<IAccount[]>;
  update(account: IAccount): Promise<IAccount>;
  save(account:IAccount):Promise<void>;
}
