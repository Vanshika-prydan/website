import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { Color } from '../../styles';
import { TextInput } from 'react-native-gesture-handler';
import NewBaseField from './new-base-field';
import { RegularText } from '../Text';

interface EditFieldProps {
  label: string;
  onChangeText(val: string): void;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  value: string;
  textInputProps?: TextInputProps;
  error?: string;
}
const NewEditField: React.FunctionComponent<EditFieldProps> = ({
  label,
  onChangeText,
  textInputProps,
  onBlur,
  value,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <NewBaseField
      isFocused={isFocused}
      label={label}
      right={<View />}
      content={
        <View>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChangeText}
            style={[styles.textInput, textInputProps?.style || {}]}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
          />
          {error
            ? (
            <RegularText style={styles.errorText}>{error}</RegularText>
              )
            : null}
        </View>
      }
    />
  );
};

export default NewEditField;

const styles = StyleSheet.create({
  textInput: {
    color: Color.text,
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'BalooChettan2Medium',
  },
  errorText: {
    color: 'rgba(255, 138, 138, 0.8)',
    fontSize: 13,
  },
});
