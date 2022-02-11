import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  CardField,
  CardFieldInput,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';
import ApiService from '../../services/api-service/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import SignedInButton from '../../components/SignedInButton';

export interface AddCardProps {
  onAddedCard(): void;
  submitTitle?: string;
}

const AddCard: React.FunctionComponent<AddCardProps> = ({
  onAddedCard,
  submitTitle,
}) => {
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
        onAddedCard();
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Ett fel uppstod', generateErrorMessage(e));
    }
  };

  useEffect(() => {
    console.log(card);
  });

  return (
    <View>
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
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
        }}
      />
      <SignedInButton
        onPress={handlePayPress}
        disabled={loading || !card?.complete}
      >
        {submitTitle ?? ' Lägg till kort'}
      </SignedInButton>
    </View>
  );
};

export default AddCard;
