import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles';
import { Entypo } from '@expo/vector-icons';

export interface SmallCheckBoxProps {
  checked: boolean;
  onPress(): void;
}

const SmallCheckBox: React.FunctionComponent<SmallCheckBoxProps> = ({
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.container, borderWidth: checked ? 4 : 1 }}>
        {checked
          ? (
          <View style={styles.icon}>
            <Entypo name="check" size={34} color={Color.primary} />
          </View>
            )
          : null}
      </View>
    </TouchableOpacity>
  );
};

export default SmallCheckBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: Color.border,
    height: 25,
    width: 25,
    margin: 0,
  },
  icon: {
    position: 'absolute',
    zIndex: 100,
    top: -15,
    left: -5,
    width: 34,
    height: 34,
  },
});
