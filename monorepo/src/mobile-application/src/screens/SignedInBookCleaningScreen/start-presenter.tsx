import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BoldText } from '../../components/Text';
import { Color } from '../../styles';

import { CustomerAddressModel } from '../../models/customer-address.model';

import AddressButton from './address-button';
import ScreenContainerWithoutPadding from '../../components/ScreenContainerWithoutPadding';
import AddButton from '../../components/AddButton';

import { FontAwesome5 } from '@expo/vector-icons';
interface Props {
  isLoadingAddresses: boolean;
  homeAddresses: CustomerAddressModel[];
  workAddresses: CustomerAddressModel[];
  countryHouseAddresses: CustomerAddressModel[];
  onSelectAdress(address: CustomerAddressModel): void;
  onAddAddress(): void;
}
const StartPresenter: React.FunctionComponent<Props> = ({
  isLoadingAddresses,
  homeAddresses,
  workAddresses,
  countryHouseAddresses,
  onSelectAdress,
  onAddAddress,
}) => {
  return (
    <ScreenContainerWithoutPadding title="Hemstäd">
      <View style={styles.header}>
        <BoldText style={styles.title}>
          Vilken adress behöver städning?
        </BoldText>
        <ActivityIndicator animating={isLoadingAddresses} />
      </View>
      {homeAddresses.length > 0
        ? (
        <View style={styles.typeContainer}>
          <FontAwesome5 name="home" size={18} color={Color.text} />
          <BoldText style={styles.typeText}>Hemadress</BoldText>
        </View>
          )
        : null}
      {homeAddresses.map((a, i) => (
        <AddressButton key={i} address={a} onClick={onSelectAdress} />
      ))}
      {workAddresses.length > 0
        ? (
        <View style={styles.typeContainer}>
          <FontAwesome5 name="home" size={18} color={Color.text} />
          <BoldText style={styles.typeText}>Kontor</BoldText>
        </View>
          )
        : null}
      {workAddresses.map((a, i) => (
        <AddressButton key={i} address={a} onClick={onSelectAdress} />
      ))}
      {countryHouseAddresses.length > 0
        ? (
        <View style={styles.typeContainer}>
          <FontAwesome5 name="home" size={18} color={Color.text} />
          <BoldText style={styles.typeText}>Landställen</BoldText>
        </View>
          )
        : null}
      {countryHouseAddresses.map((a, i) => (
        <AddressButton key={i} address={a} onClick={onSelectAdress} />
      ))}

      <AddButton
        withPadding={true}
        title="Lägg till ny adress"
        onPress={onAddAddress}
      />
    </ScreenContainerWithoutPadding>
  );
};

export default StartPresenter;

const styles = StyleSheet.create({
  title: {
    color: Color.text,
    fontSize: 20,
  },
  header: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  typeContainer: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  typeText: {
    color: Color.text,
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 8,
  },
});
