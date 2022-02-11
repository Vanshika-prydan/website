import { CardField, useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Button, View } from 'react-native';

export function PaymentScreen () {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const handlePayPress = async () => {
    // Gather the customer's billing information (e.g., email)
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    const clientSecret =
      'pi_1IveQPGC3xqLdOCv1GP3SMKK_secret_nRUJ24AkSPMhsGaxTu5q0X8dx';
    // Confirm the payment with the card details

    const { paymentIntent, error } = await stripe.confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
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
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}
