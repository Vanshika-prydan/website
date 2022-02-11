import { RoleModel } from './role.model';

export interface AccountModel {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateCreated: string;
  dateUpdated: string;
  roles: RoleModel[];
  personalIdentityNumber?:string;
}
