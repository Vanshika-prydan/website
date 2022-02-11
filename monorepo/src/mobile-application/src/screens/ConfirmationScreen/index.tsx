import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import BookingTitle from '../../components/BookingTitle';

import { Color } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Occurrence } from '../../services/api-service/types';
import { sv } from 'date-fns/locale';
import { format } from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import ScreenContainer from '../../components/ScreenContainer';
import SmallCheckBox from '../../components/SmallCheckBox';
import PrimaryButton from '../../components/PrimaryButton';
import { makeBookingActions } from '../../store/make-booking';
import { useCreateAppBooking } from './useCreateAppBooking';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { useNavigation } from '@react-navigation/core';
import * as Linking from 'expo-linking';
import Screen from '../../navigation/screen';
import {
  getHourlyPriceInclVATWithRUT,
  getPriceInclVAT,
  getPriceInclVATWithRUT,
  getTotalRutDeduction,
  getVAT,
} from '../../utils/price-utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoldText, MediumText, RegularText } from '../../components/Text';

const ConfirmationCScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.makeBooking);
  const navigation = useNavigation();
  const addons = useSelector((state: RootState) => state.addon.addons);

  if (
    !booking.durationInMinutes ||
    !booking.occurrence ||
    !booking.homeAreaInM2 ||
    !booking.numberOfBathrooms ||
    !booking.selectedEmployeeId ||
    !booking.startTime
  ) {
    navigation.navigate(Screen.START);
    return null;
  }

  const { create, isCreating } = useCreateAppBooking();

  const [acceptTerms, setAcceptTerms] = useState(false);

  const toggleAcceptsCommunication = () =>
    dispatch(
      makeBookingActions.setAcceptsCommunication(!booking.acceptsCommunication)
    );
  const startTime = new Date(booking.startTime ?? Date.now());
  const durationInMinutes = booking.durationInMinutes ?? 0;

  const onClickSubmit = async () => {
    try {
      await create();
      navigation.navigate(Screen.CARD_DETAILS);
    } catch (e) {
      Alert.alert('Kunde inte skapa bokning', generateErrorMessage(e));
    }
  };

  const hourlyPrice = getHourlyPriceInclVATWithRUT(booking.occurrence);
  const durationInHours = (booking.durationInMinutes / 60).toString();
  const totalPriceInclRUT = getPriceInclVATWithRUT(
    booking.occurrence,
    booking.durationInMinutes
  );
  const totalPriceExclRUT = getPriceInclVAT(
    booking.occurrence,
    booking.durationInMinutes
  );
  const vat = getVAT(booking.occurrence, booking.durationInMinutes);
  const totalRUTDeduction = getTotalRutDeduction(
    booking.occurrence,
    booking.durationInMinutes
  );

  return (
    <ScreenContainer title="Hemstäd">
      <View style={styles.container}>
        <BookingTitle title="Bokningbekräftelse" />

        <View style={styles.confirmationBox}>
          <View style={styles.cofirmationInnerBox}>
            <View style={styles.row}>
              <MediumText style={styles.leftText}>
                {booking.occurrence === Occurrence.WEEKLY
                  ? 'Varje vecka'
                  : booking.occurrence === Occurrence.BIWEEKLY
                    ? 'Varannan vecka'
                    : booking.occurrence === Occurrence.FOURWEEKLY
                      ? 'Var fjärde vecka'
                      : ''}
              </MediumText>
              <MediumText style={styles.rightText}>
                {((booking.durationInMinutes ?? 0) / 60).toFixed(1)}h
              </MediumText>
            </View>
            {addons
              .filter((a) => booking.addonIds.includes(a.addonId))
              .map((addon) => (
                <View style={styles.row} key={addon.addonId}>
                  <MediumText style={styles.leftText}>
                    + {addon.name}
                  </MediumText>
                  <MediumText style={styles.rightText}>
                    +{(addon.defaultTimeInMinutes / 60).toString()}h
                  </MediumText>
                </View>
              ))}
            <View style={styles.box}>
              <BoldText style={styles.boldText}>
                {format(startTime, 'EEEE d MMMM', {
                  locale: sv,
                })}
              </BoldText>
              <MediumText style={baseStyle.normalText}>
                {format(startTime, 'kk:mm')} -{' '}
                {format(addMinutes(startTime, durationInMinutes), 'kk:mm')}
              </MediumText>
            </View>
            <View>
              <BoldText style={styles.boldText}>
                {booking.firstName} {booking.lastName}
              </BoldText>
              <MediumText style={baseStyle.normalText}>
                {booking.street}
              </MediumText>
              <MediumText style={baseStyle.normalText}>
                {booking.postalCode} {booking.postalCity}
              </MediumText>
            </View>

            <View style={styles.box}>
              <View
                style={{
                  ...styles.row,
                  borderBottomColor: '#BDC3B9',
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}
              >
                <MediumText style={styles.leftText}>
                  Städning {hourlyPrice} kr/h x{durationInHours}h
                </MediumText>
                <MediumText style={styles.rightText}>
                  {totalPriceInclRUT}
                  kr
                </MediumText>
              </View>
              <View style={styles.row}>
                <RegularText style={styles.smallTextLeft}>
                  Utan RUT-avdrag
                </RegularText>
                <RegularText style={styles.smallTextRight}>
                  {totalPriceExclRUT}
                  kr
                </RegularText>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.row}>
                <MediumText style={styles.leftText}>SUMMA</MediumText>
                <BoldText style={{ ...styles.rightText }}>
                  {totalPriceInclRUT}
                  kr
                </BoldText>
              </View>
              <View style={styles.row}>
                <RegularText style={styles.smallTextLeft}>
                  Varav moms (25%)
                </RegularText>
                <RegularText style={styles.smallTextRight}>
                  {vat} kr
                </RegularText>
              </View>
              <View style={styles.row}>
                <RegularText style={styles.smallTextLeft}>
                  RUT-avdrag
                </RegularText>
                <RegularText style={styles.smallTextRight}>
                  {totalRUTDeduction} kr
                </RegularText>
              </View>
            </View>
          </View>
          <View>
            <ImageBackground
              source={require('../../../assets/kvitto-tagg.png')}
              style={styles.receiptTag}
            />
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View style={styles.selectBox}>
          <SmallCheckBox
            checked={booking.acceptsCommunication}
            onPress={toggleAcceptsCommunication}
          />
          <MediumText style={styles.termsText}>
            Ja, jag samtycker för att ta del av anpassade erbjudanden.
          </MediumText>
        </View>
        <View style={styles.selectBox}>
          <SmallCheckBox
            checked={acceptTerms}
            onPress={() => setAcceptTerms(!acceptTerms)}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://assets.cleangreen.se/privacy-policy.pdf')
            }
            containerStyle={{ flex: 1 }}
          >
            <MediumText style={styles.termsText}>
              Ja, jag har tagit del av och accepterar We Clean Greens{' '}
              <BoldText style={{ fontWeight: '900' }}>villkor </BoldText>
              samt{' '}
              <BoldText style={{ fontWeight: '900' }}>
                Integritetspolicy
              </BoldText>
              .
            </MediumText>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <PrimaryButton
          onPress={() => {
            console.log('CREATING', booking);
            onClickSubmit();
          }}
          disabled={!acceptTerms || isCreating}
        >
          {isCreating
            ? (
            <ActivityIndicator animating={isCreating} />
              )
            : (
                'Bekräfta och betala'
              )}
        </PrimaryButton>
      </View>
    </ScreenContainer>
  );
};

export default ConfirmationCScreen;

const baseStyle = StyleSheet.create({
  normalText: {
    color: Color.text,
    fontSize: 16,
    fontWeight: '500',
  },
  smallText: {
    color: '#BDC3B9',
    fontSize: 14,
  },
});

const styles = StyleSheet.create({
  container: {},
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 4,
  },
  leftText: { ...baseStyle.normalText },
  rightText: { textAlign: 'right', ...baseStyle.normalText },
  boldText: {
    ...baseStyle.normalText,
    fontWeight: 'bold',
  },
  confirmationBox: {
    backgroundColor: '#457C381A',
    borderRadius: 4,
  },
  cofirmationInnerBox: {
    padding: 20,
  },
  box: {
    paddingVertical: 30,
  },
  smallTextLeft: { ...baseStyle.smallText },
  smallTextRight: { ...baseStyle.smallText, textAlign: 'right' },
  termsText: {
    color: Color.text,
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
    marginLeft: 20,
  },
  selectBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  receiptTag: {
    width: '100%',
    height: 14,
  },
});
