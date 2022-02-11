import React, { Fragment } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { sv } from 'date-fns/locale';
import { format } from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddonModel } from '@models/addon.model';
import { Occurrence, OccurrenceType } from '@services/api-service/types';
import { BoldText, MediumText, RegularText } from '@components/Text';
import SmallCheckBox from '@components/SmallCheckBox';
import { Color } from '@styles/index';

interface Props {
  addons: AddonModel[];

  occurrence: OccurrenceType;
  startTime: Date;
  hourlyPrice: string;
  durationInHours: string;
  durationInMinutes: number;
  totalPriceInclRUT: string;
  totalPriceExclRUT: string;
  vat: string;
  totalRUTDeduction: string;
  addonIds: string[];
  acceptTerms: boolean;
  setAcceptTerms(val: boolean): void;
  street: string;
  postalCode: string;
  postalCity: string;
  firstName: string;
  lastName: string;
}

const ConfirmationReceiptPresenter: React.FunctionComponent<Props> = ({
  addons,
  occurrence,
  startTime,
  hourlyPrice,
  durationInHours,
  durationInMinutes,
  totalPriceInclRUT,
  totalPriceExclRUT,
  vat,
  totalRUTDeduction,
  addonIds,
  acceptTerms,
  setAcceptTerms,
  street,
  postalCode,
  postalCity,
  firstName,
  lastName,
}) => {
  return (
    <Fragment>
      <View style={styles.confirmationBox}>
        <View style={styles.cofirmationInnerBox}>
          <View style={styles.row}>
            <MediumText style={styles.leftText}>
              {occurrence === Occurrence.WEEKLY
                ? 'Varje vecka'
                : occurrence === Occurrence.BIWEEKLY
                  ? 'Varannan vecka'
                  : occurrence === Occurrence.FOURWEEKLY
                    ? 'Var fjärde vecka'
                    : ''}
            </MediumText>
            <MediumText style={styles.rightText}>{durationInHours}h</MediumText>
          </View>
          {addons
            .filter((a) => addonIds.includes(a.addonId))
            .map((addon) => (
              <View style={styles.row} key={addon.addonId}>
                <MediumText style={styles.leftText}>+ {addon.name}</MediumText>
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
              {firstName} {lastName}
            </BoldText>
            <MediumText style={baseStyle.normalText}>{street}</MediumText>
            <MediumText style={baseStyle.normalText}>
              {postalCode} {postalCity}
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
              <RegularText style={styles.smallTextRight}>{vat} kr</RegularText>
            </View>
            <View style={styles.row}>
              <RegularText style={styles.smallTextLeft}>RUT-avdrag</RegularText>
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
      <View style={{ marginVertical: 20 }}>
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
              samt
              <BoldText style={{ fontWeight: '900' }}>
                Integritetspolicy
              </BoldText>
              .
            </MediumText>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default ConfirmationReceiptPresenter;

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
