import { AccountModel } from '../../models/account.model';

export interface AccountState {
  accounts: AccountModel[];
  isLoading: boolean;
}
