import Screen from '@navigation/screen';
import { useNavigation } from '@react-navigation/native';
import apiService from '@services/api-service';
import { Occurrence } from '@services/api-service/types';
import { RootState } from '@store/rootReducer';
import { generateErrorMessage } from '@utils/generate-error-message';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import ConfirmationPresenter from './confirmation-presenter';

const Confirmation: React.FunctionComponent = () => {
  const booking = useSelector((state: RootState) => state.signedInBooking);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  if (
    !booking.occurrence ||
    !booking.address ||
    !booking.bookingTypeId ||
    !booking.durationInMinutes ||
    !booking.employeeId ||
    !booking.startTime
  ) {
    return null;
  }

  const { navigate } = useNavigation();

  useEffect(() => {
    console.log(booking);
  }, []);

  const newBooking = async () => {
    if (
      !booking.occurrence ||
      !booking.address ||
      !booking.bookingTypeId ||
      !booking.durationInMinutes ||
      !booking.employeeId ||
      !booking.startTime
    ) {
      return;
    }

    const data = {
      startTime: new Date(booking.startTime),
      durationInMinutes: booking.durationInMinutes,
      addressId: booking.address.address.addressId,
      specialInstructions: booking.specialInstructions,
      bookingTypeId: booking.bookingTypeId,
      employeeId: booking.employeeId,
      bookingAddons: booking.addonIds.map((addonId) => ({
        addonId,
        numberOfUnits: 1,
      })),
    };
    setIsCreating(true);
    try {
      if (booking.occurrence === Occurrence.ONETIME) {
        await apiService.createBooking(data);
      } else {
        await apiService.createFrameBooking({
          ...data,
          occurrence: booking.occurrence,
        });
      }
      setIsCreating(false);
      navigate(Screen.BOOKINGS);
    } catch (e) {
      Alert.alert(generateErrorMessage(e));
      setIsCreating(false);
    }
  };

  return (
    <ConfirmationPresenter
      {...{
        isCreating,
        booking,
        acceptTerms,
        setAcceptTerms,
        onConfirm: newBooking,
      }}
    />
  );
};

export default Confirmation;
