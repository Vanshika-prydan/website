import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { Fragment } from 'react';
import { AddressModel } from '../../../models/address.model';

interface SelectAddressProps {
  addresses: AddressModel[];
  // eslint-disable-next-line no-unused-vars
  onSelect(address: AddressModel | null): void;
  value: AddressModel | null;
}

const SelectAddress = ({ addresses, onSelect, value }: SelectAddressProps) => (
  <>
    <Autocomplete
      autoSelect
      getOptionSelected={(option, val) => option.addressId === val.addressId}
      value={value}
      size="small"
      id="select_address"
      options={addresses}
      onChange={(_, address) => onSelect(address)}
      getOptionLabel={(option) =>
        `${option.street} ${option.postalCode} - ${option.postalCity}`
      }
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Address" variant="outlined" />
      )}
    />
  </>
);

export default SelectAddress;
