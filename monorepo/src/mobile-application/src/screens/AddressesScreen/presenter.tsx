import SignedInContentBox from '../../components/SignedInContentBox';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';
import AddressComponent from './address-component';
import { CustomerAddressModel } from '../../models/customer-address.model';
import { BoldText } from '../../components/Text';
import AddButton from '../../components/AddButton';
import {
  filterCountryHouseAddresses,
  filterHomeAddresses,
  filterWorkAddresses,
} from '../../utils/address-utils';

export interface Props {
  addresses: CustomerAddressModel[];
  onSaveCode(customerAddressId: string, code: string): void;
  onAddAddress(): void;
}
const AddressesPresenter: React.FunctionComponent<Props> = ({
  addresses,
  onSaveCode,
  onAddAddress,
}) => {
  const homeAddresses = filterHomeAddresses(addresses);
  const workAddresses = filterWorkAddresses(addresses);
  const countryHouseAddresses = filterCountryHouseAddresses(addresses);

  const renderHomeAddresses = () =>
    homeAddresses.length > 0
      ? (
      <View>
        <BoldText style={styles.titleText}>Hemadress</BoldText>
        {homeAddresses.map((address) => (
          <AddressComponent
            onSaveCode={onSaveCode}
            customerAddress={address}
            key={address.address.addressId}
          />
        ))}
      </View>
        )
      : null;

  const renderWorkAddresses = () =>
    workAddresses.length > 0
      ? (
      <View>
        <BoldText style={styles.titleText}>Kontor</BoldText>
        {workAddresses.map((address) => (
          <AddressComponent
            onSaveCode={onSaveCode}
            customerAddress={address}
            key={address.address.addressId}
          />
        ))}
      </View>
        )
      : null;

  const renderCountryHousesAddresses = () =>
    countryHouseAddresses.length > 0
      ? (
      <View>
        <BoldText style={styles.titleText}>Landställe</BoldText>
        {countryHouseAddresses.map((address) => (
          <AddressComponent
            onSaveCode={onSaveCode}
            customerAddress={address}
            key={address.address.addressId}
          />
        ))}
      </View>
        )
      : null;
  return (
    <SignedInContentBox title="Adresser">
      {renderHomeAddresses()}
      {renderWorkAddresses()}
      {renderCountryHousesAddresses()}

      <View style={{ paddingTop: 30 }} />
      <AddButton title="Lägg till ny adress" onPress={onAddAddress} />
    </SignedInContentBox>
  );
};

export default AddressesPresenter;

const styles = StyleSheet.create({
  titleText: {
    color: Color.text,
    fontSize: 16,
    paddingTop: 30,
    marginVertical: 10,
  },
});
