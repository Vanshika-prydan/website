import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { addDays, addWeeks, format, getWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import { AntDesign } from '@expo/vector-icons';

import { Color } from '@styles/index';
import { MediumText, RegularText } from '@components/Text';
import DayBox from './DayBox';

export interface SelectDatePresenterProps {
  onPressNextWeek(): void;
  onPressPreviousWeek(): void;
  selectedDate: Date | null;
  firstDayOfWeek: Date;
  setSelectedDate(val: Date | null): void;
  today: Date;
  availableDates: Date[];
}

const SelectDatePresenter: React.FunctionComponent<SelectDatePresenterProps> =
  ({
    selectedDate,
    firstDayOfWeek,
    onPressNextWeek,
    onPressPreviousWeek,
    setSelectedDate,
    today,
    availableDates,
  }) => {
    const dateBeforeTomorrow = (date: Date): boolean =>
      date.getTime() < addDays(today, 1).getTime();

    const monday = addDays(firstDayOfWeek, 0);
    const tuesday = addDays(firstDayOfWeek, 1);
    const wednesday = addDays(firstDayOfWeek, 2);
    const thursday = addDays(firstDayOfWeek, 3);
    const friday = addDays(firstDayOfWeek, 4);
    const saturday = addDays(firstDayOfWeek, 5);
    const sunday = addDays(firstDayOfWeek, 6);

    const availableDateStrings = availableDates.map((d) => d.toJSON());

    const isNotAvailable = (date: Date) =>
      dateBeforeTomorrow(date) || !availableDateStrings.includes(date.toJSON());

    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={onPressPreviousWeek}
            disabled={firstDayOfWeek.getTime() <= today.getTime()}
          >
            <AntDesign name="caretleft" size={16} color={Color.text} />
          </TouchableOpacity>
          <View>
            <MediumText style={styles.monthText}>
              {format(firstDayOfWeek, 'MMMM', { locale: sv }).toUpperCase()}
            </MediumText>
            <RegularText style={styles.weekText}>
              vecka {getWeek(firstDayOfWeek, { weekStartsOn: 1 })}
            </RegularText>
          </View>
          <TouchableOpacity
            onPress={onPressNextWeek}
            style={styles.arrowContainer}
            disabled={firstDayOfWeek.getTime() > addWeeks(today, 8).getTime()}
          >
            <AntDesign name="caretright" size={16} color={Color.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.dayGrid}>
          <DayBox
            weekDay="M"
            day={monday}
            onPress={setSelectedDate}
            selectedDate={selectedDate}
            notAvailable={isNotAvailable(monday)}
          />
          <DayBox
            weekDay="T"
            day={tuesday}
            onPress={setSelectedDate}
            selectedDate={selectedDate}
            notAvailable={isNotAvailable(tuesday)}
          />
          <DayBox
            weekDay="O"
            day={wednesday}
            onPress={setSelectedDate}
            selectedDate={selectedDate}
            notAvailable={isNotAvailable(wednesday)}
          />
          <DayBox
            weekDay="T"
            day={thursday}
            onPress={setSelectedDate}
            selectedDate={selectedDate}
            notAvailable={isNotAvailable(thursday)}
          />
          <DayBox
            weekDay="F"
            day={friday}
            onPress={setSelectedDate}
            selectedDate={selectedDate}
            notAvailable={isNotAvailable(friday)}
          />
          <DayBox
            weekDay="L"
            day={saturday}
            onPress={setSelectedDate}
            notAvailable={true}
            selectedDate={selectedDate}
          />
          <DayBox
            weekDay="S"
            day={sunday}
            onPress={setSelectedDate}
            notAvailable={true}
            selectedDate={selectedDate}
          />
        </View>
      </View>
    );
  };

export default SelectDatePresenter;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: 'rgba(68, 124, 56, 0.15)',
    borderWidth: 1,
    padding: 20,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowContainer: {
    borderRadius: 4,
    padding: 8,
    borderWidth: 0,
    borderColor: Color.border,
  },
  monthText: {
    color: Color.text,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  weekText: {
    color: Color.text,
    opacity: 0.5,
    textAlign: 'center',
    fontSize: 14,
  },
  dayGrid: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
});
