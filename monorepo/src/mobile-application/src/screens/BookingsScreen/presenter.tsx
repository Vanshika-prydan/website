import SignedInScreenContainer from '../../components/SignedInScreenContainer';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import PassedOrUpcomingBookingsNav, {
  SelectVal,
} from './passed-or-upcoming-bookings-nav';
import UpcomingBookings from './upcoming-bookings';
import PassedBookings from './passed-bookings';

import FrameBookings from './frame-bookings';
import SignedInBookingButton from '@components/SignedInBookingButton';

export interface BookingsPresenterProps {
  isLoading: boolean;
  setUpcomingOrPassedBookings(val: SelectVal): void;
  upcomingOrPassedBookings: SelectVal;
  makeBooking(): void;
}

const BookingsPresenter: React.FunctionComponent<BookingsPresenterProps> = ({
  isLoading,
  setUpcomingOrPassedBookings,
  upcomingOrPassedBookings,
  makeBooking,
}) => {
  return (
    <SignedInScreenContainer title={'Mina bokningar'}>
      <PassedOrUpcomingBookingsNav
        onSelect={setUpcomingOrPassedBookings}
        selected={upcomingOrPassedBookings}
      />
      <ActivityIndicator animating={isLoading} />

      {upcomingOrPassedBookings === 'passed'
        ? (
        <PassedBookings />
          )
        : (
        <UpcomingBookings />
          )}
      <SignedInBookingButton title="Boka städning" onPress={makeBooking} />
      <FrameBookings />
    </SignedInScreenContainer>
  );
};

export default BookingsPresenter;

const styles = StyleSheet.create({});
