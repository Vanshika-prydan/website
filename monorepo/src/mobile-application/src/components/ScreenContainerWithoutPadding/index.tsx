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
import ContentPadding from '../ContentPadding';
import { Color } from '../../styles';

export interface Props {
  title?: string;
}

const ScreenContainerWithoutPadding: React.FunctionComponent<Props> = ({
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
          source={require('../../../assets/hemstad.jpg')}
          style={styles.backgroundImage}
        >
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

            <View style={styles.contentContainer}>{children}</View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ScreenContainerWithoutPadding;

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
    paddingVertical: 40,
  },
});
