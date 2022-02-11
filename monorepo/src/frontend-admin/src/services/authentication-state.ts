import Permission from '../../../api-core/src/domain/entities/Permission';
import { AccountModel } from '../models/account.model';

export default class AuthenticationState {
  public static isAuthenticated = false;

  public static isLoading = !!localStorage.getItem('IS_AUTHENTICATED');

  public static account: AccountModel | undefined = undefined;

  public static permissions: Permission[] | undefined = undefined;
}
