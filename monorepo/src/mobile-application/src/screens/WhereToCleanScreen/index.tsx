import React, { useEffect, useState } from 'react';
import WhereToCleanScreenPresenter from './presenter';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../navigation/screen';
import {
  setPostalCode as setPostalCodeInStore,
  makeBookingActions,
} from '../../store/make-booking';
import { useDispatch } from 'react-redux';
import PostalCode from '../../utils/postal-codes';

const WhereToCleanScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const [postalCode, setPostalCode] = useState('');
  const [nextIsDisabled, setNextIsDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setPostalCode(postalCode.trim().replace(',', '').replace('.', ''));
    setNextIsDisabled(postalCode.trim().length !== 5);
  });

  const validatePostalCode = () =>
    new PostalCode().validatePostalCode(postalCode);

  const onPressNext = () => {
    dispatch(setPostalCodeInStore(postalCode));
    if (!validatePostalCode()) {
      navigation.navigate(Screen.NOT_AVAIABLE);
      return;
    }
    dispatch(
      makeBookingActions.setPostalCity(
        new PostalCode().getCityFromCode(postalCode)
      )
    );
    navigation.navigate(Screen.CHOOSE_SERVICE);
  };

  return (
    <WhereToCleanScreenPresenter
      onPressNext={onPressNext}
      {...{ postalCode, setPostalCode, nextIsDisabled }}
    />
  );
};

export default WhereToCleanScreen;
