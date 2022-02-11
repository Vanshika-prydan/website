import Permission from '../../domain/entities/Permission';
import { AccountModel } from './account.model';

export interface JWTLoginResponseModel {
    account: AccountModel;
    permissions: Permission[];
    accessToken: string;
    refreshToken: string;
}
