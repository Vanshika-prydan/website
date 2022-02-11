import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import { Color } from '../../styles';

interface Props {
  error?: boolean;
}

const TextInput: React.FunctionComponent<TextInputProps & Props> = (props) => {
  const style = props.error ? styles.errorInput : styles.input;
  const extraStyle = props.style ?? {};
  // @ts-ignore
  return <RNTextInput {...props} style={{ ...style, ...extraStyle }} />;
};

export default TextInput;

const baseStyle = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: Color.background,
    color: Color.text,
    marginTop: 4,
    marginBottom: 10,
    fontFamily: 'BalooChettan2Regular',
  },
});

const styles = StyleSheet.create({
  input: {
    ...baseStyle.input,
    borderColor: Color.complement,
  },

  errorInput: {
    ...baseStyle.input,
    borderColor: Color.errorBorder,
  },
});
