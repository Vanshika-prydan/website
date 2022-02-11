import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Screen from '../../navigation/screen';
import ChooseServicePresenter from './presenter';

const ChooseServiceScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const gotoHomeDetailsScreen = () => navigation.navigate(Screen.HOME_DETAILS);
  return <ChooseServicePresenter onPressNext={gotoHomeDetailsScreen} />;
};

export default ChooseServiceScreen;
