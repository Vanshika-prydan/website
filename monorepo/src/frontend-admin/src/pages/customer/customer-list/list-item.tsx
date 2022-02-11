import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { CustomerModel } from '../../../models/customer.model';

export interface CustomerListItemProps {
  customer: CustomerModel;
}

const CustomerListItem = ({ customer }: CustomerListItemProps) => (
  <>
    <TableRow hover>
      <TableCell
        component="th"
        scope="row"
      >{`${customer.account.firstName} ${customer.account.lastName}`}</TableCell>
      <TableCell>{customer.account.email}</TableCell>
      <TableCell>{customer.account.phoneNumber}</TableCell>
      <TableCell />
    </TableRow>
  </>
);

export default CustomerListItem;
