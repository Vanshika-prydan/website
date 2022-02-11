import React from 'react';
import { StyleSheet, View } from 'react-native';
import BookingTitle from '../../components/BookingTitle';
import DescriptionText from '../../components/DescriptionText';
import InputLabel from '../../components/InputLabel';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import TextInput from '../../components/TextInput';
import { Color } from '../../styles';

export interface EnterPersonalInformationPresenterProps {
  firstName: string;
  setFirstName(val: string): void;
  firstNameError: string;
  lastName: string;
  setLastName(val: string): void;
  lastNameError: string;
  email: string;
  setEmail(val: string): void;
  emailError: string;
  phoneNumber: string;
  phoneNumberError: string;
  setPhoneNumber(val: string): void;
  personalIdentityNumber: string;
  personalIdentityNumberError: string;
  setPersonalIdentityNumber(val: string): void;
  onSubmit(): void;
  submitIsDisabled: boolean;
  street: string;
  setStreet(val: string): void;
  streetError: string;
  setCode(val: string): void;
  code: string;
  codeError: string;
}

const EnterPersonalInformationPresenter: React.FunctionComponent<EnterPersonalInformationPresenterProps> =
  (props) => {
    return (
      <ScreenContainer title="Hemstäd">
        <BookingTitle title="Kontaktuppgifter" />
        <View>
          <InputLabel>Förnamn</InputLabel>
          <TextInput
            autoCompleteType="name"
            autoCapitalize="words"
            autoCorrect={true}
            autoFocus={true}
            textContentType="givenName"
            value={props.firstName}
            onChangeText={props.setFirstName}
            error={!!props.firstNameError}
          />
        </View>
        <View>
          <InputLabel>Efternamn</InputLabel>
          <TextInput
            autoCompleteType="name"
            autoCapitalize="words"
            textContentType="familyName"
            value={props.lastName}
            onChangeText={props.setLastName}
            error={!!props.lastNameError}
          />
        </View>
        <View>
          <InputLabel>Email</InputLabel>
          <TextInput
            autoCompleteType="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={props.email}
            onChangeText={props.setEmail}
            error={!!props.emailError}
          />
        </View>
        <View>
          <InputLabel>Telefonnummer</InputLabel>
          <TextInput
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={props.phoneNumber}
            onChangeText={props.setPhoneNumber}
            error={!!props.phoneNumberError}
          />
        </View>
        <View>
          <InputLabel>Adress</InputLabel>
          <TextInput
            keyboardType="default"
            textContentType="fullStreetAddress"
            value={props.street}
            onChangeText={props.setStreet}
            error={!!props.streetError}
          />
        </View>
        <View>
          <InputLabel>Eventuell portkod</InputLabel>
          <TextInput
            keyboardType="numeric"
            value={props.code}
            onChangeText={props.setCode}
            error={!!props.codeError}
          />
        </View>
        <View>
          <InputLabel>Personnummer*</InputLabel>
          <TextInput
            autoCorrect={false}
            keyboardType="numeric"
            value={props.personalIdentityNumber}
            onChangeText={props.setPersonalIdentityNumber}
            error={!!props.personalIdentityNumberError}
          />
        </View>
        <DescriptionText>* Information om RUT-avdrag</DescriptionText>

        <View style={styles.submitContanier}>
          <PrimaryButton
            onPress={props.onSubmit}
            disabled={props.submitIsDisabled}
          >
            Se beställning
          </PrimaryButton>
        </View>
      </ScreenContainer>
    );
  };

export default EnterPersonalInformationPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  submitContanier: {
    paddingTop: 60,
  },
});
