import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Color } from '../../styles';

interface Item {
  label: string;
  value: any;
}

export interface SelectProps<T = any> {
  placeholder?: string;
  items: Item[];
  onSelect(value: T): void;
  value: T | null;
}

const Select: React.FunctionComponent<SelectProps> = ({
  items,
  onSelect,
  value,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onSelect}
        value={value}
        items={items}
        style={inputStyle}
        placeholder={placeholder ?? 'Select ..'}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

const inputStyle = StyleSheet.create({
  inputIOS: {
    flexGrow: 1,
    borderColor: Color.complement,
    borderWidth: 1,
    borderRadius: 4,
    color: Color.text,
  },
  inputAndroid: {
    flexGrow: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
