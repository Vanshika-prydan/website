import {
  Paper,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';

export const ServiceList = () => {
  const bookingTypes = useSelector(
    (state: RootState) => state.bookingType.bookingTypes
  );
  const isLoading = useSelector(
    (state: RootState) => state.bookingType.isLoading
  );
  if (isLoading) {
    return <CircularProgress data-test="BOOKING_TYPES_ARE_LOADING" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bookingTypes.map((b) => (
            <TableRow key={b.bookingTypeId} hover>
              <TableCell>{b.name}</TableCell>
              <TableCell>{b.description ?? ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceList;
