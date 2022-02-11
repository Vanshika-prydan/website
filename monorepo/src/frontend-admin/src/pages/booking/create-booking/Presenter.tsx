/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import DateFnsUtils from '@date-io/date-fns';
import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  CircularProgress,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogActions,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import React, { Fragment } from 'react';
import DialogTitle from '../../../components/dialog-title';
import SelectAddress from '../../../components/forms/select-address';
import SelectBookingType from '../../../components/forms/select-booking-type';
import SelectCustomer from '../../../components/forms/select-customer';
import SelectEmployee from '../../../components/forms/select-employee';
import { AddonModel } from '../../../models/addon.model';
import { AddressModel } from '../../../models/address.model';
import { BookingTypeModel } from '../../../models/booking-type.model';
import { CustomerModel } from '../../../models/customer.model';
import { EmployeeModel } from '../../../models/employee.model';
import AddAddons from './add-addons';
import { Occurrence } from './types';

export interface PresenterProps {
  isOpen: boolean;
  customers: CustomerModel[];
  setCustomer(selected: CustomerModel | null): void;
  customer: CustomerModel | null;
  setAddress(address: AddressModel | null): void;
  address: AddressModel | null;
  employees: EmployeeModel[];
  setEmployee(employee: EmployeeModel | null): void;
  employee: EmployeeModel | null;
  setStartTime(startTime: Date): void;
  startTime: Date | null;
  bookingTypes: BookingTypeModel[];
  setBookingType(bookingType: BookingTypeModel | null): void;
  bookingType: BookingTypeModel | null;
  availableAddons: AddonModel[];
  selectedAddons: AddonModel[];
  onAddonSelect(addon: AddonModel): void;
  onAddonUnselect(addon: AddonModel): void;
  durationInMinutes: string;
  setDurationInMinutes(value: string): void;
  isFrameBooking: boolean;
  setIsFrameBooking(value: boolean): void;
  occurrence: string;
  setOccurrence(value: Occurrence): void;
  frameBookingEndDate: Date | undefined;
  setFrameBookingEndDate(value: Date | undefined): void;
  submitIsDisabled: boolean;
  onSubmit(): void;
  onClose(): void;
  isLoading: boolean;
  errorMessage: string;
  availableAddresses: AddressModel[];
  specialInstructions: string;
  setSpecialInstructions(value: string): void;
}

const Presenter: React.FunctionComponent<PresenterProps> = (
  props: PresenterProps
) => (
  <Dialog open={props.isOpen} fullWidth data-test="CREATE_BOOKING_DIALOG">
    <DialogTitle onClose={props.onClose}>Create new booking</DialogTitle>
    <DialogContent>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              size="small"
              minDate={new Date()}
              value={props.startTime}
              onChange={(d) => (d ? props.setStartTime(d) : new Date())}
              label="Date"
              inputVariant="outlined"
              fullWidth
              format="yyyy-MM-dd HH:mm"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <SelectBookingType
            bookingTypes={props.bookingTypes}
            onSelect={props.setBookingType}
            value={props.bookingType}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectCustomer
            onSelect={props.setCustomer}
            customers={props.customers}
            value={props.customer}
          />
        </Grid>
        {props.customer?.addresses ? (
          <Grid item xs={12}>
            <SelectAddress
              addresses={props.availableAddresses}
              onSelect={props.setAddress}
              value={props.address}
            />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <SelectEmployee
            employees={props.employees}
            onSelect={props.setEmployee}
            value={props.employee}
          />
        </Grid>

        <Grid item xs={12}>
          <AddAddons
            availableAddons={props.availableAddons}
            selectedAddons={props.selectedAddons}
            onSelectAddon={props.onAddonSelect}
            onUnselectAddon={props.onAddonUnselect}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            id="durationInMinutes"
            label="Duation in minutes"
            value={props.durationInMinutes}
            onChange={(e) => props.setDurationInMinutes(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={props.isFrameBooking}
                onChange={() => props.setIsFrameBooking(!props.isFrameBooking)}
                name="isFrameBooking"
                color="primary"
              />
            }
            label="This is repeated booking"
          />
        </Grid>

        {props.isFrameBooking ? (
          <>
            <Grid item xs={12}>
              <Typography>Occurrence</Typography>

              <FormControl fullWidth size="small">
                <Select
                  variant="outlined"
                  fullWidth
                  labelId="occurrence"
                  id="occurrence"
                  value={props.occurrence}
                  onChange={(e) =>
                    props.setOccurrence(e.target.value as unknown as Occurrence)
                  }
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="biweekly">Bi-weekly</MenuItem>
                  <MenuItem value="fourweekly">Every four weeks</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!props.frameBookingEndDate}
                    onChange={() =>
                      props.setFrameBookingEndDate(
                        props.frameBookingEndDate ? undefined : new Date()
                      )
                    }
                    name="hasEndDate"
                    color="primary"
                  />
                }
                label="Add an end date to the subscription"
              />
            </Grid>
            {props.frameBookingEndDate ? (
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    size="small"
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    inputVariant="outlined"
                    margin="normal"
                    id="endDate"
                    label="End date of the subscription"
                    value={props.frameBookingEndDate}
                    onChange={(d) =>
                      props.setFrameBookingEndDate(d || undefined)
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            ) : null}
          </>
        ) : null}

        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Special instructions"
            value={props.specialInstructions}
            onChange={(e) => props.setSpecialInstructions(e.target.value)}
            multiline
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          {props.isLoading ? <CircularProgress /> : null}
          {props.errorMessage ? (
            <Typography color="error">{props.errorMessage}</Typography>
          ) : null}
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button
        variant="contained"
        color="primary"
        disabled={props.submitIsDisabled}
        onClick={props.onSubmit}
      >
        Create new booking
      </Button>
    </DialogActions>
  </Dialog>
);

export default Presenter;
