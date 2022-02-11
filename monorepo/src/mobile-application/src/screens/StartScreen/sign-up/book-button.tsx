import { MediumText } from '../../../components/Text';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const BookButton: React.FunctionComponent<TouchableOpacityProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <MediumText style={styles.buttonText}>{children}</MediumText>
    </TouchableOpacity>
  );
};

export default BookButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 9,
  },
  buttonText: {
    color: '#457C38',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 12,
  },
});
