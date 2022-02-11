/* eslint-disable no-unused-vars */
import { Typography } from '@material-ui/core';
import React, { Component, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FrameBookingModel } from '../../models/frame-booking.model';
import ApiService from '../../services/api-service';
import { AppDispatch } from '../../store';
import { fetchAllFrameBookings } from '../../store/frame-booking';
import { RootState } from '../../store/rootReducer';
import FrameBookingPresenter from './presenter';

interface FrameBookingProps {}

const FrameBooking = (props: FrameBookingProps) => {
  const route = useRouteMatch<{ frameBookingId: string }>(
    '/frame-booking/:frameBookingId'
  );
  const history = useHistory();
  if (!route?.params?.frameBookingId) {
    history.replace('/booking');
    return null;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFrameBookings());
  }, []);

  const frameBooking = useSelector((state: RootState) =>
    state.frameBooking.frameBookings.find(
      (fb) => fb.frameBookingId === route?.params?.frameBookingId
    )
  );

  const cancelFrameBooking = async (frameBookingId: string) => {
    await ApiService.cancelFrameBooking(frameBookingId);
    dispatch(fetchAllFrameBookings());
  };

  if (!frameBooking) {
    return <Typography>Cannot find the frame booking</Typography>;
  }

  return (
    <FrameBookingPresenter
      frameBooking={frameBooking}
      cancelFrameBooking={cancelFrameBooking}
    />
  );
};

export default FrameBooking;
