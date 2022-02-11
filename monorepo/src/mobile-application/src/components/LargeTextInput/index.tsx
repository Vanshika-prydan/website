import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Color } from '../../styles';

const LargeTextInput: React.FunctionComponent<TextInputProps> = (props) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholderTextColor={Color.complement}
        {...props}
      />
    </View>
  );
};

export default LargeTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderColor: Color.primary,
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: Color.background,
    color: Color.text,
    fontFamily: 'BalooChettan2Regular',
  },
});
