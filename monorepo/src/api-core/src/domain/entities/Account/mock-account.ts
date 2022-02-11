import { IRole } from '../Role';
import { IAccount } from './IAccount';

export default class MockAccount implements IAccount {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber?: string ;
    roles?: IRole[];
    dateCreated: Date;
    dateUpdated: Date;
    personalIdentityNumber?: string;

    constructor (a: Partial<IAccount> = {}) {
      this.accountId = a.accountId ?? '6a531648-b898-44d0-bfe9-10be80a626f6';
      this.firstName = a.firstName ?? 'Niklas';
      this.lastName = a.lastName ?? 'Johansson';
      this.email = a.email ?? 'niklas@cleangreen.se';
      this.password = a.password;
      this.roles = a.roles ?? [];
      this.dateCreated = a.dateCreated ?? new Date();
      this.dateUpdated = a.dateUpdated ?? new Date();
      this.personalIdentityNumber = a.personalIdentityNumber ?? '711102-1650';
    }
}
