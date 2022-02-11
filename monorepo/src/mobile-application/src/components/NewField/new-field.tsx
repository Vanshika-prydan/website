import React from 'react';
import { StyleSheet } from 'react-native';
import { Color } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import NewBaseField from './new-base-field';
import { RegularText } from '../Text';

interface FieldProps {
  label: string;
  onEdit(): void;
  value: string;
}
const NewField: React.FunctionComponent<FieldProps> = ({
  label,
  onEdit,
  value,
}) => {
  return (
    <NewBaseField
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

export default NewField;

const styles = StyleSheet.create({
  contentText: {
    color: Color.text,
    fontSize: 16,
  },
});
