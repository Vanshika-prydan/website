import SignedInBookingButton from '../../components/SignedInBookingButton';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Color } from '../../styles';
import { RegularText } from '../../components/Text';

interface Props {
  text: string;
}
const NoBookingContent: React.FunctionComponent<Props> = ({ text }) => {
  const gotoNewBooking = () => {
    Alert.alert('Ny bokning');
  };

  return (
    <View>
      <RegularText style={styles.text}>{text}</RegularText>
      {/* } <SignedInBookingButton title="Boka städning" onPress={gotoNewBooking} /> { */}
    </View>
  );
};

export default NoBookingContent;

const styles = StyleSheet.create({
  text: {
    color: Color.text,
    fontSize: 19,
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
});
