import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import ContentPadding from '../ContentPadding';
import { Color } from '../../styles';
import SignedInImageBackground from '../SignedInImageBackground';
import { BoldText } from '../Text';

export interface SignedInScreenContainerProps {
  title?: string;
}

const SignedInScreenContainer: React.FunctionComponent<SignedInScreenContainerProps> =
  ({ title, children }) => {
    return (
      <SignedInImageBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <SafeAreaView>
                <View style={styles.topContainer}>
                  {title
                    ? (
                    <BoldText style={styles.titleText}>{title}</BoldText>
                      )
                    : null}
                </View>
              </SafeAreaView>

              <View style={styles.contentContainer}>
                <ContentPadding>{children}</ContentPadding>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SignedInImageBackground>
    );
  };

export default SignedInScreenContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleText: {
    color: Color.background,
    fontSize: 37,
    textAlign: 'center',
  },
  backgroundImage: {
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  topContainer: {
    height: 200,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
