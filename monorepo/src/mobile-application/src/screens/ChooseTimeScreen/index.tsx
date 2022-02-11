import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'date-fns';

import { RootState } from '@store/rootReducer';
import Screen from '@navigation/screen';
import ChooseTimeScreenPresenter from './presenter';
import { makeBookingActions } from '@store/make-booking';
import apiService from '@services/api-service';
import { OccurrenceType } from '@services/api-service/types';
import { Alert } from 'react-native';
import { generateErrorMessage } from '@utils/generate-error-message';
import { AvailableTimeSlotModel } from '@models/available-time-slot';

const ChooseTimeScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.makeBooking);

  const gotoNextPage = () => {
    console.log(booking);
    navigation.navigate(Screen.ENTER_PERSONAL_INFORMATION);
  };

  const setOccurrence = (val: OccurrenceType) => {
    dispatch(makeBookingActions.setOccurrence(val));
    if (booking.durationInMinutes) {
      fetchAvailableTimeSlots(booking.durationInMinutes, val);
    }
  };

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);

  const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [availableTimeSlotsWithEmployees, setAvailableTimeSlotsWithEmployees] =
    useState<AvailableTimeSlotModel[]>([]);

  const setSelectedTime = (val: Date | null) => {
    if (val) {
      const firstAvailableEmployeeId = availableTimeSlotsWithEmployees.find(
        (t) => t.timeSlot === val.toJSON()
      )?.employees[0].employeeId;
      if (!firstAvailableEmployeeId) return;
      dispatch(
        makeBookingActions.setSelectedEmployeeId(firstAvailableEmployeeId)
      );
      dispatch(makeBookingActions.setStartTime(val.toJSON()));
    }
  };

  const fetchAvailableTimeSlots = async (
    durationInMinutes: number,
    occurrence: OccurrenceType
  ) => {
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableTimeSlotsWithEmployees([]);
    try {
      setIsLoadingTimeSlots(true);
      const availableTimes = await apiService.getAvailableTimeSlots(
        durationInMinutes,
        occurrence
      );
      const availableSlotTimes = availableTimes.map(
        (a) => new Date(a.timeSlot)
      );
      setAvailableTimeSlotsWithEmployees(availableTimes);
      setAvailableTimeSlots(availableSlotTimes);
      setIsLoadingTimeSlots(false);

      return availableSlotTimes;
    } catch (e) {
      Alert.alert('Kunde inte ladda', generateErrorMessage(e));
      setIsLoadingTimeSlots(false);
      console.log(e);
      return [];
    }
  };

  const getAvailableDates = (slotTimes: Date[]): Date[] => {
    const days: Date[] = [];
    slotTimes.forEach((t) => {
      const day = set(t, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
      if (!days.includes(day)) days.push(day);
    });
    return days;
  };

  useEffect(() => {
    if (booking.durationInMinutes && booking.occurrence) {
      fetchAvailableTimeSlots(booking.durationInMinutes, booking.occurrence);
    }
  }, []);

  useEffect(() => {
    setSubmitIsDisabled(!booking.startTime || !booking.occurrence);
  });

  return (
    <ChooseTimeScreenPresenter
      onPressNext={gotoNextPage}
      {...{
        setOccurrence,
        occurrence: booking.occurrence,
        availableTimeSlots,
        availableDays: getAvailableDates(availableTimeSlots),
        selectedDate,
        setSelectedDate,
        isLoadingTimeSlots,
        selectedTime: booking.startTime ? new Date(booking.startTime) : null,
        setSelectedTime,
        submitIsDisabled,
      }}
    />
  );
};

export default ChooseTimeScreen;
