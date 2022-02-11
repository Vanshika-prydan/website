import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import SignedInScreenContainer from '../../../components/SignedInScreenContainer';
import { Color } from '../../../styles';
import { AccountModel } from '../../../models/account.model';
import { MediumText } from '../../../components/Text';
import SignedInBookingButton from '../../../components/SignedInBookingButton';

interface SecondaryButtonProps {
  title: string;
  onPress(): void;
}
const SecondaryButton: React.FunctionComponent<SecondaryButtonProps> = ({
  title,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <MediumText style={sbStyles.text}>{title}</MediumText>
  </TouchableOpacity>
);
const sbStyles = StyleSheet.create({
  text: {
    color: Color.primary,
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
});

export interface SignedInPresenterProps {
  account: AccountModel;
  onGotoBookings(): void;
  onCreateNewBooking(): void;
}

const SignedInStartPresenter: React.FunctionComponent<SignedInPresenterProps> =
  ({ account, onGotoBookings, onCreateNewBooking }) => {
    const { firstName } = account;
    return (
      <SignedInScreenContainer title={`Hej ${firstName}!`}>
        <View
          style={{
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../../../assets/placebeo-ikon-01.png')}
              />
            </View>
            <MediumText style={styles.welcomeText}>
              Vi värnar om naturen och är väldigt glada samt tacksamma att även
              du gör det. Tillsammans kan vi göra skillnad.
            </MediumText>
          </View>
          <View>
            <SignedInBookingButton
              title="Boka städning"
              onPress={onCreateNewBooking}
            />
            <SecondaryButton title="Mina bokningar" onPress={onGotoBookings} />
          </View>
        </View>
      </SignedInScreenContainer>
    );
  };

export default SignedInStartPresenter;

const styles = StyleSheet.create({
  welcomeText: {
    color: Color.text,
    fontSize: 18,
    margin: 15,
    textAlign: 'center',
    lineHeight: 27,
  },
  imageContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
  },
});
