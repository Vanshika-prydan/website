import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BoldText, RegularText } from '@components/Text';
import BookingTitle from '@components/BookingTitle';
import InputTitle from '@components/InputTitle';
import PrimaryButton from '@components/PrimaryButton';
import ScreenContainer from '@components/ScreenContainer';
import TextInput from '@components/TextInput';
import { AddonModel } from '@models/addon.model';
import { Color } from '@styles/index';
import SelectAddons from '@components/SelectAddons';
import { minutesToHoursMinuteString } from '@utils/time-calculation';
export interface HomeDetailsScreenPresenterProps {
  setM2(val: string): void;
  m2: string;
  setNumberOfBathrooms(val: string): void;
  numberOfBathRooms: string;
  estimatedTimeInMinutes: number;
  addons: AddonModel[];
  selectedAddons: string[];
  onSelectAddon(addonId: string): void;
  onPressNext(): void;
  submitIsDisabled: boolean;
}

const HomeDetailsScreenPresenter: React.FunctionComponent<HomeDetailsScreenPresenterProps> =
  (props) => {
    const estimatedTimeString =
      props.estimatedTimeInMinutes === 0
        ? ''
        : minutesToHoursMinuteString(
          props.estimatedTimeInMinutes
        ); /* props.estimatedTimeInHours
          .toPrecision(2)
          .toString()
          .replace(/\./g, ','); */

    return (
      <ScreenContainer title="Hemstäd">
        <BookingTitle title="Berätta om din bostad" />
        <View>
          <InputTitle>Hur många kvadratmeter?</InputTitle>
          <View>
            <TextInput
              keyboardType="numeric"
              maxLength={5}
              onChangeText={props.setM2}
              value={props.m2}
              selectTextOnFocus={true}
            />
            <RegularText
              style={{
                position: 'absolute',
                right: 0,
                fontSize: 16,
                paddingVertical: 9,
                paddingHorizontal: 20,
                color: '"rgba(69, 124, 56, 0.3)',
              }}
            >
              m2
            </RegularText>
          </View>
        </View>

        <View>
          <InputTitle>Antal badrum</InputTitle>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            onChangeText={props.setNumberOfBathrooms}
            value={props.numberOfBathRooms}
            selectTextOnFocus={true}
          />
        </View>
        {estimatedTimeString
          ? (
          <View>
            <InputTitle>Längd på städning</InputTitle>
            <BoldText style={styles.cleaningLength}>
              {estimatedTimeString}
            </BoldText>
          </View>
            )
          : null}

        <View style={{ marginVertical: 20 }}>
          <InputTitle>Extra tillägg</InputTitle>
          <SelectAddons
            addons={props.addons}
            selectedAddonIds={props.selectedAddons}
            onSelectAddon={props.onSelectAddon}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={props.onPressNext}
            disabled={props.submitIsDisabled}
          >
            Fortsätt
          </PrimaryButton>
        </View>
      </ScreenContainer>
    );
  };

export default HomeDetailsScreenPresenter;

const styles = StyleSheet.create({
  subText: {
    color: Color.text,
    opacity: 0.5,
    fontSize: 14,
    paddingBottom: 15,
  },
  container: { flex: 1 },
  titleText: {
    color: Color.background,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  topContainer: {
    height: 200,
    justifyContent: 'center',
  },
  contentContainer: {
    height: '100%',
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 0,
  },
  addonBox: {
    marginBottom: 10,
  },
  cleaningLength: { fontSize: 16, color: Color.text },
});
