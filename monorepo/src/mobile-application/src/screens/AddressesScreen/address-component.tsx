import { MediumText, RegularText } from '../../components/Text';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomerAddressModel } from '../../models/customer-address.model';
import { Color } from '../../styles';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import SignedInButton from '../../components/SignedInButton';

interface Props {
  customerAddress: CustomerAddressModel;
  onSaveCode(customerAddressId: string, code: string): void;
}
const AddressComponent: React.FunctionComponent<Props> = ({
  onSaveCode,
  customerAddress,
}) => {
  const { address } = customerAddress;

  const [code, setCode] = useState(address.code ?? '');
  const [isEditing, setIsEditing] = useState(false);

  const save = () => {
    setIsEditing(false);
    onSaveCode(customerAddress.customerAddressId, code);
  };

  const Edit = () => {
    return (
      <View style={{ flex: 1 }}>
        <MediumText style={styles.label}>Portkod (valfritt)</MediumText>
        <TextInput
          style={styles.textInput}
          onChangeText={setCode}
          value={code}
        />
        <SignedInButton onPress={save}>Uppdatera portkod</SignedInButton>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MediumText style={styles.title}>{address.street}</MediumText>
        <RegularText style={styles.text}>
          {address.postalCode} {address.postalCity}
        </RegularText>
        {isEditing
          ? (
              Edit()
            )
          : (
          <RegularText style={styles.text}>
            Portkod: {address.code ?? 'ingen kod angiven'}
          </RegularText>
            )}
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          {!isEditing
            ? (
            <MaterialIcons
              name="edit"
              size={24}
              color="rgba(58, 82, 103, 0.3)"
            />
              )
            : (
            <Entypo name="cross" size={24} color={Color.text} />
              )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(57, 81, 101, 0.1)',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: Color.text,
  },
  text: {
    fontSize: 15,
    color: Color.text,
  },
  textInput: {
    fontFamily: 'BalooChettan2Regular',
    color: Color.text,
    borderColor: 'rgba(68, 124, 56, 0.29)',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 8,
  },
  label: {
    color: 'rgba(57, 81, 101, 0.6)',
    fontSize: 14,
    paddingTop: 10,
  },
});
