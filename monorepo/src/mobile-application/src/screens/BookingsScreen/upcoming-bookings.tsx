import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { RootState } from '../../store/rootReducer';
import NoBookingContent from './no-bookings-content';
import UpcomingBookingBox from './upcoming-booking-box';
import booking, { fetchAllBookings } from '../../store/booking';
import { filterActiveUpcomingBookings } from '../../store/booking/helpers';
import { filterBookingsByAccount } from '../../utils/bookings';
import { fetchAllAddons } from '../../store/addon';
import { addDays } from 'date-fns';

const UpcomingBookings: React.FunctionComponent = () => {
  const isLoading = useSelector((state: RootState) => state.booking.isLoading);
  const b = useSelector((state: RootState) => state.booking.bookings);
  const bookings = filterActiveUpcomingBookings()
    .sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))
    .filter((b, i) => i <= 5);
  const [selectedBooking, setSelectedBooking] = useState<null | string>(null);
  const dispatch = useDispatch();
  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );
  const [initiallyOpened, setInitiallyOpened] = useState(false);
  const setFirstId = () => {
    if (bookings.length > 0) {
      setSelectedBooking(bookings[0].bookingId);
      setInitiallyOpened(true);
    }
  };
  useEffect(() => {
    if (!initiallyOpened) setFirstId();
  });

  useEffect(() => {
    dispatch(fetchAllAddons());
  }, []);

  if (!accountId) return null;
  if (isLoading) return null;

  if (bookings.length === 0 && !isLoading) {
    return <NoBookingContent text="Du har ännu inga inbokade städningar." />;
  }

  const cancelBooking = async (bookingId: string) => {
    try {
      const b = bookings.find((bb) => bb.bookingId === bookingId);
      if (!b) return;

      const cancelUntil = addDays(new Date(), +2).getTime();
      const bookingTime = new Date(b.startTime).getTime();

      if (bookingTime < cancelUntil) {
        Alert.alert(
          'Kunde inte avboka städningen',
          'Tyvärr så kan du inte längre fritt avboka din städning. Men kontakta oss så hjälper vi dig'
        );
        return;
      }

      const response = await apiService.cancelBooking(bookingId);
      dispatch(fetchAllBookings());
    } catch (e) {
      console.log(e);
      Alert.alert('Kunde inte utföra operation', generateErrorMessage(e));
    }
  };

  return (
    <View>
      {filterBookingsByAccount(accountId, bookings).map((booking) => (
        <UpcomingBookingBox
          booking={booking}
          key={booking.bookingId + booking.endTime}
          isFocused={selectedBooking === booking.bookingId}
          onExpand={() => setSelectedBooking(booking.bookingId)}
          onCancel={cancelBooking}
        />
      ))}
    </View>
  );
};

export default UpcomingBookings;

const styles = StyleSheet.create({});
