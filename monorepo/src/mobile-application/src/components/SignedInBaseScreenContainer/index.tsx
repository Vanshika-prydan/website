import { BoldText } from '../Text';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Color } from '../../styles';
import SignedInImageBackground from '../SignedInImageBackground';

export interface SignedInScreenContainerProps {
  title?: string;
}

const SignedInBaseScreenContainer: React.FunctionComponent<SignedInScreenContainerProps> =
  ({ title, children }) => {
    return (
      <SignedInImageBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.topContainer}></View>

              <View style={styles.contentContainer}>
                {title
                  ? (
                  <BoldText style={styles.titleText}>{title}</BoldText>
                    )
                  : null}
                {children}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SignedInImageBackground>
    );
  };

export default SignedInBaseScreenContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleText: {
    color: Color.text,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  topContainer: {
    height: 130,
    justifyContent: 'center',
  },
  contentContainer: {
    height: '100%',
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 40,
  },
});
