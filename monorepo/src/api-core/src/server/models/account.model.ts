import validator from 'validator';
import { IAccount } from '../../domain/entities/Account';
import { RoleDTO, RoleModel } from './role.model';

export interface AccountModel {
    accountId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    dateCreated: string,
    dateUpdated: string,
    roles?: RoleModel[],
    personalIdentityNumber?:string,
}

export class AccountDTO implements AccountModel {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    roles?: RoleModel[];
    phoneNumber?: string;
    dateCreated: string;
    dateUpdated: string;
    personalIdentityNumber?: string;

    constructor (
      {
        accountId,
        firstName,
        lastName,
        email,
        roles,
        phoneNumber,
        dateCreated,
        dateUpdated,
        personalIdentityNumber,
      }: IAccount,
    ) {
      this.accountId = validator.escape(accountId);
      this.firstName = validator.escape(firstName);
      this.lastName = validator.escape(lastName);
      this.email = validator.escape(email);
      this.phoneNumber = phoneNumber ? validator.escape(phoneNumber) : undefined;
      this.roles = roles ? roles.map(r => new RoleDTO(r)) : undefined;
      this.dateCreated = dateCreated.toJSON();
      this.dateUpdated = dateUpdated.toJSON();
      this.personalIdentityNumber = personalIdentityNumber ? 'XXXXXX-XXXX'/* validator.escape(personalIdentityNumber) */: undefined;
    }
}
