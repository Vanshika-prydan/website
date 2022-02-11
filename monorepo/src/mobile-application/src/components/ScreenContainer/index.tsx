import { BoldText } from '../Text';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import ContentPadding from '../../components/ContentPadding';
import { Color } from '../../styles';

export interface ScreenContainerProps {
  title?: string;
}

const ScreenContainer: React.FunctionComponent<ScreenContainerProps> = ({
  title,
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../assets/home-cleaning.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.backgroundOverlay}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <SafeAreaView style={styles.container}>
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
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleText: {
    color: Color.background,
    fontSize: 37,
    textAlign: 'center',
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    flex: 1,
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topContainer: {
    height: 200,
    justifyContent: 'center',
  },
  contentContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
