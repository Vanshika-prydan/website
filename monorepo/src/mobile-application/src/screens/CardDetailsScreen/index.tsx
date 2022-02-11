import { useNavigation } from '@react-navigation/core';
import Screen from '../../navigation/screen';
import React from 'react';
import CardDetailsPresenter from './presenter';
import { useDispatch } from 'react-redux';
import { setIsRegistering } from '../../store/authentication';
import * as Linking from 'expo-linking';

const CardDetailsScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const goToHome = () => {
    dispatch(setIsRegistering(false));
    navigation.navigate(Screen.START);
  };

  const gotoStripe = () => Linking.openURL('https://stripe.com/en-se');
  return (
    <CardDetailsPresenter onAddedCard={goToHome} gotoStripe={gotoStripe} />
  );
};

export default CardDetailsScreen;
