import BookingTitle from '@components/BookingTitle';
import ConfirmationReceiptComponent from '@components/ConfirmationReceipt';
import PrimaryButton from '@components/PrimaryButton';
import ScreenContainer from '@components/ScreenContainer';
import { SignedInBookingState } from '@store/signed-in-booking/types';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
  booking: SignedInBookingState;
  isCreating: boolean;
  acceptTerms: boolean;
  setAcceptTerms(val: boolean): void;
  onConfirm(): void;
}
const ConfirmationPresenter: React.FunctionComponent<Props> = ({
  booking,
  isCreating,
  acceptTerms,
  setAcceptTerms,
  onConfirm,
}) => {
  return (
    <ScreenContainer title="Hemstäd">
      <View style={styles.container}>
        <BookingTitle title="Bokningsbekräftelse" />
        <ConfirmationReceiptComponent
          booking={booking}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
        />

        <View>
          {isCreating
            ? (
            <ActivityIndicator animating={isCreating} size="small" />
              )
            : (
            <PrimaryButton
              onPress={onConfirm}
              disabled={!acceptTerms || isCreating}
            >
              Slutför bokning
            </PrimaryButton>
              )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ConfirmationPresenter;

const styles = StyleSheet.create({
  container: {},
});
