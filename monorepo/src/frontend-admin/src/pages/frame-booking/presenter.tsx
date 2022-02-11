import { Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { format } from 'date-fns';
import PermissionRequired from '../../components/permission-required';
import { FrameBookingModel } from '../../models/frame-booking.model';
import CancelFrameBookingDialog from './cancel-frame-booking-dialog';
import PageTitle from '../../components/page-title';
import EditFrameBookingDialog from './edit-frame-booking';

interface FrameBookingPresenterProps {
  frameBooking: FrameBookingModel;
  // eslint-disable-next-line no-unused-vars
  cancelFrameBooking(frameBookingId: string): Promise<void>;
}

const FrameBookingPresenter = ({
  frameBooking,
  cancelFrameBooking,
}: FrameBookingPresenterProps) => (
  <>
    <PageTitle title="Frame booking" />

    <Grid container spacing={3}>
      <Grid xs={4} item>
        Subscription
      </Grid>
      <Grid xs={8} item>
        <Typography>
          {' '}
          Start date: {format(
            new Date(frameBooking.startTime),
            'yyyy-MM-dd'
          )}{' '}
        </Typography>
        <Typography>
          {' '}
          Time: {format(new Date(frameBooking.startTime), 'HH:mm')}{' '}
        </Typography>
        <Typography>
          {' '}
          Duration: {frameBooking.durationInMinutes} minutes{' '}
        </Typography>
        {frameBooking.endTime ? (
          <Typography>
            {' '}
            End date: {format(
              new Date(frameBooking.endTime),
              'yyyy-MM-dd'
            )}{' '}
          </Typography>
        ) : null}
      </Grid>

      <Grid xs={4} item>
        Customer
      </Grid>
      <Grid xs={8} item>
        <Typography>
          {frameBooking.customer.account.firstName}{' '}
          {frameBooking.customer.account.lastName}
        </Typography>
        <Typography>{frameBooking.customer.account.email}</Typography>
        <Typography>{frameBooking.customer.account.phoneNumber}</Typography>
      </Grid>

      <Grid xs={4} item>
        Address
      </Grid>
      <Grid xs={8} item>
        <Typography>{frameBooking.address.street}</Typography>
        <Typography>
          {frameBooking.address.postalCode} {frameBooking.address.postalCity}
        </Typography>
        {frameBooking.address.code ? (
          <Typography>Door code: {frameBooking.address.code}</Typography>
        ) : null}
        {frameBooking.address.information ? (
          <Typography>
            Information: {frameBooking.address.information}
          </Typography>
        ) : null}
      </Grid>

      <Grid xs={4} item>
        Employee
      </Grid>
      <Grid xs={8} item>
        <Typography>
          {frameBooking.employee.firstName} {frameBooking.employee.lastName}
        </Typography>
      </Grid>
      {!frameBooking.endTime ||
      Date.parse(frameBooking.endTime) > Date.now() ? (
        <Grid xs={12} item>
          <PermissionRequired permission="BOOKING_CANCEL_CUSTOMER_FRAME_BOOKING">
            <CancelFrameBookingDialog
              onCancel={() => cancelFrameBooking(frameBooking.frameBookingId)}
            />
          </PermissionRequired>
          <PermissionRequired permission="BOOKING_UPDATE_CUSTOMER_BOOKING">
            <EditFrameBookingDialog frameBooking={frameBooking} />
          </PermissionRequired>
        </Grid>
      ) : null}
    </Grid>
  </>
);

export default FrameBookingPresenter;
