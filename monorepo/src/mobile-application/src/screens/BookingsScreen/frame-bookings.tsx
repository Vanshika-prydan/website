import React, { useEffect, useState } from 'react';
import { FrameBookingModel } from '../../models/frame-booking.model';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { Alert, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Color } from '../../styles';
import se from 'date-fns/locale/sv';
import { addMinutes, format } from 'date-fns';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { filterFrameBookingsByAccount } from '../../utils/bookings';
import { BoldText, RegularText } from '../../components/Text';

const FrameBookings: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [frameBookings, setFrameBookings] = useState<FrameBookingModel[]>([]);
  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );
  if (!accountId) return null;

  const loadFrameBookings = async () => {
    setIsLoading(true);
    try {
      const fb = await apiService.fetchAllFrameBookings();
      setFrameBookings(
        filterFrameBookingsByAccount(accountId, fb).filter((fb) => !fb.endTime)
      );
    } catch (e) {
      Alert.alert(
        'Kunde inte hämta din prenumeration',
        generateErrorMessage(e)
      );
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadFrameBookings();
  }, []);
  if (isLoading) return <ActivityIndicator animating={isLoading} />;
  if (frameBookings.length === 0) return null;
  return (
    <View style={styles.frameBookingContainer}>
      <BoldText style={styles.headerText}>Din prenumeration</BoldText>

      {frameBookings.map((fb) => {
        const startTime = new Date(fb.startTime);
        const endTime = addMinutes(startTime, fb.durationInMinutes);
        const weekDay = format(startTime, 'iiii', { locale: se });
        const time = `${format(startTime, 'HH:mm')} - ${format(
          endTime,
          'HH:mm'
        )}`;
        return (
          <View key={fb.frameBookingId}>
            <RegularText style={styles.text}>
              {fb.occurrence === 'weekly'
                ? 'varje '
                : fb.occurrence === 'biweekly'
                  ? 'varannan '
                  : fb.occurrence === 'fourweekly'
                    ? 'var fjärde '
                    : ''}
              {weekDay}
            </RegularText>
            <RegularText style={styles.text}>{time}</RegularText>
          </View>
        );
      })}

      <BoldText style={styles.headerText}>Avsluta prenumeration</BoldText>
      <RegularText style={styles.text}>
        Kontakt oss via email eller telefon för att avsluta din prenumeration.
      </RegularText>
    </View>
  );
};

export default FrameBookings;

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 30,
    paddingBottom: 10,
    color: Color.text,
    fontSize: 17,
  },
  text: {
    color: Color.text,
    fontSize: 15,
  },
  frameBookingContainer: {
    paddingHorizontal: 25,
  },
});
