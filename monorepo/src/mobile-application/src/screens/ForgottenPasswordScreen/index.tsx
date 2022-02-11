import React, { useState } from 'react';

import Email from './email';
import Code from './code';
import Sent from './sent';
import Password from './password';
import ImageBackground from '../../components/ImageBackground';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Color } from '../../styles';
import ContentPadding from '../../components/ContentPadding';
import { generateErrorMessage } from '../../utils/generate-error-message';
import apiService from '../../services/api-service';
import { useNavigation } from '@react-navigation/native';
import BaseBottomContainer from '../../components/BaseBottomContainer';

export enum FGS {
  'EMAIL' = 'FGS_EMAIL',
  'CODE' = 'FGS_CODE',
  'SENT' = 'FGS_SENT',
  'PASSWORD' = 'FGS_PASSWORD',
}

const ForgottenPasswordScreen: React.FunctionComponent = () => {
  const nav = useNavigation();
  const [page, setPage] = useState<FGS>(FGS.EMAIL);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const Page = () => {
    switch (page) {
      case FGS.EMAIL:
        return (
          <Email
            onNext={(email) => {
              setEmail(email);
              setPage(FGS.SENT);
            }}
            onCancel={nav.goBack}
          />
        );
      case FGS.SENT:
        return <Sent onNext={() => setPage(FGS.CODE)} />;
      case FGS.CODE:
        return (
          <Code
            onNext={(code) => {
              setCode(code);
              setPage(FGS.PASSWORD);
            }}
          />
        );
      case FGS.PASSWORD:
        return <Password onChangePassword={confirmForgottenPassword} />;
    }
  };

  const confirmForgottenPassword = async (password: string) => {
    try {
      await apiService.confirmForgottenPassword({ password, code, email });
      nav.goBack();
    } catch (e) {
      Alert.alert('Kunde inte återställa lösenord', generateErrorMessage(e));
      if (e.errorCode === 'INVALID_CODE') setPage(FGS.CODE);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground>
            <BaseBottomContainer>
              <View style={styles.contentContainer}>
                <ContentPadding>{Page()}</ContentPadding>
              </View>
            </BaseBottomContainer>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgottenPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  contentContainer: {
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flexGrow: 1,
    // height: Dimensions.get('screen').height * 0.8,
  },

  title: {
    fontSize: 22,
    color: Color.text,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  subtitle: {
    fontSize: 18,
    color: Color.text,
    fontWeight: '500',
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    padding: 40,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
