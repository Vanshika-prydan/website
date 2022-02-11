import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { CustomerModel } from '../../../models/customer.model';

interface SelectCustomerProps {
  customers: CustomerModel[];
  // eslint-disable-next-line no-unused-vars
  onSelect(customer: CustomerModel | null): void;
  value: CustomerModel | null;
}

const SelectCustomer = ({
  customers,
  onSelect,
  value,
}: SelectCustomerProps) => (
  <Autocomplete
    autoSelect
    getOptionSelected={(option, val) => option.customerId === val.customerId}
    value={value}
    size="small"
    id="select_customer"
    options={customers}
    onChange={(_, selected) => onSelect(selected)}
    getOptionLabel={(option) =>
      `${option.account.firstName} ${option.account.lastName} - ${option.account.email}`
    }
    style={{ width: '100%' }}
    renderInput={(params) => (
      <TextField {...params} label="Customer" variant="outlined" />
    )}
  />
);

export default SelectCustomer;
