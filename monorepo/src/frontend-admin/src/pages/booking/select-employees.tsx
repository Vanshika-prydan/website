import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { EmployeeModel } from '../../models/employee.model';

export interface SelectEmployeesProps {
  employees: EmployeeModel[];
  // eslint-disable-next-line no-unused-vars
  onSelect(employees: EmployeeModel[]): void;
  initialSelected?: EmployeeModel[];
}

const SelectEmployees = ({
  employees,
  onSelect,
  initialSelected,
}: SelectEmployeesProps) => {
  const is = initialSelected ? initialSelected.map((e) => e.employeeId) : [];
  const [selectedIds, setSelectedIds] = React.useState<string[]>(is);

  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const ids = event.target.value as string[];
    setSelectedIds(ids);
    onSelect(getEmployeesByIds(ids));
  };

  const reset = () => {
    setSelectedIds([]);
    onSelect([]);
  };

  const getEmployeesByIds = (ids: string[]) =>
    employees.filter((e) => ids.includes(e.employeeId));

  const joinSelectedNames = (ids: unknown): string =>
    getEmployeesByIds(ids as string[])
      .map((e) => `${e.account.firstName} ${e.account.lastName}`)
      .join(', ');

  const select = () => (
    <>
      <div style={{ marginTop: 15 }}>
        <FormControl fullWidth variant="outlined" size="small">
          <Select
            multiple
            value={selectedIds}
            onChange={handleChange}
            renderValue={joinSelectedNames}
          >
            {employees.map((e) => {
              const name = `${e.account.firstName} ${e.account.lastName}`;
              return (
                <MenuItem key={e.employeeId} value={e.employeeId}>
                  <Checkbox checked={selectedIds.indexOf(e.employeeId) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div style={{ marginTop: 15 }}>
        <Button
          onClick={reset}
          color="secondary"
          variant="contained"
          size="small"
        >
          Reset filter
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <FormControlLabel
          control={
            <Switch
              checked={filterIsOpen}
              onChange={() => setFilterIsOpen(!filterIsOpen)}
              name="checkedB"
              color="primary"
            />
          }
          label="Show filter"
        />
        {filterIsOpen ? select() : null}
      </div>
    </>
  );
};

export default SelectEmployees;
