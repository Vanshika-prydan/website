import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import PassedBookingBox from './passed-booking-box';
import NoBookingContent from './no-bookings-content';
import { filterCompletedBookings } from '../../store/booking/helpers';
import { filterBookingsByAccount } from '../../utils/bookings';

const PassedBookings: React.FunctionComponent = () => {
  const bookings = filterCompletedBookings().sort(
    (a, b) => Date.parse(b.startTime) - Date.parse(a.startTime)
  );

  const [selectedBooking, setSelectedBooking] = useState<null | string>(null);
  const isLoading = useSelector((state: RootState) => state.booking.isLoading);
  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );
  if (!accountId) return null;
  if (isLoading) return null;

  if (bookings.length === 0) {
    return (
      <NoBookingContent text="Du har ännu inte haft några tidigare städningar." />
    );
  }

  return (
    <View>
      {filterBookingsByAccount(accountId, bookings).map((booking) => (
        <PassedBookingBox
          booking={booking}
          key={booking.bookingId}
          isFocused={selectedBooking === booking.bookingId}
          onExpand={() => setSelectedBooking(booking.bookingId)}
        />
      ))}
    </View>
  );
};

export default PassedBookings;

const styles = StyleSheet.create({});
