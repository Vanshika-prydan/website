import { useNavigation } from '@react-navigation/native';
import Screen from '../../navigation/screen';
import React from 'react';
import AddAddressScreenPresenter from './presenter';

const AddAddressScreen: React.FunctionComponent = () => {
  const { navigate } = useNavigation();
  return (
    <AddAddressScreenPresenter onCreated={() => navigate(Screen.ADDRESSES)} />
  );
};

export default AddAddressScreen;
