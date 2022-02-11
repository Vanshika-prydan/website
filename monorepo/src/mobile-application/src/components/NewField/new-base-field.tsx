import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface BaseFieldProps {
  label: string;
  right: React.ReactNode;
  content: React.ReactNode;
  isFocused?: boolean;
}

const NewBaseField: React.FunctionComponent<BaseFieldProps> = ({
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

export default NewBaseField;

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

  left: { flex: 6 },
  right: { flex: 1 },
});
