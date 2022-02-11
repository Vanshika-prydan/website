import React, { Fragment } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import BookingTitle from '../../components/BookingTitle';
import DescriptionText from '../../components/DescriptionText';
import OccurrenceBox from '../../components/OccurenceBox';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { Color } from '../../styles';
import SelectTime from './SelectTime';

import SelectDate from './SelectDate';
import SelectBox from '../../components/SelectBox';
import SubTitle from '../../components/SubTitle';
import ContactComponent from './ContactComponent';
import { Occurrence, OccurrenceType } from '../../services/api-service/types';
import {
  getHourlyPriceInclVAT,
  getHourlyPriceInclVATWithRUT,
} from '../../utils/price-utils';
import { BoldText, MediumText, RegularText } from '../../components/Text';

export interface ChooseTimeScreenPresenterProps {
  onPressNext(): void;
  setOccurrence(val: OccurrenceType): void;
  occurrence: OccurrenceType | null;
  availableTimeSlots: Date[];
  availableDays: Date[];
  selectedDate: Date | null;
  selectedTime: Date | null;
  setSelectedTime(val: Date | null): void;
  setSelectedDate(val: Date | null): void;
  isLoadingTimeSlots: boolean;
  submitIsDisabled: boolean;
}

const ChooseTimeScreenPresenter: React.FunctionComponent<ChooseTimeScreenPresenterProps> =
  ({
    onPressNext,
    setOccurrence,
    occurrence,
    availableTimeSlots,
    availableDays,
    selectedDate,
    selectedTime,
    setSelectedTime,
    setSelectedDate,
    isLoadingTimeSlots,
    submitIsDisabled,
  }) => {
    return (
      <ScreenContainer title="Hemstäd">
        <BookingTitle title="När ska vi städa?" />
        <SubTitle>Hur ofta vill du ha städning?</SubTitle>
        <DescriptionText>
          Du får samma återkommande städerska varje gång med We Clean Green.
        </DescriptionText>
        <View
          style={{
            backgroundColor: '#457C381A',
            marginVertical: 20,
            padding: 20,
            borderRadius: 4,
          }}
        >
          <MediumText
            style={{
              color: Color.text,
              fontSize: 16,
            }}
          >
            Just nu har vi introduktionskampanj för Friends and Family med extra
            bra priser!
          </MediumText>
        </View>

        <OccurrenceBox
          selected={occurrence === Occurrence.WEEKLY}
          title="Varje vecka"
          value="WEEKLY"
          price={getHourlyPriceInclVATWithRUT(Occurrence.WEEKLY)}
          description={`${getHourlyPriceInclVAT(
            Occurrence.WEEKLY
          )} kr/h utan RUT-avdrag`}
          onPress={() => setOccurrence(Occurrence.WEEKLY)}
          regularPrice="235"
        />
        <OccurrenceBox
          selected={occurrence === Occurrence.BIWEEKLY}
          title="Varannan vecka"
          value="BIWEEKLY"
          price={getHourlyPriceInclVATWithRUT(Occurrence.BIWEEKLY)}
          description={`${getHourlyPriceInclVAT(
            Occurrence.BIWEEKLY
          )} kr/h utan RUT-avdrag`}
          onPress={() => setOccurrence(Occurrence.BIWEEKLY)}
          isMostPopular={true}
          regularPrice="245"
        />
        <OccurrenceBox
          title="Var fjärde vecka"
          selected={occurrence === Occurrence.FOURWEEKLY}
          value="QUADWEEKLY"
          price={getHourlyPriceInclVATWithRUT(Occurrence.FOURWEEKLY)}
          description={`${getHourlyPriceInclVAT(
            Occurrence.FOURWEEKLY
          )} kr/h utan RUT-avdrag`}
          onPress={() => setOccurrence(Occurrence.FOURWEEKLY)}
          regularPrice="265"
        />

        <View style={{ marginVertical: 15 }}>
          <SelectBox
            onPress={() => setOccurrence(Occurrence.ONETIME)}
            selected={occurrence === Occurrence.ONETIME}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <BoldText
                  style={{
                    color: Color.text,
                    fontSize: 16,
                  }}
                >
                  Endast en gång{' '}
                </BoldText>
                <RegularText
                  style={{ color: 'rgba(255, 0, 0, 0.6)', fontSize: 16 }}
                >
                  <RegularText
                    style={{
                      color: Color.text,
                      textDecorationLine: 'line-through',
                    }}
                  >
                    300 kr/h
                  </RegularText>{' '}
                  {getHourlyPriceInclVATWithRUT(Occurrence.ONETIME)} kr/h
                </RegularText>
              </View>
              <View>
                <DescriptionText>
                  {getHourlyPriceInclVAT(Occurrence.ONETIME)} kr/h utan
                  RUT-avdrag
                </DescriptionText>
              </View>
            </View>
          </SelectBox>
        </View>

        <View>
          <DescriptionText>
            Vi rekommenderar återkommande städning. Det innebär att samma
            städerska kommer hem och städar hos er.
          </DescriptionText>
        </View>
        <ActivityIndicator size="large" animating={isLoadingTimeSlots} />

        {occurrence && !isLoadingTimeSlots
          ? (
          <Fragment>
            <View style={styles.whenToCleanBox}>
              <RegularText style={styles.smallIconHeaderText}>
                När ska vi komma och städa?
              </RegularText>
              <DescriptionText>
                Du kan alltid avboka eller omboka din tid så att den passar dig.
                Du behöver inte vara hemma medan vi städar din bostad om du inte
                vill.
              </DescriptionText>
            </View>

            <SelectDate
              availableDates={availableDays}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <SelectTime
              availableTimeSlots={availableTimeSlots}
              selectedTime={selectedTime}
              selectedDate={selectedDate}
              onSelect={setSelectedTime}
            />
            <ContactComponent />

            <View>
              <PrimaryButton disabled={submitIsDisabled} onPress={onPressNext}>
                Fortsätt
              </PrimaryButton>
            </View>
          </Fragment>
            )
          : null}
      </ScreenContainer>
    );
  };

export default ChooseTimeScreenPresenter;

const styles = StyleSheet.create({
  whenToCleanBox: {
    paddingBottom: 50,
    paddingTop: 30,
  },
  smallIconHeaderText: {
    color: Color.text,
    fontSize: 16,
    marginBottom: 10,
  },
});
