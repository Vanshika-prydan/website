import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core';
import React from 'react';
import PageTitle from '../../components/page-title';
import AcountTableRow from './account-table-row';
import { AccountsPresenterProps } from './types';

const AccountsPresenter = ({
  accounts,
  onEditAccount,
}: AccountsPresenterProps) => (
  <div>
    <PageTitle title="Accounts" />

    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {accounts.map((account) => (
            <AcountTableRow
              key={account.accountId}
              account={account}
              onClickEdit={onEditAccount}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default AccountsPresenter;
