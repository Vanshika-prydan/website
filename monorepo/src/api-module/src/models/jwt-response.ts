import { PermissionType } from '../definitions/Permissions';
import { AccountModel } from './account';

export interface JWTResponseModel {
    account: AccountModel;
    permissions: PermissionType[];
    accessToken: string;
    refreshToken: string;
}
