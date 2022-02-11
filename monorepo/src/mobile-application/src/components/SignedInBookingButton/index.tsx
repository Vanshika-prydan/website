import { BoldText } from '../Text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles';

export interface SignedInBookingButtonProps {
  iconImage?: any;
  title: string;
  onPress(): void;
}

const SignedInBookingButton: React.FunctionComponent<SignedInBookingButtonProps> =
  ({ title, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View>
          <BoldText style={styles.text}>{title}</BoldText>
        </View>
      </TouchableOpacity>
    );
  };

export default SignedInBookingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(236, 242, 234, 1)',
    padding: 18,
    borderRadius: 9,
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    color: Color.text,
    fontSize: 18,
  },
});
