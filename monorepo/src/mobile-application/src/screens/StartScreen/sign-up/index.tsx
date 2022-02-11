import { useNavigation } from '@react-navigation/native';
import Screen from '../../../navigation/screen';
import React from 'react';
import SignUpStartScreenPresenter from './presenter';
import { setIsRegistering } from '../../../store/authentication';
import { useDispatch } from 'react-redux';

const SignUpStartScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressStart = () => {
    dispatch(setIsRegistering(true));
    navigation.navigate(Screen.WHERE_TO_CLEAN);
  };

  const onPressSignIn = () => {
    dispatch(setIsRegistering(false));
    navigation.navigate(Screen.LOGIN);
  };

  return (
    <SignUpStartScreenPresenter
      onPressStart={onPressStart}
      onPressSignIn={onPressSignIn}
    />
  );
};

export default SignUpStartScreen;
