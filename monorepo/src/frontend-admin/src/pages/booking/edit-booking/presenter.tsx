import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import DialogTitle from '../../../components/dialog-title';
import SelectAddress from '../../../components/forms/select-address';
import SelectBookingType from '../../../components/forms/select-booking-type';
import SelectEmployee from '../../../components/forms/select-employee';
import { EditBookingPresenterProps } from './types';

const EditBookingPresenter = ({
  setIsOpen,
  isOpen,
  booking,
  bookingType,
  bookingTypes,
  setBookingType,
  address,
  addresses,
  setAddress,
  updateBooking,
  employee,
  employees,
  setEmployee,
  close,
  isLoading,
  errorMessage,
}: EditBookingPresenterProps) => (
  <>
    <Button onClick={() => setIsOpen(true)}>Edit booking</Button>
    <Dialog open={isOpen} fullWidth>
      <DialogTitle onClose={close}>Edit booking</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>
              Customer:{' '}
              {`${booking.customer.account.firstName} ${booking.customer.account.lastName} (${booking.customer.account.email})`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SelectBookingType
              bookingTypes={bookingTypes}
              value={bookingType}
              onSelect={setBookingType}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectAddress
              value={address}
              onSelect={setAddress}
              addresses={addresses}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectEmployee
              employees={employees}
              onSelect={setEmployee}
              value={employee}
            />
          </Grid>
          {/* <Grid item xs={12}>
              <TextField
                multiline
                variant="outlined"
                fullWidth
                label="Special instructions"
                onChange={(e) => setSpecialInstructions(e.target.value)}
              >
                {specialInstructions}
              </TextField>
            </Grid> */}
          {errorMessage ? (
            <Grid item xs={12}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={updateBooking}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress /> : 'save'}
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

export default EditBookingPresenter;
