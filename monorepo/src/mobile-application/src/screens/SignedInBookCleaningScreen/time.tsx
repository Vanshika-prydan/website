import { AvailableTimeSlotModel } from '@models/available-time-slot';
import { useNavigation } from '@react-navigation/native';
import ChooseTimeScreenPresenter from '@screens/ChooseTimeScreen/presenter';
import apiService from '@services/api-service';
import { OccurrenceType } from '@services/api-service/types';
import { RootState } from '@store/rootReducer';
import { signedInBookingActions } from '@store/signed-in-booking';
import { generateErrorMessage } from '@utils/generate-error-message';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BookingScreen } from './BookingScreen';

const Time: React.FunctionComponent = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.signedInBooking);

  const gotoNextPage = () => {
    console.log(booking);
    navigate(BookingScreen.CONFIRMATION);
  };

  const setOccurrence = (val: OccurrenceType) => {
    dispatch(signedInBookingActions.setOccurrence(val));
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
      const sameTimeFilter = (t: AvailableTimeSlotModel): boolean =>
        t.timeSlot === val.toJSON();
      const firstAvailableEmployeeId =
        availableTimeSlotsWithEmployees.find(sameTimeFilter)?.employees[0]
          .employeeId;
      if (!firstAvailableEmployeeId) return;
      dispatch(signedInBookingActions.setEmployee(firstAvailableEmployeeId));
      dispatch(signedInBookingActions.setStartTime(val.toJSON()));
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
      setAvailableTimeSlotsWithEmployees(availableTimes);
      setAvailableTimeSlots(availableTimes.map((a) => new Date(a.timeSlot)));

      setIsLoadingTimeSlots(false);
    } catch (e) {
      Alert.alert('Kunde inte ladda', generateErrorMessage(e));
      setIsLoadingTimeSlots(false);
      console.log(e);
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

export default Time;
