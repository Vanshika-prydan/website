import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../../styles';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress(): void;
  color?: string;
}
const GoBackarrow: React.FunctionComponent<Props> = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="ios-arrow-back-sharp"
        size={30}
        color={color ?? Color.background}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default GoBackarrow;

const styles = StyleSheet.create({
  icon: { padding: 10, marginLeft: 10 },
});
