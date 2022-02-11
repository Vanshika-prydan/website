import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { EmployeeModel } from '../../../models/employee.model';

interface SelectEmployeeProps {
  employees: EmployeeModel[];
  // eslint-disable-next-line no-unused-vars
  onSelect(employee: EmployeeModel | null): void;
  value: null | EmployeeModel;
}

const SelectEmployee = ({
  employees,
  onSelect,
  value,
}: SelectEmployeeProps) => (
  <Autocomplete
    autoSelect
    getOptionSelected={(option, val) => option.employeeId === val.employeeId}
    value={value}
    size="small"
    id="select_employee"
    options={employees}
    onChange={(_, employee) => onSelect(employee)}
    getOptionLabel={(option) =>
      `${option.account.firstName} ${option.account.lastName} - ${option.account.email}`
    }
    style={{ width: '100%' }}
    renderInput={(params) => (
      <TextField {...params} label="Employee" variant="outlined" />
    )}
  />
);

export default SelectEmployee;
