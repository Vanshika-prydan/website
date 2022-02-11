import { BoldText, RegularText } from '../../components/Text';
import { CustomerAddressModel } from '../../models/customer-address.model';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  address: CustomerAddressModel;
  onClick(address: CustomerAddressModel): void;
}
const AddressButton: React.FunctionComponent<Props> = ({
  address,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={() => onClick(address)} style={styles.container}>
      <BoldText style={styles.street}>{address.address.street}</BoldText>
      <RegularText style={styles.text}>
        {address.address.postalCode} {address.address.postalCity}
      </RegularText>
      <RegularText style={styles.text}>
        Dörrkod: {address.address.code ?? ' - '}
      </RegularText>
    </TouchableOpacity>
  );
};

export default AddressButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'rgba(69, 124, 56, 0.01)',
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(68, 124, 56, 0.29)',
  },
  street: {
    color: 'rgba(69, 124, 56, 1)',
    fontSize: 16,
  },
  text: {
    color: 'rgba(69, 124, 56, 0.6)',
    fontSize: 14,
  },
});
