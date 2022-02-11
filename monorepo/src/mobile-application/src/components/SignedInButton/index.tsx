import { RegularText } from '../Text';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Color } from '../../styles';

const SignedInButton: React.FunctionComponent<TouchableOpacityProps> = (
  props
) => {
  const { children, ...rest } = props;
  return (
    <TouchableOpacity
      style={{ ...styles.button, opacity: rest.disabled ? 0.5 : undefined }}
      {...rest}
    >
      <RegularText style={styles.text}>{children}</RegularText>
    </TouchableOpacity>
  );
};

export default SignedInButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    backgroundColor: Color.text,
    display: 'flex',
    width: '100%',
    padding: 9,
  },
  text: {
    color: Color.background,
    textAlign: 'center',
    fontSize: 18,
  },
});
