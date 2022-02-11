import Permission from '../../../api-core/src/domain/entities/Permission';
import { AccountModel } from './account.model';

export interface LoginResponseModel {
  account: AccountModel;
  permissions: Permission[];
}
