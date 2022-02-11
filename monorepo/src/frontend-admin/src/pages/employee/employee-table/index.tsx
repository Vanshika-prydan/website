import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import React from 'react';
import { EmployeeModel } from '../../../models/employee.model';
import EmployeeListRow from './row';

export interface EmployeeListProps {
  employees: EmployeeModel[];
  // eslint-disable-next-line no-unused-vars
  onEmployeeEdit(employee: EmployeeModel): void;
  // eslint-disable-next-line no-unused-vars
  onEditEmployeeAvailability(employee: EmployeeModel): void;
}

export default function EmployeeTable({
  employees,
  onEmployeeEdit,
  onEditEmployeeAvailability,
}: EmployeeListProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((e) => (
            <EmployeeListRow
              employee={e}
              key={e.employeeId}
              onEditEmployee={onEmployeeEdit}
              onEditEmployeeAvailability={onEditEmployeeAvailability}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
