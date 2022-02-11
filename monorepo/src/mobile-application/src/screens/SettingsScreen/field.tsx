import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { Color } from '../../styles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { RegularText } from '../../components/Text';

export interface BaseFieldProps {
  label: string;
  right: React.ReactNode;
  content: React.ReactNode;
  isFocused?: boolean;
}

export const BaseField: React.FunctionComponent<BaseFieldProps> = ({
  label,
  right,
  content,
  isFocused,
}) => {
  return (
    <View
      style={{
        ...styles.section,
        ...(isFocused ? { borderColor: 'rgba(57, 81, 101, 0.4)' } : null),
      }}
    >
      <View style={styles.left}>
        <RegularText style={styles.placeholderText}>{label}</RegularText>
        <View>{content}</View>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

interface EditFieldProps {
  label: string;
  onChangeText(val: string): void;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  value: string;
  textInputProps?: TextInputProps;
  error?: string;
}
export const EditField: React.FunctionComponent<EditFieldProps> = ({
  label,
  onChangeText,
  textInputProps,
  onBlur,
  value,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <BaseField
      isFocused={isFocused}
      label={label}
      right={<View />}
      content={
        <View>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
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

interface FieldProps {
  label: string;
  onEdit(): void;
  value: string;
}
export const Field: React.FunctionComponent<FieldProps> = ({
  label,
  onEdit,
  value,
}) => {
  return (
    <BaseField
      label={label}
      right={
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={24} color="rgba(58, 82, 103, 0.3)" />
        </TouchableOpacity>
      }
      content={<RegularText style={styles.contentText}>{value}</RegularText>}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    borderColor: 'rgba(57, 81, 101, 0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    color: 'rgba(57, 81, 101, 0.3)',
    fontSize: 13,
    marginBottom: 6,
  },
  contentText: {
    color: Color.text,
    fontSize: 16,
  },
  textInput: {
    color: Color.text,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
  },
  errorText: {
    color: 'rgba(255, 138, 138, 0.8)',
    fontSize: 13,
  },
  left: { flex: 6 },
  right: { flex: 1 },
});
