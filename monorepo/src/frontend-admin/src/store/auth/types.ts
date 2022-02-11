import { AccountModel } from '../../models/account.model';
import Permission from '../../../../api-core/src/domain/entities/Permission';

export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentAccount?: AccountModel;
  isLoading: boolean;
  error?: AuthError;
  permissions?: Permission[];
}

export interface LoginPayload {
  account: AccountModel;
  permissions: Permission[];
}
