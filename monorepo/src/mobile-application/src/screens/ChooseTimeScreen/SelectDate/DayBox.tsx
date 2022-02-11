import { RegularText } from '../../../components/Text';
import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Color } from '../../../styles';

export interface DayBoxProps {
  weekDay: string;
  day: Date;
  selectedDate: Date | null;
  timeIsPassed?: boolean;
  notAvailable?: boolean;
  onPress(day: Date): void;
}

const DayBox: React.FunctionComponent<DayBoxProps> = ({
  weekDay,
  day,
  selectedDate,
  notAvailable,
  onPress,
}) => {
  let textStyle: TextStyle = styles.dayText;
  if (selectedDate?.toISOString() === day.toISOString()) {
    textStyle = styles.selectedDayText;
  } else if (notAvailable) textStyle = styles.notAvailableText;

  return (
    <View style={styles.contaioner}>
      <TouchableOpacity
        style={styles.button}
        disabled={notAvailable}
        onPress={() => onPress(day)}
      >
        <View style={styles.WeekDayRow}>
          <RegularText style={styles.weekDayText}>{weekDay}</RegularText>
        </View>
        <View style={styles.dayRow}>
          <View
            {...(selectedDate?.toISOString() === day.toISOString()
              ? { style: styles.selectedDayCircle }
              : null)}
          ></View>
          <RegularText style={textStyle}>{format(day, 'd')}</RegularText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DayBox;

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  contaioner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  weekDayText: {
    color: Color.text,
    opacity: 0.28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  dayText: {
    color: Color.text,
    textAlign: 'center',
    fontSize: 17,
  },
  WeekDayRow: {
    paddingVertical: 10,
    flex: 1,
  },
  dayRow: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Color.primary,
    opacity: 0.5,
    position: 'absolute',
    top: 5,
  },
  selectedDayText: {
    color: Color.background,
    textAlign: 'center',
    fontSize: 17,
  },
  notAvailableText: {
    color: 'rgba(255, 137, 137, 0.2)',
    textAlign: 'center',
    fontSize: 17,
  },
  dayIsPassed: {
    color: Color.text,
    textAlign: 'center',
    fontSize: 17,
    opacity: 0.5,
  },
});
