import PrimaryButton from '../../components/PrimaryButton';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import ImageBackground from '../../components/ImageBackground';
import { Color } from '../../styles';
import ContentPadding from '../../components/ContentPadding';
import { Page } from '.';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NewEditField from '../../components/NewField/new-input-field';
import BaseBottomContainer from '../../components/BaseBottomContainer';
import { BoldText, RegularText } from '../../components/Text';

export interface NotAvailableScreenPresnterProps {
  onPressBack(): void;
  onPressNext(): void;
  email: string;
  setEmail(val: string): void;
  emailIsValid: boolean;
  page: Page;
  isLoading: boolean;
}

const NotAvailableScreenPresenter: React.FunctionComponent<NotAvailableScreenPresnterProps> =
  ({
    onPressBack,
    onPressNext,
    email,
    setEmail,
    emailIsValid,
    page,
    isLoading,
  }) => {
    const Start = () => (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <BoldText style={styles.title}>
            Vi ber om ursäkt. Tyvärr finns vi ännu inte i ditt område
          </BoldText>
          <RegularText style={styles.signUpText}>
            Skriv gärna upp dig på vår email-lista så informerar vi dig när vi
            finns i din stad.
          </RegularText>
          <View>
            <NewEditField
              label="E-postadress"
              textInputProps={{
                keyboardType: 'email-address',
                autoCapitalize: 'none',
              }}
              value={email}
              onChangeText={setEmail}
              error={email !== '' && !emailIsValid ? '' : ''}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={onPressNext}
            disabled={!emailIsValid || isLoading}
          >
            Skriv upp mig
          </PrimaryButton>
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity onPress={onPressBack}>
              <RegularText style={styles.typedWrongText}>
                Jag skrev in fel postkod
              </RegularText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    const Confirmation = () => (
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/ikon-smiley-01.png')}
            style={styles.imageStyle}
          />
        </View>
        <BoldText style={styles.title}>Tack! </BoldText>
        <RegularText style={styles.signUpText}>
          Vi har nu din e-postadress och kommer att kontakta dig när vi är
          tillgänglig i din stad.
        </RegularText>
      </View>
    );

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <BaseBottomContainer>
                <View style={styles.contentContainer}>
                  <ContentPadding>
                    {page === 'START' ? Start() : Confirmation()}
                  </ContentPadding>
                </View>
              </BaseBottomContainer>
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

export default NotAvailableScreenPresenter;

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flexGrow: 1,
  },

  backgroundImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginTop: 200,
    flex: 1,
    height: Dimensions.get('screen').height * 0.8,
  },
  title: {
    color: Color.text,
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: 60,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    lineHeight: 28,
  },
  signUpText: {
    color: Color.text,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingVertical: 20,
    lineHeight: 30,
  },
  buttonContainer: { paddingBottom: 20, flexGrow: 1, paddingTop: 40 },
  typedWrongText: {
    textAlign: 'center',
    color: Color.primary,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 15,
    // marginBottom: (Dimensions.get('screen').height * 50) / 100,
  },

  imageStyle: {
    height: 106,
    width: 106,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
