import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AddressesPresenter from './presenter';
import { generateErrorMessage } from '../../utils/generate-error-message';
import apiService from '../../services/api-service';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { CustomerAddressModel } from '../../models/customer-address.model';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../navigation/screen';

const AddressesScreen: React.FunctionComponent = () => {
  const [addresses, setAddresses] = useState<CustomerAddressModel[]>([]);
  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );

  const fetchAddresses = async () => {
    try {
      const customers = await apiService.getCustomers();
      const customer = customers.find((c) => c.account.accountId === accountId);
      if (!customer) {
        Alert.alert('Kunde inte hämta information');
        return;
      }
      setAddresses(customer.addresses || []);
    } catch (e) {
      Alert.alert('Kunde inte hämta adresserna', generateErrorMessage(e));
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const { navigate } = useNavigation();

  const onSave = async (customerAddressId: string, code: string) => {
    try {
      await apiService.editCustomerAddress(customerAddressId, {
        address: { code },
      });
      await fetchAddresses();
    } catch (e) {
      Alert.alert('Kunde inte uppdatera adressen', generateErrorMessage(e));
    }
  };

  return (
    <AddressesPresenter
      addresses={addresses}
      onSaveCode={onSave}
      onAddAddress={() => navigate(Screen.ADD_ADDRESS)}
    />
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({});
