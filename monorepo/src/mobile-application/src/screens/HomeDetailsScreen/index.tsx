import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Alert } from 'react-native';

import { makeBookingActions } from '@store/make-booking';
import Screen from '@navigation/screen';
import HomeDetailsScreenPresenter from './presenter';
import { RootState } from '@store/rootReducer';
import { fetchAllAddons } from '@store/addon';
import { estimateTime } from '@utils/time-calculation';
import config from '@src/config';

const HomeDetailsScreen: React.FunctionComponent = () => {
  const booking = useSelector((state: RootState) => state.makeBooking);
  const addons = useSelector((state: RootState) => state.addon.addons);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  useEffect(() => {
    dispatch(fetchAllAddons());
  }, []);

  useEffect(() => {
    setSubmitIsDisabled(!booking.numberOfBathrooms || !booking.homeAreaInM2);
    dispatch(
      makeBookingActions.setDurationInMinutes(estimateTimeOfBooking() || 0)
    );
  });

  const setM2 = (val: string) => {
    const m2 = val.trim().replace(/,/g, '').replace(/\./g, '');
    if (!validator.isInt(m2)) {
      dispatch(makeBookingActions.setHomeAreaInM2(null));
    } else {
      dispatch(makeBookingActions.setHomeAreaInM2(Number(m2)));
    }
  };

  const setNumberOfBathrooms = (val: string) => {
    const b = val.trim().replace(/,/g, '').replace(/\./g, '');
    if (!validator.isInt(b)) {
      dispatch(makeBookingActions.setNumberOfBathrooms(null));
    } else {
      dispatch(makeBookingActions.setNumberOfBathrooms(Number(b)));
    }
  };
  const onSelectAddon = (addonId: string) => {
    if (booking.addonIds.includes(addonId)) {
      dispatch(makeBookingActions.removeAddon(addonId));
    } else {
      dispatch(makeBookingActions.addAddon(addonId));
    }
  };

  const gotoNextPage = () => {
    console.log(booking);
    if (
      (booking.numberOfBathrooms && booking.numberOfBathrooms > 5) ||
      (booking.homeAreaInM2 && booking.homeAreaInM2 > 300)
    ) {
      Alert.alert(
        'Vänligen kontakta oss',
        `Vänligen kontakta oss på ${config.PHONE_NUMBER} eller ${config.EMAIL} för att boka städning anpassad till ditt boende`
      );
      return;
    }
    navigation.navigate(Screen.CHOOSE_TIME);
  };

  const estimateTimeOfBooking = (): number | undefined => {
    if (!booking.homeAreaInM2 || !booking.numberOfBathrooms) return undefined;
    const timeOfAddons: number = addons
      .filter((a) => booking.addonIds.includes(a.addonId))
      .map((a) => a.defaultTimeInMinutes)
      .reduce((acc, current) => acc + current, 0);
    try {
      return (
        estimateTime(booking.homeAreaInM2, booking.numberOfBathrooms) +
        timeOfAddons
      );
    } catch (e) {
      return 0;
    }
  };

  return (
    <HomeDetailsScreenPresenter
      {...{
        m2: booking.homeAreaInM2?.toString() ?? '',
        setM2,
        numberOfBathRooms: booking.numberOfBathrooms?.toString() ?? '',
        setNumberOfBathrooms,
        estimatedTimeInMinutes: estimateTimeOfBooking() ?? 0,
        addons,
        onSelectAddon,
        selectedAddons: booking.addonIds,
        onPressNext: gotoNextPage,
        submitIsDisabled,
      }}
    />
  );
};

export default HomeDetailsScreen;
