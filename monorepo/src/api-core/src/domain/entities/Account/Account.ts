import { v4 } from 'uuid';
import { IAccount } from '.';
import { Optional } from '../../../types/optional';
import Role from '../Role';

export class Account implements IAccount {
  readonly accountId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password?: string ;
  readonly phoneNumber?: string ;
  readonly roles?: Role[];
  readonly dateCreated: Date;
  readonly dateUpdated: Date;
  readonly personalIdentityNumber?: string ;

  constructor (a:Optional<IAccount, 'accountId'>) {
    this.accountId = a.accountId ?? v4();
    this.email = a.email;
    this.firstName = a.firstName;
    this.lastName = a.lastName;
    this.password = a.password;
    this.roles = a.roles ? a.roles.map(r => new Role(r)) : undefined;
    this.phoneNumber = a.phoneNumber;
    this.dateCreated = a.dateCreated;
    this.dateUpdated = a.dateUpdated;
    this.personalIdentityNumber = a.personalIdentityNumber;
  }
}
