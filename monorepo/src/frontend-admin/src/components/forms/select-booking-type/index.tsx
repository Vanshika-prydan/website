import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { BookingTypeModel } from '../../../models/booking-type.model';

interface SelectBookingTypeProps {
  bookingTypes: BookingTypeModel[];
  // eslint-disable-next-line no-unused-vars
  onSelect(selectedBookingType: BookingTypeModel | null): void;
  value: BookingTypeModel | null;
}

const SelectBookingType = ({
  bookingTypes,
  onSelect,
  value,
}: SelectBookingTypeProps) => (
  <Autocomplete
    autoSelect
    getOptionSelected={(option, val) =>
      option.bookingTypeId === val.bookingTypeId
    }
    value={value}
    size="small"
    id="selected_booking_type"
    options={bookingTypes}
    onChange={(_, selected) => onSelect(selected)}
    getOptionLabel={(option) => `${option.name}`}
    style={{ width: '100%' }}
    renderInput={(params) => (
      <TextField {...params} label="Booking type" variant="outlined" />
    )}
  />
);

export default SelectBookingType;
