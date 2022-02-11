import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { estimateTime } from '../../utils/time-calculation';
import { BookingScreen } from './BookingScreen';
import { fetchAllAddons } from '../../store/addon';
import { RootState } from '../../store/rootReducer';
import { signedInBookingActions } from '../../store/signed-in-booking';
import AddonsPresenter from './addons-presenter';

const Addons: React.FunctionComponent = () => {
  const booking = useSelector((state: RootState) => state.signedInBooking);
  const addons = useSelector((state: RootState) => state.addon.addons);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(fetchAllAddons());
  }, []);

  const onSelectAddon = (addonId: string) => {
    if (booking.addonIds.includes(addonId)) {
      dispatch(signedInBookingActions.removeAddon(addonId));
    } else {
      dispatch(signedInBookingActions.addAddon(addonId));
    }
  };

  const gotoNextPage = () => {
    dispatch(
      signedInBookingActions.setDurationInMinutes(estimateTimeOfBooking())
    );
    console.log(booking);
    navigate(BookingScreen.TIME);
  };

  const estimateTimeOfBooking = (): number | null => {
    if (!booking.address?.homeAreaInM2 || !booking.address?.numberOfBathrooms) {
      Alert.alert(
        'Kan inte gå vidare',
        'För att använda adressen behöver vi veta antalet kvadratmeter och antalet badrum'
      );
      return null;
    }
    const timeOfAddons: number = addons
      .filter((a) => booking.addonIds.includes(a.addonId))
      .map((a) => a.defaultTimeInMinutes)
      .reduce((acc, current) => acc + current, 0);
    try {
      return (
        estimateTime(
          booking.address.homeAreaInM2,
          booking.address.numberOfBathrooms
        ) + timeOfAddons
      );
    } catch (e) {
      return 0;
    }
  };

  return (
    <AddonsPresenter
      {...{
        addons,
        selectedAddonIds: booking.addonIds,
        onSelectAddon,
        goNext: gotoNextPage,
      }}
    />
  );
};

export default Addons;
