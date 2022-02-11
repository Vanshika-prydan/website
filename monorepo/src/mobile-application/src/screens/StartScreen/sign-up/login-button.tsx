import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { MediumText } from '../../../components/Text';

const LoginButton: React.FunctionComponent<TouchableOpacityProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <MediumText style={styles.buttonText}>{children}</MediumText>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255,255,255,0)',
    flex: 1,
    borderRadius: 9,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});
