import { IRole } from '../Role';

export interface IAccount {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    roles?: IRole[];
    dateCreated: Date;
    dateUpdated: Date;
    personalIdentityNumber?: string;
}
