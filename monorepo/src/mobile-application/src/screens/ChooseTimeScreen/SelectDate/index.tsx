import React, { Fragment, useState } from 'react';
import { addWeeks, setDay, set } from 'date-fns';
import SelectDatePresenter from './presenter';

export interface SelectDateProps {
  availableDates: Date[];
  selectedDate: Date | null;
  setSelectedDate(date: Date): void;
}
const SelectDate: React.FunctionComponent<SelectDateProps> = ({
  setSelectedDate,
  selectedDate,
  availableDates,
}) => {
  const TODAY = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    setDay(TODAY, 1, { weekStartsOn: 1 })
  );

  const onPressNextWeek = (): void =>
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, 1));

  const onPressPreviousWeek = (): void =>
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, -1));

  const availableTimeSlots = [new Date()];
  return (
    <Fragment>
      <SelectDatePresenter
        {...{
          onPressNextWeek,
          onPressPreviousWeek,
          selectedDate,
          firstDayOfWeek,
          setSelectedDate,
          availableTimeSlots,
          today: TODAY,
          availableDates,
        }}
      />
    </Fragment>
  );
};

export default SelectDate;
