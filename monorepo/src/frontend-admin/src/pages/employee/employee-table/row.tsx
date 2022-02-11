import { IconButton, TableRow, TableCell } from '@material-ui/core';
import React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import AccessTime from '@material-ui/icons/AccessTime';
import { EmployeeModel } from '../../../models/employee.model';

export interface EmployeeCardProps {
  employee: EmployeeModel;
  // eslint-disable-next-line no-unused-vars
  onEditEmployee(employee: EmployeeModel): void;
  // eslint-disable-next-line no-unused-vars
  onEditEmployeeAvailability(employee: EmployeeModel): void;
}

export default function EmployeeListRow({
  employee,
  onEditEmployee,
  onEditEmployeeAvailability,
}: EmployeeCardProps) {
  return (
    <TableRow hover>
      <TableCell>{`${employee.account.firstName} ${employee.account.lastName}`}</TableCell>
      <TableCell>{employee.account.email}</TableCell>
      <TableCell>{employee.account.phoneNumber}</TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={() => onEditEmployee(employee)}>
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onEditEmployeeAvailability(employee)}
        >
          <AccessTime />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
