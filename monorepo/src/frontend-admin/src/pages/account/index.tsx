/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AccountModel } from '../../models/account.model';
import { fetchAllAccounts } from '../../store/account';
import { fetchAllCustomers } from '../../store/customer';
import { fetchAllEmployees } from '../../store/employee';
import { RootState } from '../../store/rootReducer';
import AccountsPresenter from './presenter';
import { AccountsProps } from './types';
import ViewAccount from './view-account';

const Accounts: React.FunctionComponent<AccountsProps> = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch<{ accountId?: string }>({
    path: '/account/:accountId',
  });

  const customers = useSelector((state: RootState) => state.customer.customers);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const accounts = useSelector((state: RootState) => state.account.accounts);

  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchAllCustomers());
    dispatch(fetchAllAccounts());
  }, []);

  const onEditAccount = (accountId: string) => {
    history.push(`/account/${accountId}`);
  };

  if (match?.params?.accountId) {
    return <ViewAccount accountId={match?.params?.accountId} />;
  }
  return (
    <AccountsPresenter accounts={accounts} onEditAccount={onEditAccount} />
  );
};

export default Accounts;
