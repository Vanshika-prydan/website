import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/rootReducer';
import { CustomerAddressModel } from '@models/customer-address.model';
import {
  fetchAddressesByCustomerId,
  filterCountryHouseAddresses,
  filterHomeAddresses,
  filterWorkAddresses,
} from '@utils/address-utils';
import { getCustomerIdFromAccountId } from '@utils/customer-utils';

import { useNavigation } from '@react-navigation/native';
import Screen from '@navigation/screen';

import StartPresenter from './start-presenter';
import { signedInBookingActions } from '@store/signed-in-booking';
import { BookingScreen } from './BookingScreen';

const Start: React.FunctionComponent = () => {
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [addresses, setAddresses] = useState<CustomerAddressModel[]>([]);

  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );
  if (!accountId) return null;

  const dispatch = useDispatch();

  const loadAddresses = async () => {
    try {
      const a = await fetchAddressesByCustomerId(
        await getCustomerIdFromAccountId(accountId)
      );
      setAddresses(a);
      setIsLoadingAddresses(false);
    } catch (e) {
      Alert.alert('Kunde inte hämta adresserna');
      setIsLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const { navigate } = useNavigation();

  const homeAddresses = filterHomeAddresses(addresses);
  const workAddresses = filterWorkAddresses(addresses);
  const countryHouseAddresses = filterCountryHouseAddresses(addresses);

  const onSelectAdress = (address: CustomerAddressModel) => {
    if (!address.homeAreaInM2 || !address.numberOfBathrooms) {
      Alert.alert(
        'Kan inte gå vidare med den här adressen.',
        'För att använda adressen behöver vi veta antalet kvadratmeter och antalet badrum'
      );
      return;
    }

    dispatch(signedInBookingActions.setAddress(address));
    navigate(BookingScreen.ADDONS);
  };

  const onAddAddress = () => navigate(Screen.ADD_ADDRESS);

  return (
    <StartPresenter
      {...{
        isLoadingAddresses,
        homeAddresses,
        workAddresses,
        countryHouseAddresses,
        onSelectAdress,
        onAddAddress,
      }}
    />
  );
};

export default Start;
