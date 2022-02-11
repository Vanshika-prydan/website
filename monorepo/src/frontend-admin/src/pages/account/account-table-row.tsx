import { TableRow, TableCell, IconButton } from '@material-ui/core';
import React, { Fragment } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { AcountTableRowProps } from './types';

const AcountTableRow = ({ account, onClickEdit }: AcountTableRowProps) => (
  <TableRow hover>
    <TableCell>{`${account.firstName} ${account.lastName}`}</TableCell>
    <TableCell>
      {account.roles.map((role) => (
        <Fragment key={role.name}>{role.name.toLowerCase()}</Fragment>
      ))}
    </TableCell>
    <TableCell>{account.email}</TableCell>
    <TableCell>{account.phoneNumber}</TableCell>
    <TableCell align="right">
      <IconButton size="small" onClick={() => onClickEdit(account.accountId)}>
        <MoreHorizIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default AcountTableRow;
