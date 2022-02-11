/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CircularProgress } from '@material-ui/core';
import CustomerListItem from './list-item';
import { RootState } from '../../../store/rootReducer';

export interface CustomerListProps {}

const CustomerList = (props: CustomerListProps) => {
  const customers = useSelector((state: RootState) => state.customer.customers);
  const isLoading = useSelector((state: RootState) => state.customer.isLoading);

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <CustomerListItem customer={customer} key={customer.customerId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading ? (
        <CircularProgress data-test="CUSTOMER_LIST_IS_LOADING" />
      ) : null}
    </>
  );
};

export default CustomerList;
