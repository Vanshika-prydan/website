import BaseBottomContainer from '../../components/BaseBottomContainer';
import HeaderSlogan from '../../components/HeaderSlogan';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ImageBackground from '../../components/ImageBackground';
import LargeTextInput from '../../components/LargeTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { Color } from '../../styles';
import { BoldText } from '../../components/Text';

interface WhereToCleanScreenPresenterProps {
  onPressNext(): void;
  postalCode: string;
  setPostalCode(val: string): void;
  nextIsDisabled?: boolean;
}

const WhereToCleanScreenPresenter: React.FunctionComponent<WhereToCleanScreenPresenterProps> =
  ({ onPressNext, postalCode, setPostalCode, nextIsDisabled }) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ImageBackground>
              <BaseBottomContainer>
                <HeaderSlogan />
                <View style={styles.padding}>
                  <BoldText style={styles.headerText}>
                    Var ska vi städa?
                  </BoldText>
                  <LargeTextInput
                    placeholder="Postkod"
                    keyboardType="numeric"
                    maxLength={6}
                    value={postalCode}
                    onChangeText={setPostalCode}
                  />
                  <PrimaryButton
                    onPress={onPressNext}
                    disabled={nextIsDisabled}
                  >
                    Boka städning
                  </PrimaryButton>
                </View>
              </BaseBottomContainer>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

export default WhereToCleanScreenPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  headerText: {
    fontSize: 22,
    color: Color.primary,
    textAlign: 'center',
    paddingBottom: 20,
  },
});
