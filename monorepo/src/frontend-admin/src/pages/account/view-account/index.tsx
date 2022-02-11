import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import ViewAccountPrestenter from './presenter';

interface ViewAccountProps {
  accountId: string;
}

const ViewAccount = ({ accountId }: ViewAccountProps) => {
  const customer = useSelector((state: RootState) =>
    state.customer.customers.find((c) => c.account.accountId === accountId)
  );
  const employee = useSelector((state: RootState) =>
    state.employee.employees.find((e) => e.account.accountId === accountId)
  );
  const account = useSelector((state: RootState) =>
    state.account.accounts.find((a) => a.accountId === accountId)
  );

  if (!account) {
    return <Typography>Cannot find the account</Typography>;
  }

  return (
    <ViewAccountPrestenter
      account={account}
      customer={customer}
      employee={employee}
    />
  );
};

export default ViewAccount;
