import { CreditCardModel } from '../../models/credit-card.model';
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageURISource, Alert } from 'react-native';
import { Color } from '../../styles';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RegularText } from '../../components/Text';
import { generateErrorMessage } from '../../utils/generate-error-message';
import apiService from '../../services/api-service';

interface Props {
  card: CreditCardModel;
  onDelete(card: CreditCardModel): void;
  disabled?: boolean;
  setAsPrimary(cardId: string): void;
}

const CreditCardElement: React.FunctionComponent<Props> = ({
  card,
  onDelete,
  disabled,
  setAsPrimary,
}) => {
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const del = () => onDelete(card);
  const CardIcon = () => {
    if (card.brand === 'unknown') {
      return <AntDesign name="creditcard" size={24} color="black" />;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let icon: ImageURISource = require('../../../assets/credit-cards/amex.png');
    if (card.brand === 'visa') {
      icon = require('../../../assets/credit-cards/visa.png');
    } else if (card.brand === 'amex') {
      icon = require('../../../assets/credit-cards/amex.png');
    } else if (card.brand === 'mastercard') {
      icon = require('../../../assets/credit-cards/mastercard.png');
    }
    return <Image source={icon} style={styles.iconImage} />;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (card.isPrimary) return;
        setAsPrimary(card.id);
      }}
    >
      <View
        style={[styles.container, card.isPrimary ? styles.isDefault : null]}
      >
        <View style={styles.iconContainer}>{CardIcon()}</View>
        <View style={styles.textContainer}>
          <RegularText style={styles.cardNameTest}>
            **** {card.last4}
          </RegularText>
          <RegularText style={styles.cardNumberText}>
            {`${card.expMonth}/${card.expYear}`}
          </RegularText>
        </View>
        <View style={styles.DeleteContainer}>
          {confirmDeletion
            ? (
            <TouchableOpacity
              onPress={del}
              containerStyle={styles.deleteButton}
              disabled={disabled}
            >
              <RegularText style={styles.deleteButtonText}>Ta bort</RegularText>
            </TouchableOpacity>
              )
            : (
            <TouchableOpacity onPress={() => setConfirmDeletion(true)}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
              )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface Props {
  card: CreditCardModel;
}

export default CreditCardElement;

const styles = StyleSheet.create({
  isDefault: {
    backgroundColor: 'rgba(57, 81, 101, 0.1)',
  },

  container: {
    paddingVertical: 0,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'rgba(68, 124, 56, 0.1)',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconImage: {
    height: 'auto',
    width: 20,
    flex: 1,
    resizeMode: 'contain',
  },

  textContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 4,
    justifyContent: 'center',
  },
  DeleteContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNameTest: {
    color: Color.text,
    fontSize: 16,
  },
  cardNumberText: {
    color: 'rgba(57, 81, 101, 0.2)',
    fontSize: 13,
    paddingTop: 6,
  },
  deleteButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'rgba(229, 76, 76, 1)',
    width: '100%',
    height: 60,
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
