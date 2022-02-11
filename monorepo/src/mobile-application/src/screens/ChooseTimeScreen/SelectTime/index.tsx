import { set } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimeSlot from '../../../components/TimeSlot';
import { Color } from '../../../styles';
import { Entypo } from '@expo/vector-icons';
import { RegularText } from '../../../components/Text';

interface SelectTimeProps {
  availableTimeSlots: Date[];
  selectedTime: Date | null;
  onSelect(slot: Date): void;
  selectedDate: Date | null;
}

const SelectTime: React.FunctionComponent<SelectTimeProps> = ({
  availableTimeSlots,
  selectedTime,
  selectedDate,
  onSelect,
}) => {
  if (!selectedDate) return null;

  const slots = availableTimeSlots.filter(
    (slot) =>
      set(slot, {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }).getTime() === selectedDate.getTime()
  );

  if (slots.length === 0) {
    return (
      <RegularText>
        Det finns inga tillgängliga tider på det valda datumet
      </RegularText>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrowDown}>
        <Entypo name="chevron-down" size={24} color={Color.text} />
      </View>
      <RegularText style={styles.headerText}>
        Tillgängliga tider för valt datum
      </RegularText>
      <View style={styles.timeSlotsContainer}>
        {slots.map((time) => (
          <TimeSlot
            onPress={() => onSelect(new Date(time))}
            time={time}
            selected={selectedTime?.toISOString() === time.toISOString()}
            key={time.toISOString()}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectTime;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    marginTop: 10,
  },
  headerText: {
    color: Color.text,
    fontSize: 16,
    textAlign: 'center',
  },
  timeSlotsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  arrowDown: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 25,
  },
});
