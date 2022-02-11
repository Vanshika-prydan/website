import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Color } from '../../styles';
import InputLabel from '../../components/InputLabel';
import { CreditCardModel } from '../../models/credit-card.model';
import CreditCardElement from './credit-card-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { PaymentScreen } from './screen-enum';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import apiService from '../../services/api-service';
import SignedInBaseScreenContainer from '../../components/SignedInBaseScreenContainer';
import { creditCardActions } from '../../store/credit-card';
import { BoldText, RegularText } from '../../components/Text';

const Start: React.FunctionComponent = () => {
  const nav = useNavigation();

  const creditCards = useSelector(
    (state: RootState) => state.creditCard.creditCards
  );

  const dispatch = useDispatch();

  const [isLoadingCreditCards, setIsLoadingCreditCards] = useState(false);
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadCards = async () => {
    try {
      setIsLoadingCreditCards(true);
      const cards = await apiService.getAllCreditCards();
      dispatch(creditCardActions.setCards(cards));
    } catch (e) {
      Alert.alert('Problem vid hämtningen', generateErrorMessage(e));
    } finally {
      setIsLoadingCreditCards(false);
    }
  };

  const deleteCard = async (cardId: string) => {
    setIsDeletingCard(true);
    try {
      await apiService.deleteCreditCard(cardId);
    } catch (e) {
      Alert.alert('Kunde inte ta bort kort', generateErrorMessage(e));
      console.log(e);
    } finally {
      setIsDeletingCard(false);
    }
  };

  const onDeleteCard = async (card: CreditCardModel) => {
    await deleteCard(card.id);
    loadCards();
  };

  const setPrimaryCard = async (cardId: string) => {
    Alert.alert(
      'Ändra förvalt kort',
      'Bekräfta att du vill använda kortet som ditt primära',
      [
        {
          text: 'Avbryt',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Fortsätt',
          onPress: async () => {
            try {
              await apiService.setDefaultPaymentMethod(cardId);
              await loadCards();
            } catch (err) {
              Alert.alert('Kunde inte spara', generateErrorMessage(err));
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadCards();
  }, []);
  useEffect(() => {
    setIsLoading(isLoadingCreditCards || isDeletingCard);
  });

  return (
    <SignedInBaseScreenContainer>
      <View style={styles.contentPadding}>
        <BoldText style={styles.titleText}>Betalningsmetoder</BoldText>
        <ActivityIndicator animating={isLoading} />
        <InputLabel>Mina sparade kort</InputLabel>
      </View>

      {creditCards.map((card) => (
        <CreditCardElement
          key={card.id}
          card={card}
          onDelete={onDeleteCard}
          disabled={isLoading}
          setAsPrimary={setPrimaryCard}
        />
      ))}

      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => nav.navigate(PaymentScreen.ADD_CARD)}
      >
        <RegularText style={styles.addCardButtonText}>
          + Lägg till kort
        </RegularText>
        <View style={styles.addCardButtonIcon}>
          <AntDesign
            name="arrowright"
            size={24}
            color={'rgba(57, 81, 101, 0.6)'}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.contentPadding}>
        <View style={styles.savedCardsInfoContainer}>
          <View style={styles.savedCardsInfoHeaderContainer}>
            <MaterialIcons name="lock" size={16} color="black" />
            <RegularText style={styles.savedCardsInfoHeaderText}>
              Betalningsuppgifter är alltid krypterade.
            </RegularText>
          </View>
          <RegularText style={styles.savedCardsInfoText}>
            Sparade betalningsmetoder gör det enkelt att boka städningar i
            appen. Dina betalningsuppgifter sparas på ett säkert sätt.
          </RegularText>
        </View>
      </View>
    </SignedInBaseScreenContainer>
  );
};

export default Start;

const styles = StyleSheet.create({
  savedCardsInfoHeaderContainer: {
    flexDirection: 'row',
  },
  savedCardsInfoContainer: {
    marginVertical: 30,
  },
  savedCardsInfoHeaderText: {
    color: Color.text,
    fontSize: 13,
    paddingLeft: 15,
  },
  savedCardsInfoText: {
    marginTop: 15,
    fontSize: 11,
    color: 'rgba(57, 81, 101, 0.6)',
    lineHeight: 20,
  },
  contentPadding: {
    paddingHorizontal: 40,
  },

  addCardButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(68, 124, 56, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCardButtonText: {
    fontSize: 15,
    color: 'rgba(57, 81, 101, 0.6)',
  },
  addCardButtonIcon: {},
  titleText: {
    color: Color.text,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
});
