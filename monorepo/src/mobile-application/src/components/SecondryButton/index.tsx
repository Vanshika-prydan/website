import { RegularText } from '../Text';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../styles';

const SecondaryButton: React.FunctionComponent<TouchableOpacityProps> = (
  props
) => {
  const { children, ...rest } = props;
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <RegularText style={styles.text}>{children}</RegularText>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    borderColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    display: 'flex',
    width: '100%',
    padding: 8,
  },
  text: {
    color: Color.primary,
    fontSize: 15,
    textAlign: 'center',
  },
});
