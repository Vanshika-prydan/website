import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { format } from 'date-fns';
import { Color } from '../../styles';
import { BoldText } from '../Text';
interface TimeSlotProps {
  time: Date;
  selected?: boolean;
  onPress?(): void;
}

const TimSlot: React.FunctionComponent<TimeSlotProps> = ({
  time,
  onPress,
  selected,
}) => {
  return (
    <TouchableWithoutFeedback
      {...{ onPress: onPress || (() => {}) }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          ...styles.container,
          ...(selected
            ? {
                borderWidth: 4,
                padding: 11,
              }
            : {
                borderWidth: 1,
              }),
        }}
      >
        <BoldText style={styles.text}>{format(time, 'HH:mm')}</BoldText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TimSlot;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: '#447C384A',
    padding: 15,
    height: 'auto',
    width: 90,
    marginVertical: 10,
    justifyContent: 'center',
    marginRight: 20,
  },
  text: {
    color: Color.text,
    fontSize: 16,
    textAlign: 'center',
  },
});
