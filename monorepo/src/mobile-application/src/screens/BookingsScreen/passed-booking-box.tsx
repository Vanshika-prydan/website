import { BookingModel } from 'models/booking.model';
import React from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';
import svSE from 'date-fns/locale/sv';
import { jsUcfirst } from '../../utils/jsUcfirst';
import BookingBox from './booking-box';
import { Color } from '../../styles';
import { RegularText } from '../../components/Text';

export interface PassedBookingBoxProps {
  booking: BookingModel;
  isFocused?: boolean;
  onExpand(): void;
}
const PassedBookingBox: React.FunctionComponent<PassedBookingBoxProps> = ({
  booking,
  isFocused,
  onExpand,
}) => {
  const startTime = new Date(booking.startTime);

  const date = format(startTime, 'eeee d MMMM', { locale: svSE });
  const startHHMM = format(startTime, 'HH:mm');
  return (
    <BookingBox
      dateText={jsUcfirst(date)}
      titleText={`${booking.bookingType.name} Kl. ${startHHMM} `}
      isfocused={isFocused}
      onExpand={onExpand}
    >
      <RegularText style={styles.employeeInfoText}>{`Hemstädning utförd av ${
        booking.employee.firstName
      } ${booking.employee.lastName.substr(0, 1)}`}</RegularText>
    </BookingBox>
  );
};

export default PassedBookingBox;

const styles = StyleSheet.create({
  employeeInfoText: {
    color: Color.text,
    fontSize: 15,
    paddingVertical: 20,
  },
});
