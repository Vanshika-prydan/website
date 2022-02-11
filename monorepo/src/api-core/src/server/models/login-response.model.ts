import Permission from '../../domain/entities/Permission';
import { AccountModel } from './account.model';

export interface LoginResponseModel {
    account: AccountModel;
    permissions: Permission[];
}
