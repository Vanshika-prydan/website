import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import {
  CardField,
  CardFieldInput,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';

import ScreenContainer from '@components/ScreenContainer';
import BookingTitle from '@components/BookingTitle';
import ApiService from '@services/api-service/api-service';
import { generateErrorMessage } from '@utils/generate-error-message';
import SignedInButton from '@components/SignedInButton';
import { BoldText, RegularText } from '@components/Text';
import apiService from '@services/api-service';

export interface CardDetailsPresenterProps {
  onAddedCard(): void;
  gotoStripe(): void;
}

const CardDetailsPresenter: React.FunctionComponent<CardDetailsPresenterProps> =
  ({ onAddedCard, gotoStripe }) => {
    const { confirmSetupIntent, loading } = useConfirmSetupIntent();
    const [card, setCard] = useState<CardFieldInput.Details | null>(null);

    const handlePayPress = async () => {
      try {
        const { secret } = await ApiService.saveCardIntent();
        const { setupIntent, error } = await confirmSetupIntent(secret, {
          type: 'Card',
        });

        if (error) {
          console.log('ERROR', error);
          Alert.alert('Gick inte att lägga till kort', error.message);
        } else {
          if (setupIntent?.paymentMethodId) {
            await apiService.setDefaultPaymentMethod(
              setupIntent.paymentMethodId
            );
          }

          onAddedCard();
        }
      } catch (e) {
        console.log(e);
        Alert.alert('Ett fel uppstod', generateErrorMessage(e));
      }
    };

    return (
      <ScreenContainer>
        <BookingTitle title="Lägg till betalningsmetod" />
        <View>
          <RegularText style={styles.text}>
            Betalning debiteras efter slutförd städning.
          </RegularText>
        </View>
        <View style={styles.padding}>
          <RegularText style={styles.text}>Kortuppgifter</RegularText>

          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
            }}
            onCardChange={(cardDetails) => {
              setCard(cardDetails);
            }}
          />
        </View>

        <RegularText style={styles.smallText}>
          Vi sparar dina kortuppgifter på ett säkert sätt för snabb och enkel
          betalning. Dina kortuppgifter kommer att krypteras och lagras hos vår
          betalningsleverantör, inte i appen. Du kan visa eller ta bort kort
          under fliken Betalningsmetoder i Inställningar
        </RegularText>

        <View style={styles.stripeContainer}>
          <Image
            source={require('@assets/credit-cards/stripe.png')}
            style={styles.stripeImage}
          />
          <TouchableOpacity onPress={gotoStripe}>
            <RegularText style={styles.stripeText}>
              <BoldText style={{ fontWeight: '900' }}>Läs mer </BoldText> om
              Stripes betalningstjänst här.
            </RegularText>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <SignedInButton
            onPress={handlePayPress}
            disabled={loading || !card?.complete}
          >
            Spara kort
          </SignedInButton>
        </View>
      </ScreenContainer>
    );
  };

export default CardDetailsPresenter;

const styles = StyleSheet.create({
  text: {
    color: 'rgba(57, 81, 101, 0.6)',
    fontSize: 14,
  },
  padding: {
    paddingTop: 40,
  },
  smallText: {
    color: 'rgba(57, 81, 101, 0.6)',
    fontSize: 11,
    paddingVertical: 30,
  },
  stripeImage: {
    width: 80,
    height: 37,
  },
  stripeText: {
    color: 'rgba(57, 81, 101, 0.6)',
    paddingTop: 8,
    paddingLeft: 10,
  },
  stripeContainer: {
    paddingVertical: 20,
  },
  buttonContainer: {
    marginVertical: 30,
  },
});
