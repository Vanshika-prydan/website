import { AccountModel } from '../../models/account.model';
import { PermissionType } from 'models/Permissions';

export interface AuthError {
  message: string;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  currentAccount?: AccountModel;
  isLoading: boolean;
  error?: AuthError;
  permissions?: PermissionType[];
  refreshToken: string | null;
  accessToken: string | null;
  isRegistering: boolean;
}

export interface LoginPayload {
  account: AccountModel;
  permissions: PermissionType[];
}
