/* eslint-disable no-nested-ternary */
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Grid,
  DialogActions,
} from '@material-ui/core';
import React from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { BookingModel } from '../../../models/booking.model';
import DialogTitle from '../../../components/dialog-title';
import DeleteBooking from './delete-booking';
import EditBooking from '../edit-booking';

interface DetailsViewProps {
  onClose(): void;
  booking: BookingModel;
  // eslint-disable-next-line no-unused-vars
  onDelete(bookingId: string): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onPressCompleted(bookingId: string): void;
}

const DetailsView = ({
  booking,
  onClose,
  onDelete,
  onPressCompleted,
}: DetailsViewProps) => {
  const history = useHistory();

  const deleteBooking = async () => {
    await onDelete(booking.bookingId);
    onClose();
  };
  return (
    <Dialog open fullWidth>
      <DialogTitle onClose={onClose}>{booking.bookingType.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography>
              {format(new Date(booking.startTime), 'yyyy-MM-dd')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Typography>
              Start: {format(new Date(booking.startTime), 'HH:mm')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Typography>
              End: {format(new Date(booking.endTime), 'HH:mm')}
            </Typography>{' '}
          </Grid>

          <Grid item xs={4}>
            <Typography>Customer</Typography>{' '}
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {`${booking.customer.account.firstName} ${booking.customer.account.lastName}`}
              <br />{' '}
              {`${booking.customer.account.email} ${
                booking.customer.account.phoneNumber ?? ''
              }`}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Address</Typography>{' '}
          </Grid>
          <Grid item xs={8}>
            <Typography>{booking.address.street}</Typography>

            <Typography>
              {`${booking.address.postalCode} ${booking.address.postalCity}`}
            </Typography>
            {booking.address.code ? (
              <Typography>Code: {booking.address.code}</Typography>
            ) : null}
          </Grid>

          <Grid item xs={4}>
            <Typography>Employee</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {`${booking.employee.firstName} ${booking.employee.lastName}`}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>Special instructions</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{booking.specialInstructions || ''}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>Addons</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {booking.addons?.map((a, i) => (
                <div key={i.toString()}>
                  {a.addon.name} ({a.addon.defaultTimeInMinutes}min)
                </div>
              )) || ''}
            </Typography>
          </Grid>

          {Date.parse(booking.startTime) < Date.now() ? (
            <>
              {' '}
              <Grid item xs={4}>
                <Typography>Completed</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{`${
                  booking.completed && booking.paymentCompleted
                    ? 'marked as completed and sucessfully received payment'
                    : booking.completed
                    ? 'Marked as completed but not sucessfully charged'
                    : 'Not marked as completed'
                }`}</Typography>
              </Grid>
            </>
          ) : null}
        </Grid>
      </DialogContent>

      <DialogActions>
        {Date.parse(booking.startTime) > Date.now() ? (
          <>
            <EditBooking booking={booking} onUpdate={onClose} />
            <DeleteBooking onDelete={deleteBooking} />
          </>
        ) : !booking.completed ? (
          <>
            <Button
              color="primary"
              variant="contained"
              onClick={() => onPressCompleted(booking.bookingId)}
            >
              Mark as completed and charge customer
            </Button>
          </>
        ) : null}
        {booking.FrameBookingId ? (
          <Button
            onClick={() =>
              history.push(`/frame-booking/${booking.FrameBookingId}`)
            }
          >
            Go to frame booking
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default DetailsView;
