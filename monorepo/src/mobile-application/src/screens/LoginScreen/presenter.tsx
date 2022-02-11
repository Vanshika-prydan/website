import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';
import BottomContainer from '../../components/BottomContainer';
import ImageBackground from '../../components/ImageBackground';
import PrimaryButton from '../../components/PrimaryButton';
import { Color } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BoldText, MediumText } from '../../components/Text';

export interface LoginScreenPresenterProps {
  onLogin(): void;
  email: string;
  setEmail(val: string): void;
  password: string;
  setPassword(val: string): void;
  submitIsDisabled: boolean;
  onForgottenPassword(): void;
  emailError?: string;
  passwordError?: string;
}

const LoginScreenPresenter: React.FunctionComponent<LoginScreenPresenterProps> =
  ({
    onLogin,
    email,
    setEmail,
    password,
    setPassword,
    onForgottenPassword,
    submitIsDisabled,
    emailError,
    passwordError,
  }) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <ImageBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.container}>
                <BottomContainer>
                  <View style={styles.contentPadding}>
                    <BoldText style={styles.headerText}>Logga in</BoldText>
                    <View style={styles.inputContainer}>
                      <View style={styles.filedContainer}>
                        <View style={styles.fieldInnerContainer}>
                          <MaterialCommunityIcons
                            name="email-outline"
                            size={18}
                            color={Color.text}
                            style={styles.icon}
                          />
                          <TextInput
                            autoCompleteType="email"
                            placeholder="E-postadress"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={styles.inputStyle}
                          />
                        </View>
                      </View>

                      <View style={styles.filedContainer}>
                        <View style={styles.fieldInnerContainer}>
                          <MaterialIcons
                            name="lock"
                            size={18}
                            color={Color.text}
                            style={styles.icon}
                          />
                          <TextInput
                            placeholder="Lösenord"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            style={styles.inputStyle}
                          />
                        </View>
                      </View>
                      <TouchableOpacity onPress={onForgottenPassword}>
                        <MediumText style={styles.forgotPasswordText}>
                          Glömt ditt lösenord?
                        </MediumText>
                      </TouchableOpacity>
                    </View>

                    <PrimaryButton
                      onPress={onLogin}
                      disabled={submitIsDisabled}
                    >
                      Logga in
                    </PrimaryButton>
                  </View>
                </BottomContainer>
              </View>
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

export default LoginScreenPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentPadding: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.text,
    paddingBottom: 20,
  },
  forgotPasswordContainer: {},
  forgotPasswordText: {
    color: Color.text,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  filedContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(57, 81, 101, 0.1)',
    marginVertical: 7,
  },
  fieldInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  inputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: Color.text,
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
});
