import { AccountModel } from './account.model';
import { PermissionType } from './Permissions';

export interface JWTResponseModel {
  account: AccountModel;
  permissions: PermissionType[];
  accessToken: string;
  refreshToken: string;
}
