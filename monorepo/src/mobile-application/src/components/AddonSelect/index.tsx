import { BoldText, RegularText } from '../Text';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../styles';
import SelectBox from '../SelectBox';

interface AddonSelectProps {
  title: string;
  defaultTimeInMinutes: number;
  selected: boolean;
  onPress(): void;
}

const AddonSelect: React.FunctionComponent<AddonSelectProps> = ({
  onPress,
  selected,
  defaultTimeInMinutes,
  title,
}) => {
  return (
    <SelectBox onPress={onPress} selected={selected}>
      <View style={styles.textContainer}>
        <BoldText style={styles.title}>{title}</BoldText>
        <RegularText style={styles.time}>
          + {defaultTimeInMinutes ? defaultTimeInMinutes.toString() : ''} min
        </RegularText>
      </View>
    </SelectBox>
  );
};

export default AddonSelect;

const styles = StyleSheet.create({
  textContainer: {},
  title: {
    fontSize: 16,
    color: Color.text,
  },
  time: {
    fontSize: 12,
    color: Color.text,
  },
});
