import { AccountModel } from '../../models/account.model';

export interface AccountsProps {}

export interface AccountsPresenterProps {
  accounts: AccountModel[];
  onEditAccount(accountId: string): void;
}

export interface AcountTableRowProps {
  account: AccountModel;
  onClickEdit(accountId: string): void;
}
