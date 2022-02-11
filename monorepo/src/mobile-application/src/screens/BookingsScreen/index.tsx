import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '../../store/booking';
import { RootState } from '../../store/rootReducer';
import BookingsPresenter from './presenter';
import { SelectVal } from './passed-or-upcoming-bookings-nav';
import { useNavigation } from '@react-navigation/core';
import Screen from '@navigation/screen';

const BookingsScreen: React.FunctionComponent = () => {
  const isLoading = useSelector((state: RootState) => state.booking.isLoading);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [upcomingOrPassedBookings, setUpcomingOrPassedBookings] =
    useState<SelectVal>('upcoming');

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, []);

  return (
    <BookingsPresenter
      isLoading={isLoading}
      upcomingOrPassedBookings={upcomingOrPassedBookings}
      setUpcomingOrPassedBookings={setUpcomingOrPassedBookings}
      makeBooking={() => navigate(Screen.NEW_BOOKING)}
    />
  );
};

export default BookingsScreen;
