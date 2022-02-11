import { useNavigation } from '@react-navigation/core';
import Screen from '../../../navigation/screen';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import SignedInStartPresenter from './presenter';

const SignedInStartScreen: React.FunctionComponent = () => {
  const auth = useSelector((state: RootState) => state.authentication);
  const navigation = useNavigation();
  const gotoBookings = () => navigation.navigate(Screen.BOOKINGS);
  const createNewBooking = () => navigation.navigate(Screen.NEW_BOOKING);
  if (!auth.currentAccount) return null;
  return (
    <SignedInStartPresenter
      account={auth.currentAccount}
      onGotoBookings={gotoBookings}
      onCreateNewBooking={createNewBooking}
    />
  );
};

export default SignedInStartScreen;
